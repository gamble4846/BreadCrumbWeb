function RemoveAllDivs(parentDivID){
    $(parentDivID).children().remove();
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function GetCardHTML(title, poster, imdbId, releaseYear, cardID, serverId){
    let cardHtml = "";
    if(poster == "-"){
        cardHtml += `<div class="card" onclick="OpenNormalLink('${cardID}','${serverId}')" data-bs-toggle="tooltip" data-bs-placement="bottom" title="${title}"><div class="cardPosterDiv"><img loading="lazy" src="https://lh3.googleusercontent.com/pw/AM-JKLVg3mwsai1C8nNsyBHJiUSzWtB3u6d1s_68o9v6xKKfDSv4m-Q79L2bDmZ1JrurGIdOJnWRduOgb2VFxQkvwnhjbjQUFckd_AB2yfnCra1hWznHTNtHDuYYR1z2Z48GR2nl2MocGUUG6xWJkX6YLWH0SA=w586-h879-no?authuser=0" class="cardPoster"></div><span class="cardPrimary">${title}</span><div class="row cardSecondary"><div class="cardSecondaryOne col-6">${imdbId}</div><div class="cardSecondaryTwo col-6">${releaseYear}</div></div></div>`;
    }
    else{
        cardHtml += `<div class="card" onclick="OpenNormalLink('${cardID}','${serverId}')" data-bs-toggle="tooltip" data-bs-placement="bottom" title="${title}"><div class="cardPosterDiv"><img loading="lazy" src="${poster}" class="cardPoster"></div><span class="cardPrimary">${title}</span><div class="row cardSecondary"><div class="cardSecondaryOne col-6">${imdbId}</div><div class="cardSecondaryTwo col-6">${releaseYear}</div></div></div>`;
    }
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