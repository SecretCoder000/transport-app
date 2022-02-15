<script>
    import { onMount } from "svelte";
    import { getAuth , onAuthStateChanged,signOut } from "firebase/auth";
    import { getFirestore, collection , getDoc, doc, getDocs ,updateDoc,setDoc } from "firebase/firestore";
    import Button from "../../components/common/button.svelte";
    var email= "none";
    const auth = getAuth();
    const db = getFirestore();
    var dealerData="";
    var driverData = [];
    function isAlreadyBooked(grouup) {
        for(var i=0;i<grouup.length;i++){
            if(grouup[i] == email){
                return true;
            }
        }
        return false;
    }
    async function initialiseDealer(){
        dealerData = await getDoc(doc(db,"Dealer",`${email}`)).then((snapshot) =>{
            return snapshot.data();
        });
        const driverColl = await getDocs(collection(db,"Driver"));
        driverColl.forEach((doc) =>{
            const route1 = doc.data().route.route1;
            const route2 = doc.data().route.route2;
            const route3 = doc.data().route.route3;

            if(route1.from.state == dealerData.state && route1.from.district == dealerData.district && !(doc.data().route1From)){
                    driverData = [...driverData,doc.data()];
                    driverData[driverData.length-1].email = doc.id;
                    driverData[driverData.length-1].matchRoute = [1,"from"];
                    if(isAlreadyBooked(doc.data().bookedBy)){
                        driverData[driverData.length-1].booked = true;
                    }else {
                        driverData[driverData.length-1].booked = false;
                    }
            }
            else if(route1.to.state == dealerData.state && route1.to.district == dealerData.district && !doc.data().route1To){
                    driverData = [...driverData,doc.data()];
                    driverData[driverData.length-1].email = doc.id;
                    driverData[driverData.length-1].matchRoute = [1,"to"];
                    if(isAlreadyBooked(doc.data().bookedBy)){
                        driverData[driverData.length-1].booked = true;
                    }else {
                        driverData[driverData.length-1].booked = false;
                    }
            }
            else if(route2.from.state == dealerData.state && route2.from.district == dealerData.district && !doc.data().route2From){
                    driverData = [...driverData,doc.data()];
                    driverData[driverData.length-1].email = doc.id;
                    driverData[driverData.length-1].matchRoute = [2,"from"];
                    if(isAlreadyBooked(doc.data().bookedBy)){
                        driverData[driverData.length-1].booked = true;
                    }else {
                        driverData[driverData.length-1].booked = false;
                    }
            }
            else if(route2.to.state == dealerData.state && route2.to.district == dealerData.district && !doc.data().route2To){
                    driverData = [...driverData,doc.data()];
                    driverData[driverData.length-1].email = doc.id;
                    driverData[driverData.length-1].matchRoute = [2,"to"];
                    if(isAlreadyBooked(doc.data().bookedBy)){
                        driverData[driverData.length-1].booked = true;
                    }else {
                        driverData[driverData.length-1].booked = false;
                    }
            }
            else if(route3.from.state == dealerData.state && route3.from.district == dealerData.district && !doc.data().route3From){
                    driverData = [...driverData,doc.data()];
                    driverData[driverData.length-1].email = doc.id;
                    driverData[driverData.length-1].matchRoute = [3,"from"];
                    if(isAlreadyBooked(doc.data().bookedBy)){
                        driverData[driverData.length-1].booked = true;
                    }else {
                        driverData[driverData.length-1].booked = false;
                    }
            }
            else if(route3.to.state == dealerData.state && route3.to.district == dealerData.district && !doc.data().route3To){                    
                    driverData = [...driverData,doc.data()];
                    driverData[driverData.length-1].email = doc.id;
                    driverData[driverData.length-1].matchRoute = [3,"to"];
                    if(isAlreadyBooked(doc.data().bookedBy)){
                        driverData[driverData.length-1].booked = true;
                    }else {
                        driverData[driverData.length-1].booked = false;
                    }
            }
        });

    }
    onMount(async() => {
        onAuthStateChanged(auth , (user) => {
            if(user){
                email = user.email;
                initialiseDealer();
            }else {
                console.log('go back');
            }
        });
    });
    $: {
        console.log(driverData);
    }
    async function book(bookingEmail){
        driverData.forEach(driver =>{
            if(driver.email = bookingEmail){
                const path = driver.matchRoute[0];
                switch(path){
                    case 1:
                        if(driver.matchRoute[1]=='from'){
                            setDoc(doc(db,"Driver",`${driver.email}`),{
                                route1From: true

                            },{
                                merge: true
                            });
                        }else if(driver.matchRoute[1]=='to'){
                            setDoc(doc(db,"Driver",`${driver.email}`),{
                                route1To: true
                            },{
                                merge: true
                            });
                        }
                    break;

                    case 2:
                        if(driver.matchRoute[1]=='from'){
                            setDoc(doc(db,"Driver",`${driver.email}`),{
                                route2From: true
                            },{
                                merge: true
                            });
                        }else if(driver.matchRoute[1]=='to'){
                            setDoc(doc(db,"Driver",`${driver.email}`),{
                                route2To: true
                            },{
                                merge: true
                            });
                        }
                    break;
                    
                    case 3:
                        if(driver.matchRoute[1]=='from'){
                            setDoc(doc(db,"Driver",`${driver.email}`),{
                                route3From: true
                            },{
                                merge: true
                            });
                        }else if(driver.matchRoute[1]=='to'){
                            setDoc(doc(db,"Driver",`${driver.email}`),{
                                route3To: true
                            },{
                                merge: true
                            });
                        }
                    break;
                }
            }
        })
    }
</script>

<div class="strip-background">
    <button on:click="{() => signOut(auth)}">SignOut</button>
    <span style="font-size: 32px;margin: auto;text-weight: 700;">Driver Booking Table</span>
    <table>
        <tr>
            <th>Name</th>
            <th>Contact No</th>
            <th>Age</th>
            <th>Action</th>
        </tr>
        {#each driverData as driver}
        <tr>
            <td>{driver.name}</td>
            <td>{driver.contactNo}</td>
            <td>{driver.age}</td>
            {#if driver.booked}
                <td style="color: red;">Already Booked</td>
                {:else}
                <td><Button button="Book" on:click={() => book(driver.email)} /></td>
            {/if}
        </tr>
    {/each}
    </table>
    
</div>
<style>
.strip-background {
    border: 2px solid dodgerblue;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    width: 80%;
    padding: 4px;
    margin: auto;
}
table , th , td {
    border: 1px solid black;
    border-collapse: collapse;
}
th , td {
    text-align: center;
}
/*.strip{
    margin: auto;
    display: flex;
    flex-direction: row;
    width: 90%;
    border:2px solid black;
    justify-content: space-evenly;
}*/
</style>