// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

/**
 * @title Token
 * @dev ERC20 token with burn, pause, and permit functionality
 * @notice Professional implementation with OpenZeppelin v5.0
 */
contract Token is ERC20, ERC20Burnable, ERC20Pausable, Ownable, ERC20Permit {
    uint256 private constant INITIAL_SUPPLY = 1_000_000 * 10**18;
    uint256 public constant MAX_SUPPLY = 10_000_000 * 10**18;

    event TokensMinted(address indexed to, uint256 amount);
    event ContractPaused(address indexed by);
    event ContractUnpaused(address indexed by);

    /**
     * @dev Constructor that gives msg.sender all of existing tokens
     */
    constructor(
        address initialOwner
    ) 
        ERC20("MyToken", "MTK") 
        Ownable(initialOwner)
        ERC20Permit("MyToken")
    {
        _mint(initialOwner, INITIAL_SUPPLY);
    }

    /**
     * @dev Mints new tokens (only owner)
     * @param to Address to mint tokens to
     * @param amount Amount of tokens to mint
     */
    function mint(address to, uint256 amount) external onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "Exceeds max supply");
        _mint(to, amount);
        emit TokensMinted(to, amount);
    }

    /**
     * @dev Pause token transfers (only owner)
     */
    function pause() external onlyOwner {
        _pause();
        emit ContractPaused(msg.sender);
    }

    /**
     * @dev Unpause token transfers (only owner)
     */
    function unpause() external onlyOwner {
        _unpause();
        emit ContractUnpaused(msg.sender);
    }

    /**
     * @dev Required override for _update function
     */
    function _update(
        address from,
        address to,
        uint256 value
    ) internal virtual override(ERC20, ERC20Pausable) {
        super._update(from, to, value);
    }
}