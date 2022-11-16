require("@nomicfoundation/hardhat-toolbox");

require('dotenv').config();
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
      console.log(account.address);
  }
});
const private_key = process.env.PRIVATE_KEY;
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      // This value will be replaced on runtime
      url: process.env.STAGING_QUICKNODE_KEY,
      accounts: [private_key],
      chainId: 5
      // accounts: {
      //   mnemonic: process.env.MNEMONIC,
      // },
    },
    // mainnet: {
    //   url: process.env.PROD_QUICKNODE_KEY,
    //   accounts: [`0x${process.env.PRIVATE_KEY}`],
    //   chainId: 5,
    // },
  },
};
