// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BACToken is ERC20Burnable, Ownable {
    //Max total supply 31.29M
    uint256 public constant MAX_TOTAL_SUPPLY = 31290000 * 10 ** 18;
    // total mine amount = Max_Total_Supply * 70%;
    uint256 public constant MINE_TOTAL_AMOUNT = 21903000 * 10 ** 18;
    // three fundation part each 10% of the MAX_TOTAL_SUPPLY
    uint256 public constant FUNDATION_PART_AMOUNT = 3129000 * 10 ** 18;

    constructor() ERC20("Business Alliance Coin", "BAC") Ownable(msg.sender) {}

    /// first time to distribute bac to four accounts
    /// @param mineWorker_ mine part takes 70% of MAX_TOTAL_SUPPLY
    /// @param projectFund_ project fund part takes 10% of MAX_TOTAL_SUPPLY
    /// @param financingFund_ financing fund part takes 10% of MAX_TOTAL_SUPPLY
    /// @param ecologicalFund_ ecological fund part takes 10% of MAX_TOTAL_SUPPLY
    function distribute(
        address mineWorker_,
        address projectFund_,
        address financingFund_,
        address ecologicalFund_
    ) external onlyOwner {
        require(totalSupply() == 0, "should distribute only once");
        _mint(mineWorker_, MINE_TOTAL_AMOUNT);
        _mint(projectFund_, FUNDATION_PART_AMOUNT);
        _mint(financingFund_, FUNDATION_PART_AMOUNT);
        _mint(ecologicalFund_, FUNDATION_PART_AMOUNT);
    }
}