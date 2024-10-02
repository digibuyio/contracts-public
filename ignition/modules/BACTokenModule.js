const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const BACTokenModule = buildModule("BACTokenModule", (m) => {
  const BACToken = m.contract("BACToken");
  return { BACToken };
});
module.exports = BACTokenModule;