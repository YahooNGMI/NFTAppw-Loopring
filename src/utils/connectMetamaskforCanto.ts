import { ethers } from "ethers";
import signer from "../store/signer";
// import NFT_ABI from "../abi/NFT_ABI";
// import { amount } from "../store/amount";

type EthereumWindow = {
  ethereum: any; // todo: get rid of any typing
};

async function connectMetamaskForCantos() {
  const provider = new ethers.providers.Web3Provider(
    (window as any as EthereumWindow).ethereum

  );
console.log("provider:",provider)
  const accounts = await provider.send("eth_requestAccounts", []);
  console.log("accounts",accounts)
  signer.set(provider.getSigner(accounts[0]));
  console.log("signer:",provider.getSigner(accounts[0]))
}

export default connectMetamaskForCantos;