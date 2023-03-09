import type { Signer } from "ethers";
import { writable } from "svelte/store";


const signer = writable<Signer>()

export default signer