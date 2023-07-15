const Verifier = artifacts.require("Verifier");

module.exports = async (deployer) => {
  
  await deployer.deploy(Verifier);
  await Verifier.deployed();

};
