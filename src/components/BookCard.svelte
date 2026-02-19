<script>
    import BookActions from "./BookActions.svelte";
    import { fade } from 'svelte/transition';

    let { book, openModal, openAlert, openEditStateModal } = $props();

    // svelte-ignore state_referenced_locally
        let dateObj = book.addedAt ? new Date(book.addedAt) : new Date();

    let formattedDate = dateObj.toLocaleDateString("es-AR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
</script>

<article transition:fade={{ duration: 300 }}>
    <header>
        <sub>{formattedDate}</sub>
        <sub
            class={book.status === "READING"
                ? "pico-background-cyan-550"
                : "pico-background-pumpkin-550"}>{book.status}</sub
        >
    </header>
    <div class="mainContent">
        <img src={book.imageUrl} alt={book.title} />
        <h6>{book.title}</h6>
        <p>{book.author.name} {book.author.lastName}</p>
        <sub>{book.publisher}</sub>
    </div>
    <footer>
        <BookActions {book} {openModal} {openAlert} {openEditStateModal} />
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

    header sub {
        font-weight: 400;
        padding: 10px 1px;
        border-radius: 2px;
        font-size: 0.7rem;
    }

    h6 {
        margin-top: 10px;
    }

    img {
        width: 100%;
        aspect-ratio: 2/3; /* proporcion de un libro */
        max-height: 400px;
        object-fit: cover;
        border-radius: 8px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    }

    .mainContent {
        padding: 5px;
    }

    .mainContent sub {
        font-weight: 100;
    }
</style>
