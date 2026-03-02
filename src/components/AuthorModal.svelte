<script>
    let { isOpen, onSave, onClose, authorToEdit } = $props();

    let name = $state("");
    let lastName = $state("");
    let nationality = $state("");

    // Sincroniza los campos cuando el modal se abre
    $effect(() => {
        if (isOpen) {
            name = authorToEdit?.name ?? "";
            lastName = authorToEdit?.lastName ?? "";
            nationality = authorToEdit?.nationality ?? "";
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ name, lastName, nationality });
    };
</script>

<dialog open={isOpen}>
    <article>
        <header>
            <button aria-label="Close" class="close" onclick={onClose}></button>
            <h6>{authorToEdit ? "Editar Autor" : "Nuevo Autor"}</h6>
        </header>
        <form onsubmit={handleSubmit}>
            <label>
                Nombre
                <input type="text" bind:value={name} required />
            </label>
            <label>
                Apellido
                <input type="text" bind:value={lastName} required />
            </label>
            <label>
                Nacionalidad
                <input type="text" bind:value={nationality} required />
            </label>
            <footer>
                <div class="grid">
                    <button type="button" class="secondary outline" onclick={onClose}>Cancelar</button>
                    <button type="submit">Guardar</button>
                </div>
            </footer>
        </form>
    </article>
</dialog>