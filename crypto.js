let loaded = false;
let web3 = null;    

async function connectAccount(){
    if (window.ethereum) {
        await window.ethereum.request({method: 'eth_requestAccounts'}).then(addr => updateAccountAddress(addr));
        web3 = new Web3(window.ethereum);
        window.web3 = web3;
        console.log("Success!");
    }
    else {
        console.log("There's no metamask installed on this browser");
    }
    
    loaded = true;
    enableOperationButtons();
}

function enableOperationButtons(){
}

function updateAccountAddress(addrs){
    let walletAddressValueText = document.getElementById("wallet-address-value");
    walletAddressValueText.innerHTML = addrs.join(",");
}

function sign(){
    web3.eth.sign(web3.eth.defaultAccount, web3.utils.sha3('test'), function (err, signature) {
        console.log(signature);  // But maybe do some error checking. :-)
    });
}