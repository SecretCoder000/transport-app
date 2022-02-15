<script>
    import { goto } from "@sapper/app";
    import Button from "../../components/common/button.svelte";
    import { formValidation } from "./javaScript";
    import { getAuth , createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
    import { getFirestore ,doc , setDoc } from "firebase/firestore";
    import { onMount } from "svelte";
    import { districts, states } from "../store";
    const auth = getAuth();
    const db = getFirestore();
    let userDetails = {
       name : "" , contactNo: "" ,natureOfMaterial: "",
       weightOfMaterial: "", quantity: "",state: "none",
       district: "none",emailId: "",password: ""
    };
    onMount(() =>{
        onAuthStateChanged(auth,(user) => {
            if(user){
                console.log('logged in');
                goto(`Dealer/${user.uid}`);
            }else {
                console.log('notlogged in');
            }
        })
    })
    let rePassword = "";
    function signUpDealer() {
        if(userDetails.password == rePassword){
            if(formValidation(userDetails)){
                createUserWithEmailAndPassword(auth,userDetails.emailId,userDetails.password).then((userCreadinailts) => {
                    
                    setDoc(doc(db,'Meta Data',`${userDetails.emailId}`),{
                        userType: 'Dealer' 
                    }).then(console.log('Meta Data setted'));
                    setDoc(doc(db,'Dealer',`${userDetails.emailId}`),{
                        name: userDetails.name,
                        contactNo: userDetails.contactNo,
                        natureOfMaterial: userDetails.natureOfMaterial,
                        weightOfMaterial: userDetails.weightOfMaterial,quantity: userDetails.quantity,
                        state: userDetails.state,district: userDetails.district,
                        booked:[""]
                    }).then(()=> {
                        goto(`Dealer/${userCreadinailts.user.uid}`)
                    });
                }).catch((error) => {
                    console.log(error.code);
                    console.log(error.message);
                })
            }else {
                alert('Please fill up all the details');
            }
        }else {
            alert('Password did not matched , Please Enter same Password');
        }
    }
    let loadDistrict = false;
</script>
<svelte:head>
   <title>Dealer | Signup</title>
</svelte:head>
<div>
    <div class="button-container" style="font-size: 32px;font-weight: 700;">
        Dealer Sign Up Form
    </div>
<table>
    <tr>
        <th>Name : </th>
        <td><input type="text" bind:value="{userDetails.name}" ></td>
    </tr>
    <tr>
        <th>Contact No :</th>
        <td><input type="text" size="10" bind:value="{userDetails.contactNo}" ></td>
    </tr>
    
    <tr>
        <th>Nature of Material :</th>
        <td><input type="text" bind:value="{userDetails.natureOfMaterial}" ></td>
    </tr>

    <tr>
        <th>Weight of Material</th>
        <td><input type="text" bind:value="{userDetails.weightOfMaterial}" ></td>
    </tr>
    
    <tr>
        <th>Quantity :</th>
        <td><input type="text" bind:value="{userDetails.quantity}" ></td>
    </tr>
    <tr>
        <th>State :</th>
        <td>
            <select bind:value="{userDetails.state}" on:change="{(event) => {
                if(event.target.value == "none"){
                    loadDistrict = false;
                }
                else 
                    loadDistrict = true;
            }}">
                <option value="none">Select</option>
                {#each states as state,id}
                    <option value="{id}">{state}</option>
                {/each}
            </select>
        </td>
    </tr>
    <tr>
        <th>District :</th>
        <td>
            <select bind:value="{userDetails.district}">
                <option value="none">Select District</option>
                {#if loadDistrict}
                    {#each districts[userDetails.state] as district , i }
                        <option value={i+1}>{district}</option>
                    {/each}
                {/if}
            </select>
        </td>
    </tr>

    <tr>
        <th>Email Id (User Name):</th>
        <td><input type="email" bind:value="{userDetails.emailId}" ></td>
    </tr>
    <tr>
        <th>Password :</th>
        <td><input type="password" bind:value="{userDetails.password}"></td>
    </tr>
    <tr>
        <th>Re-Enter Password :</th>
        <td><input type="password" bind:value="{rePassword}" ></td>
    </tr>
</table>
<div class="button-container">
    <Button button="Go Back" ref="button-form" on:click={() => {
        goto("/");
    }} />
    <Button button="Submit" ref="button-form" on:click={signUpDealer} />
    <Button button="signout" on:click={() => {signOut(auth)}} />
</div>
</div>
<style>
    .button-container{
        padding: 8px;
        display: flex;
        justify-content: space-around;
    }
    td , th {
        border-bottom: 2px solid dodgerblue;
        border-collapse: collapse;
        margin: 2px;
    }
    th {
        width: 30%;
        text-align: left;
        padding: 4px;
    }
    table , .button-container {
        width: 60%;
        margin: auto;
    }
    table {
        font-size: 24px;
    }
    input , select ,option {
        width: 90%;
    }
    input,select {
        font-size: 24px;
        border: none;
        border-bottom: 2px solid black;
    }
</style>