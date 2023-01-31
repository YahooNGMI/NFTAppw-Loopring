// import { ethers } from "ethers";
// import Web3modal from "web3modal"
// import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk"
// import { ethereumAccount } from "../store/account";

// import {
//   walletConnectProvider,
// } from "@web3modal/ethereum";

// const providerOptions = {
//   coinbasewallet: {
//     package: CoinbaseWalletSDK,
//     options: {
      
//       appName: "Web3Modal Demo",
//       infuraId: "b5f32cd516e94d3395a90e5ed9c59400"
//     }
//   },

// }


//   async function connectCoinbase() {
//     let web3modal = new Web3modal({
//       cacheProvider: false,
//       providerOptions
//     })

//     const web3ModalInstance = await web3modal.connect();
//     const web3ModalProvider = new ethers.providers.Web3Provider(web3ModalInstance)
//     console.log("Provider:", web3ModalProvider)
//     console.log("Provider:", web3ModalProvider.provider._addresses[0])
//     const providedAccount = web3ModalProvider.provider._addresses[0];
//     ethereumAccount.set(providedAccount);
//     return providedAccount
//   }

// export default connectCoinbase
