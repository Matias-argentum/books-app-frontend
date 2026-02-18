<script>
    import { IconEdit, IconRefresh, IconTrash } from "@tabler/icons-svelte";

    let { book, openModal } = $props();
</script>

<div class="actions-container">
    <button 
        class="action-btn edit" 
        data-tooltip="Editar libro"
        aria-label="Editar"
        onclick={() => openModal(book)}
    >
        <IconEdit size={20} />
    </button>

    <button 
        class="action-btn status" 
        data-tooltip="Cambiar estado"
        aria-label="Cambiar estado"
    >
        <IconRefresh size={20} />
    </button>

    <button 
        class="action-btn delete" 
        data-tooltip="Eliminar libro"
        aria-label="Eliminar"
    >
        <IconTrash size={20} />
    </button>
</div>

<style>
    .actions-container {
        display: flex;
        justify-content: space-around;
        width: 100%;
        gap: 10px;
    }

    .action-btn {
        background: transparent;
        border: none;
        padding: 8px;
        margin: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
        color: var(--pico-muted-color);
        width: auto;
    }

    .edit:hover {
        color: var(--pico-primary-hover);
        background: var(--pico-primary-background);
    }

    .status:hover {
        color: #a3e635;
        background: rgba(163, 230, 53, 0.1);
    }

    .delete:hover {
        color: #ff4d4d;
        background: rgba(255, 77, 77, 0.1);
    }

    .action-btn :global(svg) {
        stroke-width: 1.5;
    }
</style>