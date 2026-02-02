const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Token", function () {
    async function deployTokenFixture() {
        const [owner, addr1, addr2] = await ethers.getSigners();

        const Token = await ethers.getContractFactory("Token");
        const token = await Token.deploy(owner.address);

        return { token, owner, addr1, addr2 };
    }

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            const { token, owner } = await loadFixture(deployTokenFixture);
            expect(await token.owner()).to.equal(owner.address);
        });

        it("Should assign the initial supply to the owner", async function () {
            const { token, owner } = await loadFixture(deployTokenFixture);
            const ownerBalance = await token.balanceOf(owner.address);
            expect(await token.totalSupply()).to.equal(ownerBalance);
        });

        it("Should have correct name and symbol", async function () {
            const { token } = await loadFixture(deployTokenFixture);
            expect(await token.name()).to.equal("MyToken");
            expect(await token.symbol()).to.equal("MTK");
        });
    });

    describe("Transactions", function () {
        it("Should transfer tokens between accounts", async function () {
            const { token, owner, addr1, addr2 } = await loadFixture(deployTokenFixture);

            await expect(
                token.transfer(addr1.address, ethers.parseEther("50"))
            ).to.changeTokenBalances(
                token,
                [owner, addr1],
                [ethers.parseEther("-50"), ethers.parseEther("50")]
            );

            await expect(
                token.connect(addr1).transfer(addr2.address, ethers.parseEther("50"))
            ).to.changeTokenBalances(
                token,
                [addr1, addr2],
                [ethers.parseEther("-50"), ethers.parseEther("50")]
            );
        });

        it("Should fail if sender doesn't have enough tokens", async function () {
            const { token, owner, addr1 } = await loadFixture(deployTokenFixture);
            const initialOwnerBalance = await token.balanceOf(owner.address);

            await expect(
                token.connect(addr1).transfer(owner.address, ethers.parseEther("1"))
            ).to.be.revertedWithCustomError(token, "ERC20InsufficientBalance");

            expect(await token.balanceOf(owner.address)).to.equal(initialOwnerBalance);
        });
    });

    describe("Minting", function () {
        it("Should mint tokens to an address", async function () {
            const { token, owner, addr1 } = await loadFixture(deployTokenFixture);
            
            await token.mint(addr1.address, ethers.parseEther("100"));
            expect(await token.balanceOf(addr1.address)).to.equal(ethers.parseEther("100"));
        });

        it("Should fail if non-owner tries to mint", async function () {
            const { token, addr1 } = await loadFixture(deployTokenFixture);
            
            await expect(
                token.connect(addr1).mint(addr1.address, ethers.parseEther("100"))
            ).to.be.revertedWithCustomError(token, "OwnableUnauthorizedAccount");
        });

        it("Should not exceed max supply", async function () {
            const { token, owner } = await loadFixture(deployTokenFixture);
            
            const maxSupply = await token.MAX_SUPPLY();
            const currentSupply = await token.totalSupply();
            const remainingSupply = maxSupply - currentSupply;

            await expect(
                token.mint(owner.address, remainingSupply + ethers.parseEther("1"))
            ).to.be.revertedWith("Exceeds max supply");
        });
    });

    describe("Pausing", function () {
        it("Should pause and unpause transfers", async function () {
            const { token, owner, addr1 } = await loadFixture(deployTokenFixture);

            await token.pause();
            await expect(
                token.transfer(addr1.address, ethers.parseEther("10"))
            ).to.be.revertedWithCustomError(token, "EnforcedPause");

            await token.unpause();
            await expect(
                token.transfer(addr1.address, ethers.parseEther("10"))
            ).to.not.be.reverted;
        });

        it("Should fail if non-owner tries to pause", async function () {
            const { token, addr1 } = await loadFixture(deployTokenFixture);
            
            await expect(
                token.connect(addr1).pause()
            ).to.be.revertedWithCustomError(token, "OwnableUnauthorizedAccount");
        });
    });

    describe("Burning", function () {
        it("Should burn tokens", async function () {
            const { token, owner } = await loadFixture(deployTokenFixture);
            
            const initialBalance = await token.balanceOf(owner.address);
            await token.burn(ethers.parseEther("100"));
            
            expect(await token.balanceOf(owner.address)).to.equal(
                initialBalance - ethers.parseEther("100")
            );
        });
    });
});
