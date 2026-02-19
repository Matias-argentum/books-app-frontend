<script>
    let { isOpen, onDelete, onClose, bookToDelete } = $props();

    const handleConfirmation = () => {
        
        console.log("Acabo de confirmar que quiero borrar", bookToDelete.title);
        onDelete(bookToDelete.id);

    };
</script>

<dialog open={isOpen}>
    <article>
        <header>
            <button aria-label="Close" class="close" onclick={onClose}></button>
            <h6>Eliminar</h6>
        </header>
        <h5>Vas a borrar {bookToDelete?.title} ¿Seguro?</h5>
        <footer>
            <div class="grid">
                <button
                    type="button"
                    class="secondary outline"
                    onclick={onClose}
                    >Cancelar
                </button>
                <button type="button" class="primary outline" onclick={handleConfirmation}
                    >Borrar
                </button>
            </div>
        </footer>
    </article>
</dialog>
