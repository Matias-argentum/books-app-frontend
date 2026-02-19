<script>
    import BookCard from "../components/BookCard.svelte";
    import BookModal from "../components/BookModal.svelte";
    import Sidebar from "../components/Sidebar.svelte";
    import Toast from "../components/Toast.svelte";
    import {
        getBooks,
        postBook,
        putBook,
        deleteBook,
        patchBook,
    } from "../services/bookService";
    import { getAuthors } from "../services/authorService";
    import { auth } from "../stores/auth.svelte";
    import AlertModal from "../components/AlertModal.svelte";
    import ChangeStateModal from "../components/ChangeStateModal.svelte";
    import { router } from "../router.svelte";

    let isLoading = $state(false);
    let errorMessage = $state("");
    let endpoint = $state("my-books");

    let books = $state([]);
    let authors = $state([]);

    let showModal = $state(false);
    let selectedBook = $state(null);

    let showDeleteAlert = $state(false);
    let showChangeStateModal = $state(false);

    const onSave = async (payload) => {
        if (selectedBook) {
            // Es un PUT (payload + selectedBook.id)
            console.log("Editando...", selectedBook.id, payload);
            try {
                const result = await putBook(
                    auth.user.token,
                    payload,
                    selectedBook.id,
                );
            } catch (error) {
                console.log(error);
                errorMessage = error.message;
            } finally {
                showModal = false;
                await fetchBooks();
            }
        } else {
            // Es un POST (solo payload)
            console.log("Creando...", payload);
            try {
                const result = await postBook(auth.user.token, payload);
            } catch (error) {
                console.log(error);
                errorMessage = error.message;
            } finally {
                showModal = false;
                await fetchBooks();
                await fetchAuthors();
            }
        }
    };

    const onDelete = async (id) => {
        console.log("aca vamos a llamar a la api con el libro aborrar: ", id);
        try {
            const result = await deleteBook(auth.user.token, id);
        } catch (error) {
            errorMessage = error.message;
        } finally {
            showDeleteAlert = false;
            await fetchBooks();
            await fetchAuthors();
        }
    };

    const onEdit = async (id, status) => {
        try {
            const result = await patchBook(auth.user.token, status, id);
        } catch (error) {
            errorMessage = error.message;
        } finally {
            showChangeStateModal = false;
            await fetchBooks();
            await fetchAuthors();
        }
    };

    const openCreateModal = () => {
        selectedBook = null;
        showModal = true;
    };

    const openEditModal = (book) => {
        selectedBook = book;
        showModal = true;
    };

    const openDeleteAlert = (book) => {
        selectedBook = book;
        showDeleteAlert = true;
    };

    const openEditStateModal = (book) => {
        selectedBook = book;
        showChangeStateModal = true;
    };

    const fetchBooks = async () => {
        isLoading = true;
        errorMessage = "";
        try {
            const data = await getBooks(endpoint, auth.user.token);
            books = data;
        } catch (error) {
            errorMessage = error.message;
        } finally {
            isLoading = false;
        }
    };

    const fetchAuthors = async () => {
        isLoading = true;
        errorMessage = "";
        try {
            const data = await getAuthors("authors", auth.user.token);
            authors = data;
        } catch (error) {
            errorMessage = error.message;
        } finally {
            isLoading = false;
        }
    };

    $effect(() => {
        fetchBooks(); // llamamos a esa funcion;
    });

    //effect a aprte para los autores asi no se traen cada vez que cambio el endpoint de libros
    $effect(() => {
        fetchAuthors();
    });

    $effect(()=>{
        if (!auth.user) {
            router.goto("/");
        }
    })

    //$inspect(authors);
</script>

<div class="dashboard-wrapper">
    <Sidebar
        setFilter={(newEndpoint) => (endpoint = newEndpoint)}
        openModal={openCreateModal}
    />

    <main class="books-content" aria-busy={isLoading}>
        <div class="books-container">
            <header class="section-header">
                <h2>Mi Biblioteca</h2>
            </header>

            <div class="books-grid">
                {#each books as book (book.id)}
                    <BookCard
                        {book}
                        openModal={openEditModal}
                        openAlert={openDeleteAlert}
                        {openEditStateModal}
                    />
                {:else}
                    <p>No hay libros</p>
                {/each}
            </div>
        </div>
    </main>
</div>

{#if errorMessage}
    <Toast message={errorMessage} type="error" />
{/if}

<BookModal
    {onSave}
    isOpen={showModal}
    onClose={() => (showModal = false)}
    bookToEdit={selectedBook}
    {authors}
/>

<AlertModal
    {onDelete}
    isOpen={showDeleteAlert}
    onClose={() => (showDeleteAlert = false)}
    bookToDelete={selectedBook}
/>

<ChangeStateModal
    {onEdit}
    isOpen={showChangeStateModal}
    onClose={() => (showChangeStateModal = false)}
    bookToEdit={selectedBook}
/>

<style>
    .dashboard-wrapper {
        display: grid;
        grid-template-columns: clamp(100px, 20vw, 280px) 1fr;
        height: calc(100vh - 4rem);
        overflow: hidden;
    }

    .books-content {
        padding: 2rem;
        overflow-y: auto;
        margin-bottom: 50px;
    }

    .books-container {
        max-width: 900px;
        margin: 0 auto;

        height: 100%;
    }

    .books-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
        overflow-y: auto;
    }

    .section-header {
        margin-bottom: 2rem;
        text-align: center;
    }

    @media (max-width: 1100px) {
        .books-container {
            max-width: 100%;
        }
    }

    @media (max-width: 700px) {
        .books-grid {
            grid-template-columns: 1fr;
        }
    }
</style>
