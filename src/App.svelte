<script>
  import Home from "./routes/Home.svelte";
  import Login from "./routes/Login.svelte";
  import Dashboard from "./routes/Dashboard.svelte";
  import Register from "./routes/Register.svelte";
  import { router } from "./router.svelte.js";
  import Navbar from "./components/Navbar.svelte";
</script>

<div style="width: 100%;">
  <Navbar />
  <main>
    {#if router.currentPath === "/"}
      <Home />
    {:else if router.currentPath === "/login"}
      <Login />
    {:else if router.currentPath === "/register"}
      <Register />
    {:else if router.currentPath === "/dashboard"}
      <Dashboard />
    {:else}
      <article>
        <h1>404</h1>
        <p>Página no encontrada</p>
      </article>
    {/if}
  </main>
</div>
