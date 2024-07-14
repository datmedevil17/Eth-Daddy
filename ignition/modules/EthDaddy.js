
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");



module.exports = buildModule("EthDaddy", (m) => {


  const EthDaddy = m.contract("EthDaddy", []);

  return { EthDaddy };
});



