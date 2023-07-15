const Verifier = artifacts.require("Verifier");
const Secp256k1 = artifacts.require("Secp256k1");

module.exports = async (deployer) => {
  
    await deployer.deploy(Secp256k1);
    await Secp256k1.deployed();

    await deployer.deploy(Verifier, Secp256k1.address);
    await Verifier.deployed();

};
