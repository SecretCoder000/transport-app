<script>
    import FlexContainer from "../../components/common/flexContainer.svelte";
    import LoginModel from "../../components/common/loginModel.svelte";
    import { getAuth ,signInWithEmailAndPassword } from "firebase/auth";
    import { goto } from "@sapper/app";
    const auth = getAuth();
    function login(email,password) {
        signInWithEmailAndPassword(auth,email,password).then((user) =>{
            goto(`/Dealer/${user.user.uid}`);
        })
    }
    </script>
    
    <svelte:head>
        <title>Transport | Home</title>
    </svelte:head>
    <FlexContainer ref="main-background">
        <LoginModel on:login={(e) => login(e.detail.email,e.detail.password) } on:signup={(e) => console.log(e)} />
    </FlexContainer>
    
    <style>
    
    :global([ref=main-background]){
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
    }
    </style>
    
    