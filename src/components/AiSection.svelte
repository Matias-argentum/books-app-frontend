<script>
    import { IconSparkles, IconBook } from "@tabler/icons-svelte";
    import { fade } from "svelte/transition";
    let { recommendations = [] } = $props();
</script>

<div class="ai-view" in:fade>
    <div class="ai-hero">
        <IconSparkles size={48} class="ai-icon-main" />
        <h2>Tu Selección Personalizada</h2>
        <p>Gemini analizó tus lecturas y encontró estas joyas para vos.</p>
    </div>

    <div class="ai-grid">
        {#each recommendations as reco}
            <article class="ai-card">
                <header>
                    <IconBook size={20} />
                    <strong>{reco.title}</strong>
                </header>
                <div class="ai-body">
                    <p class="author">de {reco.author_name} {reco.author_lastname}</p>
                    <p class="description">{reco.description}</p>
                </div>
                <footer>
                    <small>Recomendado por Gemini</small>
                </footer>
            </article>
        {:else}
            <div class="loading-ai">
                <p aria-busy="true">Generando recomendaciones...</p>
            </div>
        {/each}
    </div>
</div>

<style>
    /* El CSS que ya tenías está perfecto */
    .ai-hero { text-align: center; margin-bottom: 3rem; color: var(--pico-primary); }
    .ai-icon-main { margin-bottom: 1rem; color: #7928ca; }
    .ai-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
    .ai-card { 
        border: 1px solid var(--pico-muted-border-color);
        border-radius: 8px;
        background: var(--pico-card-background-color);
    }
    .author { font-weight: bold; color: var(--pico-primary); margin-bottom: 0.5rem; }
    .description { font-size: 0.9rem; line-height: 1.4; }
    .loading-ai { text-align: center; width: 100%; grid-column: 1 / -1; }
</style>