let nftOwnerAddressText = document.getElementById("nft-owner-address-text");
let nftCreatorFilterText = document.getElementById("nft-creator-filter-text");
let nftQueryResultDiv = document.getElementById("nft-query-result");


nftQuery = () => {
    queryNft().then(queryResult => {
        displayQueryResult(queryResult);
    });
}

displayQueryResult = (assets) => {
    let resultHtmls = assets.map(asset => {
        return `
            <div class="col">
                <div class="card">
                    <img src="${asset.image_preview_url}" class="card-img-top nft-img">
                    <div class="card-body">
                        <a href="${asset.permalink}" class="btn btn-primary">Browse</a>
                    </div>
                </div>
            </div>
        `;
    })
    nftQueryResultDiv.innerHTML = `<div class="row row-cols-1 row-cols-md-3 g-4">` + resultHtmls.join('') + `</div>`;
}


queryNft = async() => {
    let ownerAddress = nftOwnerAddressText.value;
    let creatorAddress = nftCreatorFilterText.value;
    console.log(`[NFT Query] Owner: [${ownerAddress}], Creator: [${creatorAddress}]`);
    jsonResult = await makeApiCall(ownerAddress);
    console.log(`[NFT Query] jsonResult: [${jsonResult}]`);
    let filteredJsonResult = jsonResult.assets.filter(asset => {
        return creatorAddress == "" ||  asset.creator.address == creatorAddress
    });
    console.log(`[NFT Query] filteredJsonResult: ${filteredJsonResult}`);
    return filteredJsonResult;
}

makeApiCall = async(ownerAddress) => {
    let url = `https://api.opensea.io/api/v1/assets?format=json&owner=${ownerAddress}`;
    let response = await fetch(url);
    let jsonResult = await response.json();
    return jsonResult
}