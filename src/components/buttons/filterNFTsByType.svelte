<script lang = "ts">
    import filterNFTsByType from "../../utils/filterNFTsByType";
    import nfts from "../../store/nfts";
    import { ethereumAccount, solanaAccount } from "../../store/account";
    import fetchEthereumNfts from "../../utils/fetchEthereumNfts";
    import fetchImxNfts from "../../utils/fectchImxNfts";
    import fetchSolanaNfts from "../../utils/fetchSolanaNfts";
    // import fetchLoopringNfts from "../../utils/fetchLoopringNfts";
    import Nft from "../NFT.svelte";
</script>

<div class="checkbox">
    <div>
        Filter Eth NFTs:
        <input
            type="checkbox"
            id="checkboxdisplayEthNFTs"
            on:change={async (event) => {
                if (event.target.checked) {
                filterNFTsByType($nfts, 0).then((data) => {
                        console.log("data",data);
                        nfts.set(data);
                        $nfts.forEach(function (nft, index) {
                            nft.index = index;
                        });
                    });
                    console.log("await:",$nfts)
                } else {
                fetchEthereumNfts($ethereumAccount).then((data) => {
                        $nfts = $nfts.concat(data);
                        $nfts.forEach(function (nft, index) {
                            nft.index = index;
                        });
                        console.log("unfiltered nfts:", $nfts);
                    });
                }
            
            }}
        />
    </div>

    <div>
        Filter IMX NFTs:<input
            type="checkbox"
            id="checkboxdisplayIMXNFTs"
            on:change={async (event) => {
                if (event.target.checked) {
                    filterNFTsByType($nfts, 1).then((data) => {
                        console.log("data",data);
                        nfts.set(data);
                        $nfts.forEach(function (nft, index) {
                            nft.index = index;
                        });
                    });
                } else {
                    fetchImxNfts($ethereumAccount).then((data) => {
                        $nfts = $nfts.concat(data);
                        console.log("unfiltered nfts:", $nfts);
                        $nfts.forEach(function (nft, index) {
                            nft.index = index;
                            console.log($nfts);
                        });
                    });

                }
            }}
        />
    </div>
    <!-- <div>
        Filter Loopring NFTs:<input
            type="checkbox"
            id="checkboxdisplayLoopringNFTs"
            on:change={async (event) => {
                if (event.target.checked) {
                    filterNFTsByType($nfts, 3).then((data) => {
                        console.log("data",data);
                        nfts.set(data);
                        $nfts.forEach(function (nft, index) {
                            nft.index = index;
                        });
                    });
                } else {
                    fetchLoopringNfts($ethereumAccount).then((data) => {
                        $nfts = $nfts.concat(data);
                        $nfts.forEach(function (nft, index) {
                            nft.index = index;
                        });
                    });
                }
            }}
        />
    </div> -->
    <div>
        Filter Solana NFTs:<input
            type="checkbox"
            id="checkboxdisplaySolNFTs"
            on:change={async (event) => {
              if (event.target.checked) {
                    filterNFTsByType($nfts, 2).then((data) => {
                        console.log("data",data);
                        nfts.set(data);
                        $nfts.forEach(function (nft, index) {
                            nft.index = index;
                        });
                    });
                } else {
                    fetchSolanaNfts($solanaAccount).then((data) => {
                        $nfts = $nfts.concat(data);
                        $nfts.forEach(function (nft, index) {
                            nft.index = index;
                        });
                    });
                }
            }}
        />
    </div>
</div>

<style>
    .checkbox {
        height: 30px;
        display: flex;
        justify-content: space-evenly;
    }

    #chainFilters {
        contain: content;

        height: 300px;
        width: 40px;
        /* contain: content; */
    }
</style>
