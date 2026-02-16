<script>
    import { fly } from "svelte/transition";

    let { message, type } = $props();
</script>

    <div
        class="toast  {type === 'success' ? 'pico-background-cyan-300' : 'pico-background-red-350'}"
        transition:fly={{ y: -20, duration: 500 }}
    >
        {message}
    </div>

<style>
    .toast {
        position: fixed;
        top: 4rem;
        left: 4rem;
        padding: 1rem;
        border-radius: 8px;
        z-index: 1000;
    }
</style>
