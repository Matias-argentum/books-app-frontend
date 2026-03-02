<script>
    // Cambiamos bookToDelete por itemToDelete
    let { isOpen, onDelete, onClose, itemToDelete } = $props();

    // Variable reactiva que detecta qué nombre mostrar
    let displayName = $derived(
        itemToDelete?.title || `${itemToDelete?.name} ${itemToDelete?.lastName}`
    );

    const handleConfirmation = () => {
        console.log("Confirmando eliminación de:", displayName);
        // Ejecutamos la función onDelete (que vendrá del Dashboard)
        onDelete(itemToDelete.id);
    };
</script>

<dialog open={isOpen}>
    <article>
        <header>
            <button aria-label="Close" class="close" onclick={onClose}></button>
            <h6>Eliminar</h6>
        </header>
        
        <h5>Vas a borrar a <strong>{displayName}</strong>. ¿Seguro?</h5>
        
        <footer>
            <div class="grid">
                <button
                    type="button"
                    class="secondary outline"
                    onclick={onClose}
                >
                    Cancelar
                </button>
                <button 
                    type="button" 
                    class="primary outline" 
                    onclick={handleConfirmation}
                >
                    Borrar
                </button>
            </div>
        </footer>
    </article>
</dialog>