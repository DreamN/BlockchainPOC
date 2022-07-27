let loaded = false;
let web3 = null;    

function loadConfig(){
    let infuraApiKey = document.getElementById('infura-api-key').value;
    let infuraUrl = `https://mainnet.infura.io/v3/${infuraApiKey}`;
    web3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));
    console.log(infuraUrl)
    loaded = true;
    enableOperationButtons();
}

function enableOperationButtons(){
    let checkWalletAddressButton = document.getElementById('checkWalletAddressButton');
    checkWalletAddressButton.disabled = false;
}

function checkWalletAddress(){
    web3.eth.sign("Hello", web3.eth.defaultAccount, async (err, signature) => {
        console.log(signature);
    });
}