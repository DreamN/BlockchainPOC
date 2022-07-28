let connected = false;
let web3 = null;    
let account = null;

async function connectAccount(){
    if (window.ethereum) {
        await window.ethereum.request({method: 'eth_requestAccounts'});
        web3 = new Web3(window.ethereum);
        console.log("Connecting to the wallet successfully!");
        updateAccountDetails();
    }
    else {
        console.log("There's no metamask installed on this browser");
    }
    
    connected = true;
    enableOperationButtons();
}

function enableOperationButtons(){
    let signButton = document.getElementById("signButton");
    signButton.disabled = false;
}

function updateAccountDetails(){
    web3.eth.getAccounts().then(function(accounts){
        this.accounts = accounts;
        updateAccountAddress(accounts)
    });
}

function updateAccountAddress(addresses){
    let walletAddressesValueText = document.getElementById("wallet-addresses-value");
    walletAddressesValueText.innerHTML = addresses.join(",");
}

function sign(){
    let message = "test";
    let from = this.accounts[0];
    var sha3Message = web3.utils.sha3(message);
    console.log(`Sign from: ${from}`);
    web3.eth.sign(sha3Message, web3.utils.toChecksumAddress(from), function (err, signature) {
        if(err){
            console.log(`Sign error: ${err.message}`);
            return;
        }
        console.log(`Signature: ${signature}`);
    });
}