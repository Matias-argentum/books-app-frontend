<script>
    import { auth } from "../stores/auth.svelte";
    import { router } from "../router.svelte";

    const irAHome = () =>
        auth.user ? router.goto("/dashboard") : router.goto("/");
</script>

<nav class="container-fluid pico-background-zinc-850">
    <ul>
        <li>
            <a
                href="/"
                class="logo-link"
                onclick={(e) => {
                    e.preventDefault();
                    irAHome();
                }}
            >
                <strong>BooksApp</strong>
            </a>
        </li>
    </ul>
    <ul>
        {#if auth.user}
            <li>
                <span>Hola, {auth.user.username}</span>
            </li>

            <li>
                <button
                    class="outline contrast"
                    onclick={() => {
                        auth.logout();
                        router.goto("/");
                    }}
                    style="margin-bottom: 0;"
                >
                    Salir
                </button>
            </li>
        {/if}
    </ul>
</nav>

<style>
    .logo-link {
        text-decoration: none;
        color: deeppink;
        font-weight: 800;
        font-size: larger;
    }

    nav {
        border-bottom: #ccc6b4 1px solid;
        padding: 0 1rem;
    }
</style>
