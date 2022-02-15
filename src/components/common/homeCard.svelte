<script>
    import { createEventDispatcher } from "svelte";
    import Button from "../common/button.svelte";
    export let header = "Dealer";
    export let text ="This is some text for dealet. here we can book teckets.This is some text for dealet. here we can book tecketsThis is some text for dealet. here we can book teckets";
    const dispatch = createEventDispatcher();
</script>

<div class="background">
    <div class="header">
        {header}
    </div>
    <div class="text">
        {text}
    </div>
    <div class="button">
        <Button button="Login" on:click={() => dispatch("login")}/>
        <Button button="Sign Up" on:click={() => dispatch("signup")} />
    </div>
</div>

<style>
    .header {
        text-align: center;
        font-size: 32px;
        color: black;
        font-weight: 700;
        border-bottom: 2px solid dodgerblue;
    }
    .background{
        width: 400px;
        height: 250px;
        border: 3px solid dodgerblue;
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 4px 4px 12px;
    }
    .button {
        display: flex;
        justify-content: space-evenly;
    }
</style>