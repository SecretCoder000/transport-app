<script>
    export let button ="Submit";
    export let ref ="";
</script>

<button on:click {ref}>
{button}
</button>

<style>
button{
    font-size: 24px;
    font-weight: 700;
    background-color: dodgerblue;
    color: black;
    border-radius: 5px;
    padding: 12px;
    border: none;
    transition: All 0.2s;
}
button:hover {
    background-color: black;
    color: dodgerblue;
    cursor: pointer;
    transform: translate(0,-5px);
}
</style>

