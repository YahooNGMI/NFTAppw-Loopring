<script land="ts">
    import { ethereumAccount, solanaAccount } from "../store/account";
    import { walletModalStatus } from "../store/walletModal";
    import displayEthereumAddress from "../utils/displayEthereumAddress";
    import displaySolanaAddress from "../utils/displaySolanaAddress";
    import ConnectEthereumWallet from "./buttons/ConnectEthereumWallet.svelte";
    import ConnectSolanaWallet from "./buttons/ConnectSolanaWallet.svelte";
</script>

<div id="myModal" class="modal" style="display:{$walletModalStatus}">
    <!-- <span class="close">&times;</span> -->

    <div id="walletButtons">
        <div>
            {#if $ethereumAccount}
                {"Connected Ethereum Account: " +
                    displayEthereumAddress($ethereumAccount)}
                <!-- <DisconnectEthereum/> -->
            {:else}
                <ConnectEthereumWallet />
            {/if}
       
            {#if $solanaAccount}
                {"Connected Solana Account: " +
                    displaySolanaAddress($solanaAccount)}
            {:else}
                <ConnectSolanaWallet />
            {/if}
        </div>
        <div />
    </div>
</div>

<style>
    #myModal {
        position: fixed;
        background-color: rgba(63, 63, 63, 0.95);
        top: 97px;
        border: 1px solid white;
        /* border: 2px solid rgb(1, 1, 1); */
        margin-bottom: 5px;
        z-index: 100;
        /* width: 100%; */
        margin-left: 70%;
    }

    .modal {
    
        width: 30%;
        height: 100%;
        transition: transform 1s ease-out, opacity 1s ease-out;
        /* Add a transition to the transform and opacity properties */
    }
    /* .close {
        color: rgb(208, 200, 200);
        float: left;
        margin-left: 00px;
        font-size: 50px;
        font-weight: bold;
        width: 5px;
        height: 100%;
        background-color: rgb(255, 255, 255);
        border-top-left-radius: 50px;
        border-bottom-left-radius: 50px;
    } */

    /* .modal.close {
        transform: translateX(23%);
        transition: transform 3s ease-out;
    } */

    #walletButtons {
        display: flex;
      text-align: center;
        
    }
</style>
