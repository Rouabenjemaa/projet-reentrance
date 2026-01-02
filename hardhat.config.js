
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  
  solidity: {
    version: "0.8.20",  
    settings: {
      optimizer: {
        enabled: true,   
        runs: 200        
      }
    }
  },
  
  
  networks: {
  
    hardhat: {
      chainId: 31337,
     
      accounts: {
        mnemonic: "test test test test test test test test test test test junk",
        accountsBalance: "10000000000000000000000" 
      }
    },
    
    
    sepolia: {
      url: "https://rpc.sepolia.org",
      accounts: {
        mnemonic: "votre phrase seed"
      }
    }
  },
  
  
  mocha: {
    timeout: 120000  
  },
  


};