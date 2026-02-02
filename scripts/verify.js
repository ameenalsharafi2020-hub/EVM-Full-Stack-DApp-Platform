const hre = require("hardhat");

async function main() {
    // Update these addresses with your deployed contract addresses
    const TOKEN_ADDRESS = "YOUR_TOKEN_ADDRESS";
    const NFT_ADDRESS = "YOUR_NFT_ADDRESS";
    const VAULT_ADDRESS = "YOUR_VAULT_ADDRESS";
    const DEPLOYER_ADDRESS = "YOUR_DEPLOYER_ADDRESS";

    console.log("🔍 Starting verification...\n");

    try {
        // Verify Token
        console.log("Verifying Token...");
        await hre.run("verify:verify", {
            address: TOKEN_ADDRESS,
            constructorArguments: [DEPLOYER_ADDRESS],
        });
        console.log("✅ Token verified\n");

        // Verify NFT
        console.log("Verifying NFT...");
        await hre.run("verify:verify", {
            address: NFT_ADDRESS,
            constructorArguments: [DEPLOYER_ADDRESS],
        });
        console.log("✅ NFT verified\n");

        // Verify Vault
        console.log("Verifying Vault...");
        await hre.run("verify:verify", {
            address: VAULT_ADDRESS,
            constructorArguments: [DEPLOYER_ADDRESS],
        });
        console.log("✅ Vault verified\n");

        console.log("✅ All contracts verified successfully!");
    } catch (error) {
        console.error("❌ Verification error:", error);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
