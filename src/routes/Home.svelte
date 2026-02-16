<script>
  import { router } from "../router.svelte.js";
</script>


<section style="text-align: center; padding: 6rem 0;">
  <hgroup>
    <h1>Books App</h1>
    <p>Gestiona tu biblioteca personal con IA</p>
  </hgroup>
  
  <div class="grid" style="max-width: 500px; margin: auto;">
    <button class="outline" onclick={() => router.goto("/login")}>
      Iniciar Sesión
    </button>
    <button onclick={() => router.goto("/register")}>
      Registrarse
    </button>
  </div>
</section>