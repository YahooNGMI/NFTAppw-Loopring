<script lang="ts">
    import { push } from "svelte-spa-router";
    import Login from "../pages/Login.svelte";
    const routes = {
  
  "/login": Login,
 
};
</script>

<div class="hero min-h-screen" style="background-image: url(https://media.istockphoto.com/id/588959064/photo/parents-hold-babys-hands-happy-family-in-park-evening.jpg?s=612x612&w=0&k=20&c=fAkObNf2z-1Q6a0maRSpOaxyFqTEiiehFirqyNcJk7Y=);">
  <div class="hero-overlay bg-opacity-60"></div>
  <div class="hero-content text-center text-neutral-content">
    <div class="max-w-md">
      <h1 class="mb-5 text-5xl font-bold">Welcome to the Account Creatooooor.</h1>
      <p class="mb-5"> Create an account to get started today!</p>
      <button on:click={async () => await push("/login")} class="btn btn-primary">Get Started</button>
    </div>
  </div>
</div>

<!-- <div class="hero min-h-screen bg-base-200">
  <div class="hero-content flex-col lg:flex-row-reverse">
      <img
          src="https://media.istockphoto.com/id/588959064/photo/parents-hold-babys-hands-happy-family-in-park-evening.jpg?s=612x612&w=0&k=20&c=fAkObNf2z-1Q6a0maRSpOaxyFqTEiiehFirqyNcJk7Y="
          class="max-w-sm rounded-lg shadow-2xl"
      />
      <div>
          <h1 class="text-5xl font-bold">Box Office News!</h1>
          <p class="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut
              assumenda excepturi exercitationem quasi. In deleniti eaque aut
              repudiandae et a id nisi.
          </p>
          <button class="btn btn-primary">Get Started</button>
      </div>
  </div>
</div> -->
<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
