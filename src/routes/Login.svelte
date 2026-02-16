<script>
    import { auth } from "../stores/auth.svelte";
    import { loginRequest as loginService } from "../services/authService";
    import { router } from "../router.svelte.js";
    import Toast from "../components/Toast.svelte";

    let email = $state("");
    let password = $state("");
    let errorMessage = $state("");

    let loading = $state(false);
    let isSuccess = $state(false);

    $effect(() => {
        if (auth.user && !isSuccess) { //para que el efecto no me saque ni bien se loguea el usaurio y muestre la toast
            router.goto("/dashboard");
        }
    });

    const handleSubmit = async () => {
        loading = true;
        errorMessage = "";
        try {
            const userData = await loginService(email, password);
            auth.login(userData);
            isSuccess = true;
            setTimeout(() => {
                router.goto("/dashboard");
            }, 1500);
        } catch (err) {
            errorMessage = "Credenciales incorrectas o error en el servidor";
        } finally {
            loading = false;
        }
    };
</script>

<article style="max-width: 400px; margin: auto; margin-top: 6rem;">
    <header>
        <h3>Iniciar Sesión</h3>
    </header>

    <form
        onsubmit={(e) => {
            e.preventDefault();
            handleSubmit();
        }}
    >
        <label>
            Email
            <input
                type="email"
                bind:value={email}
                placeholder="tu@email.com"
                required
            />
        </label>

        <label>
            Password
            <input
                type="password"
                bind:value={password}
                placeholder="••••••••"
                required
            />
        </label>
        <button type="submit" aria-busy={loading}>
            {loading ? "Entrando..." : "Entrar"}
        </button>
    </form>
</article>

{#if errorMessage}
    <Toast message={errorMessage} type="error" />
{/if}

{#if isSuccess}
    <Toast message="¡Bienvenido!" type="success" />
{/if}
