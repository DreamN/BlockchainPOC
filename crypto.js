let loaded = false;
let web3 = null;    

async function connectAccount(){
    if (window.ethereum) {
        await window.ethereum.request({method: 'eth_requestAccounts'}).then(addr => updateAccountAddress(addr));
        window.web3 = new Web3(window.ethereum);
        console.log("Success!");
    }
    else {
        console.log("There's no metamask installed on this browser");
    }
    
    loaded = true;
    enableOperationButtons();
    updateAccountAddress();
}

function enableOperationButtons(){
}

function updateAccountAddress(addrs){
    let walletAddressValueText = document.getElementById("wallet-address-value");
    walletAddressValueText.innerHTML = addrs.join(",");
}