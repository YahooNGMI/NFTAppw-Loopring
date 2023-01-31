import { writable } from "svelte/store";

const extensionMetaMask = writable<boolean>();
const buttonMetaMask = writable<string>();

const extensionGME = writable<boolean>();
const buttonGME = writable<string>();

const extensionCoinbase = writable<boolean>();
const buttonCoinbase = writable<string>();

const extensionSolana = writable<boolean>();
const buttonSolana = writable<string>();
const buttonSolanaActive = writable<string>();
buttonSolanaActive.set("none");
export {extensionGME, buttonGME, 
    extensionMetaMask, buttonMetaMask, 
    extensionCoinbase, buttonCoinbase,
extensionSolana, buttonSolana, buttonSolanaActive};