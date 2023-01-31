import { ethers } from "ethers";
import { ethereumAccount } from "../store/account";
import detectGamestopProvider from "@gamestopnft/detect-gamestop-provider";
import { buttonGME, extensionGME } from "../store/buttonDisplay";

// import ConnectSolanaWallet from "../components/buttons/ConnectSolanaWallet.svelte";
// import {extensionGME, buttonGME} from "../store/buttonDisplay";

type EthereumWindow = {
    // todo: get rid of typing
    ethereum: any;
};
async function connectGME() {
    document.getElementById("connectSolanaButton").classList.add("disabled");
    try {
        const gmeProvider = await detectGamestopProvider();
        // console.log(gmeProvider)
        const provider = new ethers.providers.Web3Provider(gmeProvider);

        const accounts = await provider.send("eth_requestAccounts", []);
        const providedAccount = accounts[0];
        //we need to set acount into a store o we can use it elsewhere
        ethereumAccount.set(providedAccount);
        // const fetchedNFTs: NFT[] = await fetchNFTsByAddress(providedAccount);
        // console.log("fetched NFTS:", fetchedNFTs);
        // nfts.set(fetchedNFTs);
        // console.log("set:",nfts)
        return providedAccount
    } catch (error) {
        buttonGME.set("Download GME Wallet")
        extensionGME.set(false)
        // console.log(error)
        alert("GME Wallet is not installed or turned on.")
    }


}

export default connectGME;