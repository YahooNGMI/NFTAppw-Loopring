<script lang="ts">
import connectMetamaskForCantos from "../../utils/connectMetamaskforCanto";

</script>

<button on:click={async () => {
    await connectMetamaskForCantos()
}} >GetSignerforCanto</button>