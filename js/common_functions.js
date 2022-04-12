function RemoveAllDivs(parentDivID){
    $(parentDivID).children().remove();
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function GetCardHTML(title, poster, imdbId, releaseYear, cardID, serverId, invalidIMAGE){
    let cardHtml = "";
    cardHtml += `<div class="card" onclick="OpenNormalLink('${cardID}','${serverId}')" data-bs-toggle="tooltip" data-bs-placement="bottom" title="${title}"><div class="cardPosterDiv"><img loading="lazy" src="${poster}" onerror="this.onerror=null;this.src='${invalidIMAGE}';" class="cardPoster"></div><span class="cardPrimary">${title}</span><div class="row cardSecondary"><div class="cardSecondaryOne col-6">${imdbId}</div><div class="cardSecondaryTwo col-6">${releaseYear}</div></div></div>`;
    return cardHtml;
}

function filterSearch(searchBoxID, CurrentTitlesDataToUse){
    let SearchTerm = ($(searchBoxID).val()).toUpperCase();
    let filteredList = [];
    CurrentTitlesDataToUse.forEach(row => {
        let mainName = String(row.Movies_MainName).toUpperCase();
        let secondaryName = String(row.Movies_AltNames).toUpperCase();
        let imdbID = String(row.Movie_IMDB_ID).toUpperCase();
        if(mainName.includes(SearchTerm) || secondaryName.includes(SearchTerm) || imdbID.includes(SearchTerm)){
            filteredList.push(row);
        }
    });

    return filteredList;
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};

function copyToClipBoard(STR){
    navigator.clipboard.writeText(STR).then(function() {
        console.log('Async: Copying to clipboard was successful!');
    }, function(err) {
        console.error('Async: Could not copy text: ', err);
    });
}

function openLink(link){
    console.log((String(getCookie("newTabSwitch_cookie").toUpperCase()) == "TRUE"));
    if((String(getCookie("newTabSwitch_cookie").toUpperCase()) == "TRUE")){
        window.open(link, "_blank");
    }
    else{
        window.open(link, "_self");
    }
}