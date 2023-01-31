import { writable } from "svelte/store"; 

const walletModalStatus = writable<string> ();
walletModalStatus.set("none")

const walletModalText = writable<string>();
walletModalText.set("Open Wallet")
export {walletModalStatus, walletModalText};