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
    let walletAddressValueText = document.getElementById(wallet-address-value);
    ethereum.request({method: "eth_requestAccounts"}).then(addr => walletAddressValueText.innerHTML = addr);

}