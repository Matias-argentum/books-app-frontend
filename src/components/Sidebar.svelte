<script>
    import { 
        IconBooks, 
        IconCheck, 
        IconBook2, 
        IconShoppingBagHeart, 
        IconSparkles, 
        IconPlus

    } from "@tabler/icons-svelte";

    let { setFilter, openModal } = $props();
</script>

<aside>
    <nav>
        <ul>
            <li>
                <button class="ghost" onclick={() => setFilter('my-books')}>
                    <IconBooks size={22} /> <span>Todos</span>
                </button>
            </li>
            <li>
                <button class="ghost" onclick={ () => setFilter('read')}>
                    <IconCheck size={22} /> <span>Leídos</span>
                </button>
            </li>
            <li>
                <button class="ghost" onclick={ () => setFilter('reading')}>
                    <IconBook2 size={22} /> <span>Leyendo</span>
                </button>
            </li>
            <li>
                <button class="ghost" onclick={ () => setFilter('wishlist')}>
                    <IconShoppingBagHeart size={22} /> <span>Wishlist</span>
                </button>
            </li>
        </ul>
        <hr />
        <ul>
            <li>
                <button class="ai-button" onclick={() => setFilter('recommendations')}>
                    <IconSparkles size={22} /> <span>IA Recomendación</span>
                </button>
            </li>
        </ul>
        <hr />
        <ul>
            <li>
                <button class="add-button" onclick={() => openModal()}>
                    <IconPlus size={22} /> <span>Agregar</span>
                </button>
            </li>
        </ul>
    </nav> 
</aside>

<style>
    aside {
        padding: 1rem;
        border-right: 1px solid var(--pico-muted-border-color);
        height: 100vh;
        background-color: var(--pico-background-color);
    }

    /* Botones más limpios */
    .ghost {
        background: var(--pico-color-slate-900);
        border: none;
        display: flex;
        align-items: center;
        gap: 12px;
        width: 100%;
        justify-content: flex-start;
        padding: 0.5rem 0.8rem;
        margin-bottom: 0.5rem;
        transition: background 0.2s;
    }

    .ghost:hover {
        background: var(--pico-color-slate-700); /* Un gris sutil */
    }

    .ai-button {
        background: linear-gradient(45deg, #ff0080, #7928ca);
        color: white;
        border: none;
        display: flex;
        align-items: center;
        gap: 12px;
        width: 100%;
        padding: 0.5rem 0.8rem;
    }

    .add-button {
        background: linear-gradient(45deg, #119c57, #4fa019);
        color: white;
        border: none;
        display: flex;
        align-items: center;
        gap: 12px;
        width: 100%;
        padding: 0.5rem 0.8rem;
    }

    @media (max-width: 768px) {
        aside span {
            display: none;
        }
        aside {
            padding: 0.5rem;
        }
    }
</style>