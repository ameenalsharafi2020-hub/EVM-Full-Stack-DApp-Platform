const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
    console.log("🚀 Starting deployment...\n");

    const [deployer] = await hre.ethers.getSigners();
    console.log("📝 Deploying contracts with account:", deployer.address);
    
    const balance = await hre.ethers.provider.getBalance(deployer.address);
    console.log("💰 Account balance:", hre.ethers.formatEther(balance), "ETH\n");

    // Deploy Token
    console.log("📄 Deploying Token...");
    const Token = await hre.ethers.getContractFactory("Token");
    const token = await Token.deploy(deployer.address);
    await token.waitForDeployment();
    const tokenAddress = await token.getAddress();
    console.log("✅ Token deployed to:", tokenAddress);

    // Deploy NFT
    console.log("\n📄 Deploying NFT...");
    const NFT = await hre.ethers.getContractFactory("NFT");
    const nft = await NFT.deploy(deployer.address);
    await nft.waitForDeployment();
    const nftAddress = await nft.getAddress();
    console.log("✅ NFT deployed to:", nftAddress);

    // Deploy Vault
    console.log("\n📄 Deploying Vault...");
    const Vault = await hre.ethers.getContractFactory("Vault");
    const vault = await Vault.deploy(deployer.address);
    await vault.waitForDeployment();
    const vaultAddress = await vault.getAddress();
    console.log("✅ Vault deployed to:", vaultAddress);

    // Save deployment info
    const deploymentInfo = {
        network: hre.network.name,
        deployer: deployer.address,
        timestamp: new Date().toISOString(),
        contracts: {
            Token: tokenAddress,
            NFT: nftAddress,
            Vault: vaultAddress
        },
        blockNumber: await hre.ethers.provider.getBlockNumber(),
        transactionHashes: {
            Token: token.deploymentTransaction().hash,
            NFT: nft.deploymentTransaction().hash,
            Vault: vault.deploymentTransaction().hash
        }
    };

    const deploymentsDir = path.join(__dirname, "../deployments");
    if (!fs.existsSync(deploymentsDir)) {
        fs.mkdirSync(deploymentsDir, { recursive: true });
    }

    const filename = `deployment-${hre.network.name}-${Date.now()}.json`;
    const filepath = path.join(deploymentsDir, filename);
    fs.writeFileSync(
        filepath,
        JSON.stringify(deploymentInfo, null, 2)
    );

    console.log("\n📋 Deployment Summary:");
    console.log("═".repeat(50));
    console.log("Network:", hre.network.name);
    console.log("Block Number:", deploymentInfo.blockNumber);
    console.log("Deployer:", deployer.address);
    console.log("\n📑 Contract Addresses:");
    console.log("Token:", tokenAddress);
    console.log("NFT:", nftAddress);
    console.log("Vault:", vaultAddress);
    console.log("═".repeat(50));
    console.log("\n✅ Deployment completed successfully!");
    console.log("📁 Deployment info saved to:", filepath);

    // Wait for block confirmations before verification
    if (hre.network.name !== "hardhat" && hre.network.name !== "localhost") {
        console.log("\n⏳ Waiting for block confirmations...");
        
        // Wait for all transactions
        await Promise.all([
            token.deploymentTransaction().wait(6),
            nft.deploymentTransaction().wait(6),
            vault.deploymentTransaction().wait(6)
        ]);
        
        console.log("\n✅ Blocks confirmed!");
        console.log("\n📝 Verify contracts with Etherscan:");
        console.log(`npx hardhat verify --network ${hre.network.name} ${tokenAddress} "${deployer.address}"`);
        console.log(`npx hardhat verify --network ${hre.network.name} ${nftAddress} "${deployer.address}"`);
        console.log(`npx hardhat verify --network ${hre.network.name} ${vaultAddress} "${deployer.address}"`);
        
        // Also create a verification script
        const verifyScript = `#!/bin/bash\n` +
            `# Verification commands for ${hre.network.name}\n` +
            `# Deployed at ${new Date().toISOString()}\n\n` +
            `echo "Verifying contracts on ${hre.network.name}..."\n\n` +
            `npx hardhat verify --network ${hre.network.name} ${tokenAddress} "${deployer.address}"\n` +
            `npx hardhat verify --network ${hre.network.name} ${nftAddress} "${deployer.address}"\n` +
            `npx hardhat verify --network ${hre.network.name} ${vaultAddress} "${deployer.address}"\n\n` +
            `echo "Verification complete!"\n`;
        
        const verifyFilepath = path.join(deploymentsDir, `verify-${hre.network.name}.sh`);
        fs.writeFileSync(verifyFilepath, verifyScript);
        fs.chmodSync(verifyFilepath, '755'); // Make executable on Unix systems
        
        // Also create a Windows batch file
        const batchScript = `@echo off\n` +
            `echo Verifying contracts on ${hre.network.name}...\n\n` +
            `npx hardhat verify --network ${hre.network.name} ${tokenAddress} "${deployer.address}"\n` +
            `npx hardhat verify --network ${hre.network.name} ${nftAddress} "${deployer.address}"\n` +
            `npx hardhat verify --network ${hre.network.name} ${vaultAddress} "${deployer.address}"\n\n` +
            `echo Verification complete!\n` +
            `pause\n`;
        
        const batchFilepath = path.join(deploymentsDir, `verify-${hre.network.name}.bat`);
        fs.writeFileSync(batchFilepath, batchScript);
        
        console.log(`📄 Verification scripts created in deployments folder:`);
        console.log(`   - verify-${hre.network.name}.sh (for Linux/Mac)`);
        console.log(`   - verify-${hre.network.name}.bat (for Windows)`);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("❌ Deployment failed:", error);
        if (error.reason) console.error("Reason:", error.reason);
        if (error.code) console.error("Error code:", error.code);
        process.exit(1);
    });