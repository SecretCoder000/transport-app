<script>
    import { createEventDispatcher } from "svelte";
    export let header = "Dealer Login";
    import Button from "./button.svelte";
    const dispatch = createEventDispatcher();
    let email = "";
    let password = "";
</script>

<div class="login-background">
    <div class="header flex-row">
        {header}
    </div>
    
    <div class="login-credinailts flex-col">
        <input type="email" placeholder="Email" bind:value="{email}">
        <input type="password" placeholder="Password" bind:value="{password}">
    </div>


    <div class="button-container flex-row">
        <Button button="Sign Up" on:click={() => {dispatch("signup",{header})}} />
        <Button button="Login" on:click={() => {dispatch("login",{header,email,password})}} />
    </div>
</div>

<style>
    .header {
        border-bottom: 2px solid dodgerblue ;
    }
    .login-credinailts > input {
        font-size: 24px;
        color: black;
        margin: 8px 0;
        border: none;
        border-bottom: 2px solid dodgerblue;
    }
    .login-credinailts > input:focus {
        outline: none;
    }
    .header {
        font-size: 32px;
        font-weight: 700;
        color: black;
    }
    .login-background {
        width: 400px;
        height: 250px;
        border: 3px solid dodgerblue;
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 4px 4px 12px;
    }
    .flex-row {
        display: flex;
        align-items: baseline;
        justify-content: space-evenly;
    }
    .flex-col {
        display: flex;
        flex-direction: column;
    }
</style>