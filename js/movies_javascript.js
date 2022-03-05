$( document ).ready(function() {
    let db = new Localbase('BreadCrumb_Local_DB');
    db.collection('all_Data').get().then(all_Data => {
        all_Data = all_Data[0];
        titles_data = all_Data.Movies.Titles;
        console.log(titles_data);
        Movies_Titles_Maniputlating(titles_data);
    });
});

function Movies_Titles_Maniputlating(titles_data){
    let rowHTML = "";
    for(let i=0; i<titles_data.length; i++){
        for(let j=0; j<(titles_data[i].DATA).length; j++){
            let cardHtml = GetCardHTML(titles_data[i].DATA[j].Movies_MainName, titles_data[i].DATA[j].Movies_Ver_Poster, titles_data[i].DATA[j].Movie_IMDB_ID, titles_data[i].DATA[j].Movies_ReleaseYear, titles_data[i].DATA[j].Movies_Id, titles_data[i].Server_ID);
            rowHTML += `<div class="col-md-2 mt-5 col-sm-4 col-6">${cardHtml}</div>`;
        }
    }
    $("#all_movies_a_z").html(rowHTML);
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


function OpenNormalLink(id, serverId){
    window.open(`movie_openedMovie.html?movie_id=${id}&movie_serverid=${serverId}`,"_self");
}