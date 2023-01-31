import { ethereumAccount, solanaAccount } from "../store/account"
import { buttonSolana, extensionSolana } from "../store/buttonDisplay";

async function connectPhantom() {
    try {
        await (window as any).phantom.solana.connect()
        solanaAccount.set((window as any).phantom.solana.publicKey.toString());
        const solAddress = (window as any).phantom.solana.publicKey.toString()
        console.log("soladdress:", solAddress)
        return solAddress
    } catch (error) {
        console.log(error)
        buttonSolana.set("Download Solana Wallet");
        
        alert("Phantom Wallet is not installed or active.")
        extensionSolana.set(false);

    }
  



}

export default connectPhantom;