<script src="header.js">
    import LinkTab from "./linkTab.svelte";
    import FlexContainer from "./flexContainer.svelte";
</script>
    <FlexContainer ref='header-flex-style'  >
            <FlexContainer ref='nameLogo-flex-style'>
                <img src="logo.jpg" alt="logo">
                <FlexContainer ref='companyName-flex-style'>
                    <div class="name">
                        Transport Web App
                    </div>
                    <div class="quotation">
                        Best Transport Plateform
                    </div>
                </FlexContainer>
            </FlexContainer>
        
        <FlexContainer ref='links-flex-style'>
            <LinkTab ref='link-style' />
            <LinkTab ref='link-style' text="About Us" link="/about" />
            <LinkTab ref='link-style' text="Contact Us" link="/contact" />
        </FlexContainer>
    </FlexContainer> 
<style>
    :global([ref=link-style]){
        font-size: 1.6em;
    }
    :global([ref=links-flex-style]){
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;   
        width: 50%;
    }
    :global([ref=header-flex-style]){
        background-color: dodgerblue;
        margin: 0;
        padding: 0;
        position: sticky;
        top: 0;
    }
    :global([ref=nameLogo-flex-style]){
        padding: 0;
        width: 50%;
        justify-content: space-evenly;        
        color: black;
    }
    img {
        height: 6vw;
        border-radius: 50%;
        margin: auto 0 auto 1vw;
    }
    :global([ref=companyName-flex-style]){
        padding: 0;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .name{
        font-size: 3.5vw;
        font-weight: bold;
    }
    .quotation{
        font-size: 1.5vw;
    }
    @media only screen and (max-width: 800px){
        .quotation{
            font-size: 16px;
        }
        :global([ref=header-flex-style]){
            flex-direction: column;
        }
        :global([ref=nameLogo-flex-style]){
            width: auto;
            justify-content: center;
        }
        :global([ref=links-flex-style]){
            width: 100%;
        }
        :global([ref=link-style]){
            font-size: 2.5vw;
        }
        .name {
            font-size: 40px;
        }
        img{
            height: 9vw;
        }
    } 
    @media only screen and (max-width: 700px){
        :global([ref=link-style]){
            font-size: 20px;
        }
        .name {
            font-size: 36px;
        }
    }
    @media only screen and (max-width: 580px){
        img {
            height: 9.3vh;
        }
        :global([ref=link-style]){
            font-size: 18px;
        }
    }
    
</style>