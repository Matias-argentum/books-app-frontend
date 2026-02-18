<script>
    import { fade } from "svelte/transition";
    let { isOpen, onSave, onClose, authors = [], bookToEdit = null } = $props();

    let title = $state("");
    let publisher = $state("");
    let status = $state("READING");
    let selectedAuthorId = $state("");
    let authorName = $state("");
    let authorLastName = $state("");

    // Ordenar autores (esto reaccionará cuando 'authors' deje de estar vacío)
    let sortedAuthors = $derived(
        [...authors].sort((a, b) => a.lastName.localeCompare(b.lastName)),
    );

    $inspect(authors);

    // ESCUCHA CAMBIOS: Aquí es donde "poblamos" el modal si vamos a editar
    $effect(() => {
        if (isOpen) {
            if (bookToEdit) {
                // MODO EDICIÓN
                title = bookToEdit.title;
                publisher = bookToEdit.publisher;
                status = bookToEdit.status;
                selectedAuthorId = bookToEdit.author?.id || "";
            } else {
                // MODO CREACIÓN
                resetForm();
            }
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = { title, publisher, status };
        
        if (selectedAuthorId === "new" && !bookToEdit) {
            payload.authorName = authorName;
            payload.authorLastName = authorLastName;
        } else {
            payload.authorId = Number(selectedAuthorId);
        }

        onSave(payload);
    };

    const resetForm = () => {
        title = "";
        publisher = "";
        status = "READING";
        selectedAuthorId = "";
        authorName = "";
        authorLastName = "";
    };
</script>

<dialog open={isOpen}>
    <article class="compact-modal">
        <header>
            <button aria-label="Close" class="close" onclick={onClose}></button>
            <h6 style="margin:0">
                {bookToEdit ? "Editar Libro" : "Nuevo Libro"}
            </h6>
        </header>

        <form onsubmit={handleSubmit}>
            <div class="grid">
                <label
                    >Título
                    <input type="text" bind:value={title} required />
                </label>
                <label
                    >Editorial
                    <input type="text" bind:value={publisher} required />
                </label>
            </div>

            <!-- svelte-ignore a11y_label_has_associated_control -->
            <label>Autor</label>
            <select bind:value={selectedAuthorId} required>
                {#if authors.length === 0}
                    <option value="" disabled selected
                        >Cargando autores...</option
                    >
                {:else}
                    <option value="" disabled selected
                        >Selecciona un autor...</option
                    >
                {/if}

                {#each sortedAuthors as a}
                    <option value={a.id}>{a.lastName}, {a.name}</option>
                {/each}
                {#if !bookToEdit}
                    <option value="new"
                        >➕ OTRA OPCIÓN: Agregar nuevo autor...</option
                    >
                {/if}
            </select>

            {#if selectedAuthorId === "new" && !bookToEdit}
                <div class="grid new-author-box" transition:fade>
                    <input
                        type="text"
                        bind:value={authorName}
                        placeholder="Nombre"
                        required
                    />
                    <input
                        type="text"
                        bind:value={authorLastName}
                        placeholder="Apellido"
                        required
                    />
                </div>
            {/if}

            <fieldset>
                <legend>Estado de lectura</legend>
                <div class="radio-group">
                    <label class="radio-item">
                        <input
                            type="radio"
                            bind:group={status}
                            value="READING"
                        /> Leyendo
                    </label>
                    <label class="radio-item">
                        <input type="radio" bind:group={status} value="READ" /> Leído
                    </label>
                    <label class="radio-item">
                        <input
                            type="radio"
                            bind:group={status}
                            value="TO_READ"
                        /> Por leer
                    </label>
                </div>
            </fieldset>

            <footer>
                <div class="grid">
                    <button
                        type="button"
                        class="secondary outline"
                        onclick={onClose}>Cancelar</button
                    >
                    <button type="submit"
                        >{bookToEdit ? "Actualizar" : "Guardar"}</button
                    >
                </div>
            </footer>
        </form>
    </article>
</dialog>

<style>
    .compact-modal {
        max-width: 480px;
        padding: 0.8rem;
    }

    label,
    input,
    select,
    legend {
        font-size: 0.8rem !important;
        margin-bottom: 0.3rem;
    }

    /* FIX PARA RADIOS ESTIRADOS */
    .radio-group {
        display: flex;
        justify-content: flex-start; /* No estirar a los bordes */
        gap: 1.5rem; /* Espacio fijo entre ellos */
        padding: 0.5rem;
        background: var(--pico-card-sectioning-background);
        border-radius: 6px;
    }

    .radio-item {
        margin: 0;
        display: flex;
        align-items: center;
        gap: 8px;
        white-space: nowrap; /* Evita que el texto se rompa */
        width: auto; /* IMPORTANTE: para que no se estire */
    }

    .new-author-box {
        margin-top: 0.5rem;
    }

    footer button {
        padding: 0.4rem;
        font-size: 0.85rem;
    }
</style>
