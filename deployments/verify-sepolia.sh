#!/bin/bash
# Verification commands for sepolia
# Deployed at 2026-02-02T16:01:01.210Z

echo "Verifying contracts on sepolia..."

npx hardhat verify --network sepolia 0xAd783e7287097550E2fc3f66C1451015024149F3 "0xb5Cd0E3c49282590ef79D809b475399fd40449cD"
npx hardhat verify --network sepolia 0xd4DE547e1c732eb1127e659591441cb68D05183B "0xb5Cd0E3c49282590ef79D809b475399fd40449cD"
npx hardhat verify --network sepolia 0xa79E59054e52Eb3Bc21733A44CeDBE55975578D8 "0xb5Cd0E3c49282590ef79D809b475399fd40449cD"

echo "Verification complete!"
