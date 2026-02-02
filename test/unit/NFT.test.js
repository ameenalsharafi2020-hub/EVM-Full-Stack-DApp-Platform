const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("NFT", function () {
    async function deployNFTFixture() {
        const [owner, addr1, addr2] = await ethers.getSigners();

        const NFT = await ethers.getContractFactory("NFT");
        const nft = await NFT.deploy(owner.address);

        return { nft, owner, addr1, addr2 };
    }

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            const { nft, owner } = await loadFixture(deployNFTFixture);
            expect(await nft.owner()).to.equal(owner.address);
        });

        it("Should have correct name and symbol", async function () {
            const { nft } = await loadFixture(deployNFTFixture);
            expect(await nft.name()).to.equal("MyNFT");
            expect(await nft.symbol()).to.equal("MNFT");
        });

        it("Should start with token ID 1", async function () {
            const { nft } = await loadFixture(deployNFTFixture);
            expect(await nft.getCurrentTokenId()).to.equal(1);
        });
    });

    describe("Minting", function () {
        it("Should mint NFT with payment", async function () {
            const { nft, addr1 } = await loadFixture(deployNFTFixture);
            const mintPrice = await nft.mintPrice();

            await expect(
                nft.connect(addr1).safeMint(addr1.address, "ipfs://test", {
                    value: mintPrice
                })
            ).to.emit(nft, "NFTMinted");

            expect(await nft.ownerOf(1)).to.equal(addr1.address);
        });

        it("Should fail if payment is insufficient", async function () {
            const { nft, addr1 } = await loadFixture(deployNFTFixture);

            await expect(
                nft.connect(addr1).safeMint(addr1.address, "ipfs://test", {
                    value: ethers.parseEther("0.001")
                })
            ).to.be.revertedWith("Insufficient payment");
        });

        it("Should allow owner to mint for free", async function () {
            const { nft, owner, addr1 } = await loadFixture(deployNFTFixture);

            await expect(
                nft.ownerMint(addr1.address, "ipfs://test")
            ).to.emit(nft, "NFTMinted");

            expect(await nft.ownerOf(1)).to.equal(addr1.address);
        });
    });

    describe("Price Management", function () {
        it("Should allow owner to change mint price", async function () {
            const { nft, owner } = await loadFixture(deployNFTFixture);
            const newPrice = ethers.parseEther("0.02");

            await expect(nft.setMintPrice(newPrice))
                .to.emit(nft, "MintPriceUpdated")
                .withArgs(newPrice);

            expect(await nft.mintPrice()).to.equal(newPrice);
        });

        it("Should fail if non-owner tries to change price", async function () {
            const { nft, addr1 } = await loadFixture(deployNFTFixture);

            await expect(
                nft.connect(addr1).setMintPrice(ethers.parseEther("0.02"))
            ).to.be.revertedWithCustomError(nft, "OwnableUnauthorizedAccount");
        });
    });

    describe("Withdrawal", function () {
        it("Should allow owner to withdraw funds", async function () {
            const { nft, owner, addr1 } = await loadFixture(deployNFTFixture);
            const mintPrice = await nft.mintPrice();

            await nft.connect(addr1).safeMint(addr1.address, "ipfs://test", {
                value: mintPrice
            });

            const balanceBefore = await ethers.provider.getBalance(owner.address);
            const tx = await nft.withdraw();
            const receipt = await tx.wait();
            const gasUsed = receipt.gasUsed * receipt.gasPrice;
            const balanceAfter = await ethers.provider.getBalance(owner.address);

            expect(balanceAfter).to.be.closeTo(
                balanceBefore + mintPrice - gasUsed,
                ethers.parseEther("0.001")
            );
        });
    });
});
