<script lang="ts">
    import signer from "../../store/signer";

    import fetchCantos from "../../utils/fetchCantos";

</script>

<button on:click={async () => {
    await fetchCantos($signer)

}} >Get Cantos </button>