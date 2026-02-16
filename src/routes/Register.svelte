<script>
    import { auth } from "../stores/auth.svelte";
    import { registerRequest as registerService } from "../services/authService";
    import { router } from "../router.svelte";
    import Toast from "../components/Toast.svelte";

    let email = $state("");
    let username = $state("");
    let password = $state("");
    let confirmPassword = $state("");

    let errorMessage = $state("");
    let loading = $state(false);
    let isSuccess = $state(false);

    //aca agregaria un state para el succes y uego en algun lugar del markup con un if succes muestro el emnsaje de registro exitoso con fondo verde de pico??

    let validForm = $derived(
        email.includes("@") &&
            password.length >= 6 &&
            password === confirmPassword &&
            username.length > 1,
    );

    $effect(() => {
        if (auth.user) {
            router.goto("/dashvoard");
        }
    });

    const handleSubmit = async () => {
        errorMessage = "";
        loading = true;

        try {
            const response = await registerService(email, username, password);
            isSuccess = true;
            setTimeout(() => {
                router.goto("/login");
            }, 2500);
        } catch (err) {
            errorMessage = err.message;
        } finally {
            loading = false;
        }
    };
</script>

<article>
    <header>
        <h3>Registro</h3>
    </header>

    <form
        onsubmit={(e) => {
            e.preventDefault();
            handleSubmit();
        }}
    >
        <label
            >Email
            <input
                type="email"
                placeholder="tu@email.com"
                bind:value={email}
                required
            />
        </label>

        <label>
            Usuario
            <input
                type="text"
                placeholder="Nombre de usuario"
                bind:value={username}
                required
            />
        </label>

        <label>
            Contraseña
            <input
                type="password"
                bind:value={password}
                placeholder="••••••••"
                required
            />
        </label>

        <label>
            Confirmar Contraseña
            <input
                type="password"
                bind:value={confirmPassword}
                placeholder="••••••••"
                required
            />
        </label>
        <button type="submit" aria-busy={loading} disabled={!validForm}>
            {loading ? "Registrando..." : "Registrarse"}
        </button>
    </form>
</article>
{#if errorMessage}
    <Toast message={errorMessage} type="error" />
{/if}

{#if isSuccess}
    <Toast message="¡Registro exitoso!" type="success" />
{/if}

<style>
    article {
        max-width: 400px;
        margin: auto;
        margin-top: 4rem;
    }
</style>
