<script lang="ts">
  import { solanaAccount } from "../../store/account";
  import {
    extensionSolana,
    buttonSolana,
    buttonSolanaActive,
  } from "../../store/buttonDisplay";
  import nfts from "../../store/nfts";
  import connectPhantom from "../../utils/connectPhantom";
  import fetchSolanaNfts from "../../utils/fetchSolanaNfts";

  extensionSolana.set(true);
  buttonSolana.set("Connect Phantom Wallet");
  // buttonSolanaActive.disabled = false;
</script>

<button
  id="connectSolanaButton"
  on:click={async () => {
    if ($extensionSolana === true) {
      await connectPhantom().then((address) =>
        fetchSolanaNfts(address).then((data) => {
          if ($nfts && $nfts.length) {
            $nfts = $nfts.concat(data);
            $nfts.forEach(function (nft, index) {
            nft.index = index;
          });
             
          } else {
            nfts.set(data);
        
          }
          console.log($nfts);
        })
      );
    } else {
      window.open("https://phantom.app/download");
    }
  }}>{$buttonSolana}</button
>

<!-- <button on:click={}</button> -->
<style>
</style>
