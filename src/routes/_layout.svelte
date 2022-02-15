<script>
	import Header from "../components/common/header.svelte";
	import Footer from "../components/common/footer.svelte";
	import GridContainer from "../components/common/gridContainer.svelte";
	import { initializeApp } from "firebase/app";
	const firebaseConfig = {
  	apiKey: "AIzaSyD2cfX_ws4vBWheiOtownqhbCNM6fLzqF8",
  	authDomain: "transportwebapp-9f412.firebaseapp.com",
  	projectId: "transportwebapp-9f412",
	storageBucket: "transportwebapp-9f412.appspot.com",
  	messagingSenderId: "623248754102",
  	appId: "1:623248754102:web:9fe28da800ab8798136d17",
  	measurementId: "G-0L9GPJ455K"
	};
	initializeApp(firebaseConfig);
</script>
<GridContainer ref="layout-background">
	<Header />
		<slot>
	
		</slot>
	<Footer/>
</GridContainer>

<style>
	:global([ref=layout-background]){
		grid-template-rows: 110px 100% 100px;
		grid-row-gap: 10px;
	}
</style>