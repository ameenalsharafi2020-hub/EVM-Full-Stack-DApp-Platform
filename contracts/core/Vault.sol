// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title Vault
 * @dev Secure token vault with time-locked withdrawals
 */
contract Vault is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    struct Deposit {
        uint256 amount;
        uint256 unlockTime;
        bool withdrawn;
    }

    mapping(address => mapping(address => Deposit[])) public deposits;

    event Deposited(
        address indexed user,
        address indexed token,
        uint256 amount,
        uint256 unlockTime,
        uint256 depositId
    );
    
    event Withdrawn(
        address indexed user,
        address indexed token,
        uint256 amount,
        uint256 depositId
    );

    constructor(address initialOwner) Ownable(initialOwner) {}

    /**
     * @dev Deposit tokens with time lock
     * @param token Token address
     * @param amount Amount to deposit
     * @param lockDuration Lock duration in seconds
     */
    function deposit(
        address token,
        uint256 amount,
        uint256 lockDuration
    ) external nonReentrant {
        require(amount > 0, "Amount must be greater than 0");
        require(lockDuration > 0, "Lock duration must be greater than 0");

        IERC20(token).safeTransferFrom(msg.sender, address(this), amount);

        uint256 unlockTime = block.timestamp + lockDuration;
        
        deposits[msg.sender][token].push(
            Deposit({
                amount: amount,
                unlockTime: unlockTime,
                withdrawn: false
            })
        );

        uint256 depositId = deposits[msg.sender][token].length - 1;

        emit Deposited(msg.sender, token, amount, unlockTime, depositId);
    }

    /**
     * @dev Withdraw unlocked tokens
     * @param token Token address
     * @param depositId Deposit ID
     */
    function withdraw(address token, uint256 depositId) external nonReentrant {
        Deposit storage userDeposit = deposits[msg.sender][token][depositId];
        
        require(!userDeposit.withdrawn, "Already withdrawn");
        require(block.timestamp >= userDeposit.unlockTime, "Still locked");
        require(userDeposit.amount > 0, "No deposit found");

        userDeposit.withdrawn = true;
        
        IERC20(token).safeTransfer(msg.sender, userDeposit.amount);

        emit Withdrawn(msg.sender, token, userDeposit.amount, depositId);
    }

    /**
     * @dev Get user deposits count
     */
    function getDepositsCount(
        address user,
        address token
    ) external view returns (uint256) {
        return deposits[user][token].length;
    }

    /**
     * @dev Get deposit info
     */
    function getDeposit(
        address user,
        address token,
        uint256 depositId
    ) external view returns (uint256 amount, uint256 unlockTime, bool withdrawn) {
        Deposit memory userDeposit = deposits[user][token][depositId];
        return (userDeposit.amount, userDeposit.unlockTime, userDeposit.withdrawn);
    }
}