<script>
    let { isOpen, onEdit, onClose, bookToEdit } = $props();

    let bookStatus = $state("");
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(
            "Acabo de confirmar que quiero cambiar el estado de ",
            bookToEdit.title,
        );
        onEdit(bookToEdit?.id, bookStatus);
    };

    $effect(() => {
        if (isOpen && bookToEdit) {
            bookStatus = bookToEdit.status;
        }
    });
    $inspect(bookStatus);
</script>

<dialog open={isOpen}>
    <article>
        <header>
            <button aria-label="Close" class="close" onclick={onClose}></button>
            <h6>Actualizar estado de {bookToEdit?.title}</h6>
        </header>
        <form onsubmit={handleSubmit}>
            <fieldset>
                <legend>Estado de lectura</legend>
                <div class="radio-group">
                    <label class="radio-item">
                        <input
                            type="radio"
                            bind:group={bookStatus}
                            value="READING"
                        /> Leyendo
                    </label>
                    <label class="radio-item">
                        <input
                            type="radio"
                            bind:group={bookStatus}
                            value="READ"
                        /> Leído
                    </label>
                    <label class="radio-item">
                        <input
                            type="radio"
                            bind:group={bookStatus}
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
                    <button type="submit">Actualizar Estado</button>
                </div>
            </footer>
        </form>
    </article>
</dialog>
