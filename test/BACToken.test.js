const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const BACTokenModule = require("../ignition/modules/BACTokenModule");
const { ethers } = require("hardhat");
describe("BACToken", function () {
    async function deployBACTokenFixture() {
        const [owner, mineWorker, projectPart, financingPart, ecologicalPart] = await ethers.getSigners();
        const { BACToken } = await ignition.deploy(BACTokenModule);
        return { BACToken, owner, mineWorker, projectPart, financingPart, ecologicalPart }
    }

    beforeEach('load fixture', async () => {
        ({ BACToken, owner, mineWorker, projectPart, financingPart, ecologicalPart } = await loadFixture(deployBACTokenFixture))
    });
    describe("Deploy", async function () {
        it("should deploy success on setting", async function () {
            const MAX_TOTAL_SUPPLY = ethers.parseUnits("31290000", 18);
            expect(await BACToken.name()).to.equal("Business Alliance Coin");
            expect(await BACToken.symbol()).to.equal("BAC");
            expect(await BACToken.MAX_TOTAL_SUPPLY()).to.equal(MAX_TOTAL_SUPPLY);

        });

    });
    describe("distribute", async function () {
        it("should distribute success on tokens minted", async function () {
            await BACToken.distribute(mineWorker, projectPart, financingPart, ecologicalPart);
            const FUNDATION_PART_AMOUNT = ethers.parseUnits("3129000", 18);
            const MINE_TOTAL_AMOUNT = ethers.parseUnits("21903000", 18);
            expect(await BACToken.balanceOf(projectPart)).to.equal(FUNDATION_PART_AMOUNT);
            expect(await BACToken.balanceOf(financingPart)).to.equal(FUNDATION_PART_AMOUNT);
            expect(await BACToken.balanceOf(financingPart)).to.equal(FUNDATION_PART_AMOUNT);
            expect(await BACToken.balanceOf(mineWorker)).to.equal(MINE_TOTAL_AMOUNT);
            const MAX_TOTAL_SUPPLY = await BACToken.MAX_TOTAL_SUPPLY();
            expect(await BACToken.totalSupply()).to.equal(MAX_TOTAL_SUPPLY);
        });
        it("should distribute failed when caller is not owner", async function () {
            await expect(BACToken.connect(mineWorker).distribute(mineWorker, projectPart, financingPart, ecologicalPart)).to.be.revertedWithCustomError(BACToken, "OwnableUnauthorizedAccount(address)");
        });

        it("should distribute failed in the second time", async function () {
            await BACToken.connect(owner).distribute(mineWorker, projectPart, financingPart, ecologicalPart);
            await expect(BACToken.connect(owner).distribute(mineWorker, projectPart, financingPart, ecologicalPart)).to.be.revertedWith("should distribute only once");
        });

    });
});