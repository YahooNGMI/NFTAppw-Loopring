<script lang="ts">
  import ConnectEthereumWallet from "./buttons/ConnectEthereumWallet.svelte";

  import displayEthereumAddress from "../utils/displayEthereumAddress";
  import { ethereumAccount, solanaAccount } from "../store/account";
  import displaySolanaAddress from "../utils/displaySolanaAddress";
  import connectPhantom from "../utils/connectPhantom";
  import ConnectSolanaWallet from "./buttons/ConnectSolanaWallet.svelte";
  import FilterNfTsByType from "./buttons/filterNFTsByType.svelte";
  import ConnectWallet from "./buttons/ConnectWallet.svelte";
  import Nft from "./NFT.svelte";
  import nfts from "../store/nfts";
</script>

<div id="header">
  <div id="topHeader">
    <div id="logo">
      <h1 id="headerLogo">NFT Viewooor</h1>
      <input
        id="addressLookUp"
        class="walletInput"
        placeholder="Enter Wallet Address here"
      />
      <button id="addressLookUpButton">🔍</button>
      <div />
    </div>

    <div class="headerButtons">
      <ConnectWallet />
    </div>
  </div>
  <div id="filterBox">
    {#if $nfts}
      <FilterNfTsByType />
    {/if}
  </div>
</div>

<style>
  #addressLookUp {
    margin-top: 25px;
    margin-left: 20px;
    height: 25%;
    min-width: 100px;
  }
#addressLookUpButton {
 font-size:10px; 
 background-color: rgba(63, 63, 63, 0.95);
 height:35px;
 margin-top: 20px;

}
  #header {
    position: fixed;
    height: 100px;
    width: 100%;
    background-color: rgba(63, 63, 63, 0.95);
    color: white;
    border-bottom: 1px solid white;
    vertical-align: middle;
    overflow: hidden;
    margin-top:-20px;
    z-index: 100;
  }

  #topHeader {
    height: 80%;
    display: flex;
  }

  .headerButtons {
   
    width: 20%;
  }

  #logo {
  
    width: 70%;
    display: flex;
    margin-left: 10px;
    font-size: 5px;
    color: white;
    vertical-align: middle;
    padding: 1px;
  }

  #headerLogo {
    border: 2px solid whitesmoke;
    border-radius: 25px;
    display: flex;
    width: 125px;
    min-width: 125px;
    justify-content: center;
    align-items: center;
    
    background-color: whitesmoke;
    color: black;
  }
  .headerButtons {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
