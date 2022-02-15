<script>
    import { goto } from "@sapper/app";
    import FlexContainer from "../../components/common/flexContainer.svelte";
    import LoginModel from "../../components/common/loginModel.svelte";
    import { getAuth ,signInWithEmailAndPassword, signOut } from "firebase/auth";
    const auth = getAuth();
    function login(params) {
        signInWithEmailAndPassword(auth,params.detail.email,params.detail.password).then(user => { 
            goto(`/Driver/${user.user.uid}`);
        });
    }
</script>
    
    <svelte:head>
        <title>Transport | Home</title>
    </svelte:head>
    <FlexContainer ref="main-background">
        <LoginModel header="Driver Login" on:login={(login)} on:signup={(e) => console.log(e)} />
    </FlexContainer>
    <style>
    
    :global([ref=main-background]){
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
    }
    </style>
    
    