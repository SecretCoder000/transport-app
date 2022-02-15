<script>
    import { getAuth , signOut } from "firebase/auth";
    const auth = getAuth();
</script>
<h1>Under Development</h1>
<button on:click="{() =>{
    signOut(auth)
}}">Sign Out</button>