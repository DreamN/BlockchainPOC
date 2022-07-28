let connected = false;
let web3 = null;    
let account = null;

let signText = document.getElementById("sign-text");
let signButton = document.getElementById("signButton");
let walletAddressesSelect = document.getElementById("wallet-addresses-select");
let signatureTextArea = document.getElementById("signature-text");

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
    signText.disabled = false;
    signButton.disabled = false;
}

function updateAccountDetails(){
    web3.eth.getAccounts().then(function(accounts){
        this.accounts = accounts;
        updateAccountAddress(accounts)
    });
}

function cleanWalletAddressSelect(walletAddressesSelect){
    while (walletAddressesSelect.options.length) {
        walletAddressesSelect.remove(0);
    }
}

function updateAccountAddress(addresses){
    cleanWalletAddressSelect(walletAddressesSelect);
    for(var i = 0, l = addresses.length; i < l; i++){
        let walletAddress = addresses[i];
        console.log(`Hi ${walletAddress}`);
        walletAddressesSelect.options.add( new Option(walletAddress, walletAddress) );
    }
    if(walletAddressesSelect.options.length > 0){
        walletAddressesSelect.options[0].selected = true;
    }
}

function sign(){
    let message = signText.value;
    let from = this.accounts[0];
    var sha3Message = web3.utils.sha3(message);
    console.log(`Sign from: [${from}], message: [${message}]`);
    web3.eth.sign(sha3Message, web3.utils.toChecksumAddress(from), function (err, signature) {
        if(err){
            console.log(`Sign error: ${err.message}`);
            return;
        }
        console.log(`Signature: [${signature}]`);
        signatureTextArea.innerHTML = signature;
    });
}