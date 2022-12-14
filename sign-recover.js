let connected = false;
let web3 = null;    
let account = null;

let walletAddressesSelect = document.getElementById("wallet-addresses-select");

let requireConnectWarning = document.getElementById("require-connect-warning");

let signText = document.getElementById("sign-text");
let signSignature = document.getElementById("sign-signature");
let signButton = document.getElementById("sign-button");

let recoverText = document.getElementById("recover-text");
let recoverSignature = document.getElementById("recover-signature");
let recoverButton = document.getElementById("recover-button");
let recoverAddress = document.getElementById("recover-address");

connectAccount = async() => {
    if (window.ethereum) {
        await window.ethereum.request({method: 'eth_requestAccounts'});
        web3 = new Web3(window.ethereum);
        console.log("[Connect] Connecting to the wallet successfully!");
        updateAccountDetails();
    }
    else {
        console.log("[Connect] There's no metamask installed on this browser");
    }
    
    connected = true;
    enableOperationButtons();
}

enableOperationButtons = () => {
    signText.disabled = false;
    signButton.disabled = false;
    requireConnectWarning.style.display = "none";
}

updateAccountDetails = () => {
    web3.eth.getAccounts().then(accounts => {
        this.accounts = accounts;
        updateAccountAddress(accounts)
    });
}

cleanWalletAddressSelect = (walletAddressesSelect) => {
    while (walletAddressesSelect.options.length) {
        walletAddressesSelect.remove(0);
    }
}

updateAccountAddress = (addresses) => {
    cleanWalletAddressSelect(walletAddressesSelect);
    for(var i = 0, l = addresses.length; i < l; i++){
        let walletAddress = addresses[i];
        walletAddressesSelect.options.add( new Option(walletAddress, walletAddress) );
    }
    if(walletAddressesSelect.options.length > 0){
        walletAddressesSelect.options[0].selected = true;
    }
}

sign = () => {
    let inputText = signText.value;
    let from = this.accounts[0];
    var sha3InputText = web3.utils.sha3(inputText);
    console.log(`[Sign] from: [${from}], message: [${inputText}]`);
    web3.eth.personal.sign(sha3InputText, from, "", (err, signature) => {
        if(err){
            console.log(`[Sign] error: ${err.message}`);
            return;
        }
        console.log(`[Sign] Signature: [${signature}]`);
        signSignature.innerHTML = signature;
    });
}

recover = () => {
    let inputText = recoverText.value;
    let inputSignature = recoverSignature.value;
    var sha3InputText = web3.utils.sha3(inputText);
    console.log(`[Recover] Input text: [${inputText}], text(SHA-3) [${sha3InputText}], signature: [${inputSignature}]`);
    web3.eth.personal.ecRecover(sha3InputText, inputSignature).then(address => {

        console.log(`[Recover] Output address: [${address}]`);
        recoverAddress.value = address;
    });
}