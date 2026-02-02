const hre = require("hardhat");

async function main() {
    const [signer] = await hre.ethers.getSigners();
    console.log("Interacting with account:", signer.address);

    // Replace with your deployed contract address
    const TOKEN_ADDRESS = "YOUR_TOKEN_ADDRESS_HERE";

    const Token = await hre.ethers.getContractFactory("Token");
    const token = Token.attach(TOKEN_ADDRESS);

    // Get token info
    const name = await token.name();
    const symbol = await token.symbol();
    const totalSupply = await token.totalSupply();
    const balance = await token.balanceOf(signer.address);

    console.log("\n📊 Token Information:");
    console.log("═".repeat(50));
    console.log("Name:", name);
    console.log("Symbol:", symbol);
    console.log("Total Supply:", hre.ethers.formatEther(totalSupply));
    console.log("Your Balance:", hre.ethers.formatEther(balance));
    console.log("═".repeat(50));
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
