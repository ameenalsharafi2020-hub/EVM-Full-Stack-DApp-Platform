const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture, time } = require("@nomicfoundation/hardhat-network-helpers");

describe("Vault", function () {
    async function deployVaultFixture() {
        const [owner, addr1, addr2] = await ethers.getSigners();

        const Vault = await ethers.getContractFactory("Vault");
        const vault = await Vault.deploy(owner.address);

        const MockToken = await ethers.getContractFactory("MockToken");
        const token = await MockToken.deploy();

        // Transfer tokens to addr1 for testing
        await token.transfer(addr1.address, ethers.parseEther("1000"));

        return { vault, token, owner, addr1, addr2 };
    }

    describe("Deposits", function () {
        it("Should deposit tokens with time lock", async function () {
            const { vault, token, addr1 } = await loadFixture(deployVaultFixture);
            const amount = ethers.parseEther("100");
            const lockDuration = 3600; // 1 hour

            await token.connect(addr1).approve(await vault.getAddress(), amount);
            
            await expect(
                vault.connect(addr1).deposit(await token.getAddress(), amount, lockDuration)
            ).to.emit(vault, "Deposited");

            expect(await vault.getDepositsCount(addr1.address, await token.getAddress())).to.equal(1);
        });

        it("Should fail with zero amount", async function () {
            const { vault, token, addr1 } = await loadFixture(deployVaultFixture);

            await expect(
                vault.connect(addr1).deposit(await token.getAddress(), 0, 3600)
            ).to.be.revertedWith("Amount must be greater than 0");
        });

        it("Should fail with zero lock duration", async function () {
            const { vault, token, addr1 } = await loadFixture(deployVaultFixture);
            const amount = ethers.parseEther("100");

            await token.connect(addr1).approve(await vault.getAddress(), amount);

            await expect(
                vault.connect(addr1).deposit(await token.getAddress(), amount, 0)
            ).to.be.revertedWith("Lock duration must be greater than 0");
        });
    });

    describe("Withdrawals", function () {
        it("Should withdraw after lock period", async function () {
            const { vault, token, addr1 } = await loadFixture(deployVaultFixture);
            const amount = ethers.parseEther("100");
            const lockDuration = 3600;

            await token.connect(addr1).approve(await vault.getAddress(), amount);
            await vault.connect(addr1).deposit(await token.getAddress(), amount, lockDuration);

            // Fast forward time
            await time.increase(lockDuration + 1);

            await expect(
                vault.connect(addr1).withdraw(await token.getAddress(), 0)
            ).to.emit(vault, "Withdrawn");
        });

        it("Should fail if still locked", async function () {
            const { vault, token, addr1 } = await loadFixture(deployVaultFixture);
            const amount = ethers.parseEther("100");
            const lockDuration = 3600;

            await token.connect(addr1).approve(await vault.getAddress(), amount);
            await vault.connect(addr1).deposit(await token.getAddress(), amount, lockDuration);

            await expect(
                vault.connect(addr1).withdraw(await token.getAddress(), 0)
            ).to.be.revertedWith("Still locked");
        });

        it("Should fail if already withdrawn", async function () {
            const { vault, token, addr1 } = await loadFixture(deployVaultFixture);
            const amount = ethers.parseEther("100");
            const lockDuration = 3600;

            await token.connect(addr1).approve(await vault.getAddress(), amount);
            await vault.connect(addr1).deposit(await token.getAddress(), amount, lockDuration);

            await time.increase(lockDuration + 1);
            await vault.connect(addr1).withdraw(await token.getAddress(), 0);

            await expect(
                vault.connect(addr1).withdraw(await token.getAddress(), 0)
            ).to.be.revertedWith("Already withdrawn");
        });
    });
});
