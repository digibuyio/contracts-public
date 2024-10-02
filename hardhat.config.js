require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
const{mnemonic} = process.env;
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true
      }
    }
  }
};
