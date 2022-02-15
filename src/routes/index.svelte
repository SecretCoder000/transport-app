<script>
import { goto } from "@sapper/app";

import FlexContainer from "../components/common/flexContainer.svelte";
import HomeCard from "../components/common/homeCard.svelte";
</script>

<svelte:head>
	<title>Transport | Home</title>
</svelte:head>
<FlexContainer ref="main-background">
	<HomeCard header="Dealer Authentication" on:login={()=> {
		goto("/Dealer/login");
	}} on:signup={()=>{
		goto("/Dealer/signup");	
	}} />
	<HomeCard header="Driver Authentication" on:login={()=> {
		goto("/Driver/login");
	}} on:signup={()=>{
		goto("/Driver/signup");	
	}} />
</FlexContainer>

<style>

:global([ref=main-background]){
	flex-direction: row;
	justify-content: space-evenly;
	align-items: center;
}
</style>

