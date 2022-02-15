<script>
    import { goto } from "@sapper/app";
    import Button from "../../components/common/button.svelte";
    import { formValidation } from "./javaScript";
    import { getAuth , createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
    import { getFirestore ,doc , setDoc } from "firebase/firestore";
    import { onMount } from "svelte";
    import { districts,states } from "../store";
    const auth = getAuth();
    const db = getFirestore();
    let userDetails = {
       name : "" , contactNo: "" ,truckNumber: "",age : "",
       truckCapacity: "",transporterName: "", drivingExperience: "",route: {
           route1: {
               to: {state: "none" , district: "none"},
               from: {state: "none" , district: "none"}
            },route2:{
               to: {state: "none" , district: "none"},
               from: {state: "none" , district: "none"}
            },route3:{
               to: {state: "none" , district: "none"},
               from: {state: "none" , district: "none"}
            }
       },emailId: "",password: ""
    };
    onMount(() =>{
        onAuthStateChanged(auth,(user) => {
            if(user){
                goto(`/Driver/${user.uid}`);
            }else {
                
            }
        })
    })
    let rePassword = "";
    function signUpDriver() {
        if(userDetails.password == rePassword){
            if(formValidation(userDetails)){
                createUserWithEmailAndPassword(auth,userDetails.emailId,userDetails.password).then((userCreadinailts) => {
                    
                    setDoc(doc(db,'Meta Data',`${userDetails.emailId}`),{
                        userType: 'Driver' 
                    }).then(console.log('Meta Data setted'));
                    setDoc(doc(db,'Driver',`${userDetails.emailId}`),{
                        name: userDetails.name,
                        contactNo: userDetails.contactNo,
                        truckNumber: userDetails.truckNumber,
                        truckCapacity: userDetails.truckCapacity,drivingExperience: userDetails.drivingExperience,
                        age: userDetails.age, transporterName: userDetails.transporterName,route: userDetails.route,
                        bookedBy: [""]
                    }).then(console.log('User Data Setted'));
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
    
    
    let loadFrom = [false,false,false];
    let loadTo = [false,false,false];
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
        <th>Age :</th>
        <td><input type="text" bind:value="{userDetails.age}"></td>
    </tr>
    
    <tr>
        <th>Truk Number :</th>
        <td><input type="text" bind:value="{userDetails.truckNumber}" ></td>
    </tr>

    <tr>
        <th>Mobile Number :</th>
        <td><input type="text" bind:value="{userDetails.contactNo}"></td>
    </tr>
    
    <tr>
        <th>Truck Capacity :</th>
        <td><input type="text" bind:value="{userDetails.truckCapacity}" ></td>
    </tr>
    
    <tr>
        <th>Transporter Name :</th>
        <td><input type="text" bind:value="{userDetails.transporterName}"></td>
    </tr>

    <tr>
        <th>Driving Experience :</th>
        <td><input type="text" bind:value="{userDetails.drivingExperience}"></td>
    </tr>

    <tr>
        <th colspan="2" style="text-align: center;">Route 1</th>
    </tr>
    <tr>
        <th style="text-align: center;border: none;">From</th>
        <th style="text-align: center;border: none;">To</th>
    </tr>
    <tr class="route">
        <th>
            <select bind:value="{userDetails.route.route1.from.state}" on:change="{(event)=> {
                if(event.target.value == "none")
                   loadFrom[0] = false;
                else 
                    loadFrom[0]= true;
                console.log(loadFrom[0]);
            }}">
                <option value="none" >Select State</option>
                {#each states as state,id}
                    <option value="{id}">{state}</option>
                {/each}
            </select>
            <select bind:value="{userDetails.route.route1.from.district}">
                <option value="none">Select District</option>
                {#if loadFrom[0]}
                    {#each districts[userDetails.route.route1.from.state] as district , i }
                        <option value={i+1}>{district}</option>
                    {/each}
                {/if}
            </select>
        </th>
        <th>
            <select bind:value="{userDetails.route.route1.to.state}" on:change="{(event)=> {
                if(event.target.value == "none")
                   loadTo[0] = false;
                else 
                    loadTo[0]= true;
            }}">
                <option value="none" >Select State</option>
                {#each states as state,id}
                    <option value="{id}">{state}</option>
                {/each}
            </select>
            <select bind:value="{userDetails.route.route1.to.district}">
                <option value="none">Select District</option>
                {#if loadTo[0]}
                    {#each districts[userDetails.route.route1.to.state] as district , i }
                        <option value={i+1}>{district}</option>
                    {/each}
                {/if}
            </select>
        </th>
    </tr>

    
    <tr>
        <th colspan="2" style="text-align: center;">Route 2</th>
    </tr>
    <tr>
        <th style="text-align: center;border: none;">From</th>
        <th style="text-align: center;border: none;">To</th>
    </tr>
    <tr class="route">
        <th>
            <select bind:value="{userDetails.route.route2.from.state}" on:change="{(event)=> {
                if(event.target.value == "none")
                   loadFrom[1] = false;
                else 
                    loadFrom[1]= true;
            }}">
                <option value="none" >Select State</option>
                {#each states as state,id}
                    <option value="{id}">{state}</option>
                {/each}
            </select>
            <select bind:value="{userDetails.route.route2.from.district}">
                <option value="none">Select District</option>
                {#if loadFrom[1]}
                    {#each districts[userDetails.route.route2.from.state] as district , i }
                        <option value={i+1}>{district}</option>
                    {/each}
                {/if}
            </select>
        </th>
        <th>
            <select bind:value="{userDetails.route.route2.to.state}" on:change="{(event)=> {
                if(event.target.value == "none")
                   loadTo[1] = false;
                else 
                    loadTo[1]= true;
            }}">
                <option value="none" >Select State</option>
                {#each states as state,id}
                    <option value="{id}">{state}</option>
                {/each}
            </select>
            <select bind:value="{userDetails.route.route2.to.district}">
                <option value="none">Select District</option>
                {#if loadTo[1]}
                    {#each districts[userDetails.route.route2.to.state] as district , i }
                        <option value={i+1}>{district}</option>
                    {/each}
                {/if}
            </select>
        </th>
    </tr>


    
    <tr>
        <th colspan="2" style="text-align: center;">Route 3</th>
    </tr>
    <tr>
        <th style="text-align: center;border: none;">From</th>
        <th style="text-align: center;border: none;">To</th>
    </tr>
    <tr class="route">
        <th>
            <select bind:value="{userDetails.route.route3.from.state}" on:change="{(event)=> {
            if(event.target.value == "none")
               loadFrom[2] = false;
            else 
                loadFrom[2]= true;
        }}">
            <option value="none" >Select State</option>
            {#each states as state,id}
                <option value="{id}">{state}</option>
            {/each}
        </select>
        <select bind:value="{userDetails.route.route3.from.district}">
            <option value="none">Select District</option>
            {#if loadFrom[2]}
                {#each districts[userDetails.route.route3.from.state] as district , i }
                    <option value={i+1}>{district}</option>
                {/each}
            {/if}
        </select>
        </th>
        <th>
            <select bind:value="{userDetails.route.route3.to.state}" on:change="{(event)=> {
                if(event.target.value == "none")
                   loadTo[2] = false;
                else 
                    loadTo[2]= true;
            }}">
                <option value="none" >Select State</option>
                {#each states as state,id}
                    <option value="{id}">{state}</option>
                {/each}
            </select>
            <select bind:value="{userDetails.route.route3.to.district}">
                <option value="none">Select District</option>
                {#if loadTo[2]}
                    {#each districts[userDetails.route.route3.to.state] as district , i }
                        <option value={i+1}>{district}</option>
                    {/each}
                {/if}
            </select>
        </th>
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
        <td><input type="password" bind:value="{rePassword}"></td>
    </tr>
</table>
<div class="button-container">
    <Button button="Reset" ref="button-form" on:click={() => {signOut(auth)}} />
    <Button button="Submit" ref="button-form" on:click={signUpDriver}/>
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
    .route > th {
        width: 50%;
    }
</style>