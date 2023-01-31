<script lang="ts">
  import { ethereumAccount, solanaAccount } from "../../store/account";
  import nfts from "../../store/nfts";
  import connectGME from "../../utils/connectGME";
  import connectMetaMask from "../../utils/connectMetaMask";
  // import connectCoinbase from "../../utils/connectCoinbase";
  import fetchNFTsByAddress from "../../utils/fetchNFTsByAddress";
  import {
    extensionGME,
    buttonGME,
    extensionMetaMask,
    buttonMetaMask,
    extensionCoinbase,
    buttonCoinbase,
  } from "../../store/buttonDisplay";

  extensionGME.set(true);
  extensionMetaMask.set(true);
  extensionCoinbase.set(true);
  buttonMetaMask.set("Connect MetaMask Wallet");
  buttonGME.set("Connect GameStop Wallet");
  buttonCoinbase.set("Connect Coinbase Wallet");
</script>

<button
  id="connectMetaMaskButton"
  class="connectWalletButton"
  on:click={async () => {
    if ($extensionMetaMask === true) {
      await connectMetaMask().then((address) =>
        fetchNFTsByAddress(address).then((data) => {
          // ToDo: Refactor
          function pushNFTsToCollection($nfts, data) {
            if ($nfts && $nfts.length) {
              $nfts = $nfts.concat(data);
              $nfts.forEach(function (nft, index) {
            nft.index = index;
          });
            } else {
              nfts.set(data);
            }
          }
          pushNFTsToCollection(nfts, data)
     
        })
      );
    } else {
      window.open("https://metamask.io/");
    }
  }}>{$buttonMetaMask}</button
>

<button
  id="connectGMEbutton"
  class="connectWalletButton"
  on:click={async () => {
    if ($extensionGME === true) {
      await connectGME().then((address) =>
        fetchNFTsByAddress(address).then((data) => {
          // ToDo: refactor
          function pushNFTsToCollection($nfts, data) {
            if ($nfts && $nfts.length) {
              $nfts = $nfts.concat(data);
            } else {
              $nfts.set(data);
            }
          }
          pushNFTsToCollection($nfts, data);
          $nfts.forEach(function (nft, index) {
            nft.index = index;
          });
        })
      );
    } else {
      window.open("https://wallet.gamestop.com/");
    }
  }}>{$buttonGME}</button
>

<!-- <button 
id="connectCoinBasebutton" class="connectWalletButton"
  on:click={async () => {
    if ($extensionGME === true) {
      await connectCoinbase().then((address) =>
        fetchNFTsByAddress(address).then((data) => {
          // ToDo: Refactor
          function pushNFTsToCollection(chainAccount, data) {
            if ($nfts && $nfts.length) {
              console.log(chainAccount);
              $nfts = $nfts.concat(data);
            } else {
              nfts.set(data);
            }
          }
          pushNFTsToCollection(ethereumAccount, data);
        })
      );
    } else {
      window.open("https://www.coinbase.com/wallet/downloads");
    }
  }}>{$buttonCoinbase}</button
> -->
<style>
  .connectWalletButton {
    width: 200px;
    margin: 10px;
  }
</style>
