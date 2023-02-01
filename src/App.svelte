<script lang="ts">
  import { fly } from "svelte/transition";
  import Header from "./components/Header.svelte";
  import NfTview from "./components/NFTview.svelte";
  import WalletModal from "./components/WalletModal.svelte";
  import { ethereumAccount, solanaAccount } from "./store/account";

  import NftModal from "./components/NFTModal.svelte";
  import { onMount } from "svelte";
 import Buffer from './utils/buffer'

  let visible = true;


  function swoop() {
    return {
      duration: 1000,

      css: (t, u) => `transform:  translateX(${u * 100}%);`,
    };
  }
  let showing = true;

</script>

<div>
  <Header />
</div>
<div />
<WalletModal />

{#if visible}
  <p transition:fly={{ y: 200, duration: 2000 }}>Flies in and out</p>
{/if}

{#if $ethereumAccount || $solanaAccount}
  <NfTview />
{:else}
  Connect a Wallet
{/if}

<NftModal />
