<script>
    export let text = 'Home';
    export let ref;
    export let link="/";
</script>

<a class="link" href="{link}" {ref}>
    {text}
</a>

<style>
    .link{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1vw 1.5vw;
        font-weight: bolder;
        text-decoration: underline;
        color: black;
        border-radius: 1vw;
        text-align: center;
        vertical-align: center;
        transition: background-color 0.2s, color 0.2s, transform 0.2s;
    }
    .link:hover {
        cursor: pointer;
        background-color: black;
        color: dodgerblue;
        transform: translate(0,-5px);
    }
</style>