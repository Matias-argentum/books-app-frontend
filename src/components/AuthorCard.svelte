<script>
    import { IconEdit, IconTrash, IconUser } from "@tabler/icons-svelte";
    import { fade } from "svelte/transition";

    let { author, openModal, openAlert } = $props();
</script>

<article>
    <header>
        <IconUser size={24} />
    </header>
    <div>
        <h6>Nombre: {author?.name}</h6>
        <h6>Apellido: {author?.lastName}</h6>
        <h6>Nacionalidad: {author?.nationality}</h6>
    </div>
    <footer>
        <button
            class="action-btn edit"
            data-tooltip="Editar libro"
            aria-label="Editar"
            onclick={() => openModal(author)}
        >
            <IconEdit size={20} />
        </button>

        <button
            class="action-btn delete"
            data-tooltip="Eliminar libro"
            aria-label="Eliminar"
            onclick={() => {
                console.log("Se abre el alerta para borrar: ", author?.name);
                openAlert(author);
            }}
        >
            <IconTrash size={20} />
        </button>
    </footer>
</article>

<style>
    header {
        display: flex;
        justify-content: space-between;
    }

    article {
        max-width: 350px;
        /* transicion*/
        transition:
            transform 0.2s ease-in-out,
            box-shadow 0.2s ease-in-out;
    }

    article:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
        border-color: var(--pico-primary-border);
    }
</style>
