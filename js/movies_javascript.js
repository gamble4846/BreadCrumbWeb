var CurrentTitlesData = [];
var CurrentTitlesDataToUse = [];

$( document ).ready(function() {
    let db = new Localbase('BreadCrumb_Local_DB');
    db.collection('all_Data').get().then(all_Data => {
        all_Data = all_Data[0];
        titles_data = all_Data.Movies.Titles;
        Movies_Titles_Maniputlating(titles_data);
        CreateVirtualSelect("genereSelect",null);
    });
});

function RemoveAllDivs(parentDivID){
    $(parentDivID).children().remove();
}

function Movies_Titles_Maniputlating(titles_data){
    for(let i=0; i<titles_data.length; i++){
        for(let j=0; j<(titles_data[i].DATA).length; j++){
            titles_data_obj = titles_data[i].DATA[j];
            titles_data_obj.Server_ID = titles_data[i].Server_ID;
            CurrentTitlesData.push(titles_data_obj);
        }
    }
    UpdateMovies();
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

function CreateVirtualSelect(elementID, options_){
    elementID = "#"+elementID;

    VirtualSelect.init({
        ele: elementID,
        search: true,
        multiple: true,
        showSelectedOptionsFirst: true,
    });

    var options = [];

    let AllGeneres = [];
    CurrentTitlesDataToUse.forEach(row => {
        let tempGenere = String(row.Movies_Genre).split(",");
        tempGenere.forEach(element => {
            AllGeneres.push(element.replaceAll(" ", ""));
        });
    });
    AllGeneres = AllGeneres.filter(onlyUnique);
    AllGeneres.sort();
    AllGeneres.forEach(genere => {
        let genereObj = {};
        genereObj.label = genere;
        genereObj.value = genere;
        options.push(genereObj);
    });
      
    document.querySelector(elementID).setOptions(options);
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function UpdateMovies(){
    CurrentTitlesDataToUse = CurrentTitlesData;
    RemoveAllDivs("#all_movies");
    let rowHTML = "";
    filterSort();
    filterGenere();
    filterSearch();

    CurrentTitlesDataToUse.forEach(row => {
        let cardHtml = GetCardHTML(row.Movies_MainName, row.Movies_Ver_Poster, row.Movie_IMDB_ID, row.Movies_ReleaseYear, row.Movies_Id, row.Server_ID);
        rowHTML += `<div class="col-md-2 mt-5 col-sm-4 col-6">${cardHtml}</div>`;
    });
    $("#all_movies").html(rowHTML);
}

function ChangeSortingOrderMovie(node){
    $("#sortingTypeDIV").attr("data-select-btn", $(node).attr("data-value"));
    UpdateMovies();
}

function filterSearch(){
    let SearchTerm = ($("#movieSearch").val()).toUpperCase();
    let filteredList = [];
    CurrentTitlesDataToUse.forEach(row => {
        let mainName = String(row.Movies_MainName).toUpperCase();
        let secondaryName = String(row.Movies_AltNames).toUpperCase();
        let imdbID = String(row.Movie_IMDB_ID).toUpperCase();
        if(mainName.includes(SearchTerm) || secondaryName.includes(SearchTerm) || imdbID.includes(SearchTerm)){
            filteredList.push(row);
        }
    });

    CurrentTitlesDataToUse = filteredList;
}

function filterSort(){
    let titleObj = {};
    let SortingOrder = $("#sortingTypeDIV").attr("data-select-btn");
    
    switch(SortingOrder){
        case "addDesc":
            for (let i = 0; i < CurrentTitlesDataToUse.length; i++) {
                for (let j = i+1; j < CurrentTitlesDataToUse.length; j++) {
                    if(CurrentTitlesDataToUse[i].Movies_Id < CurrentTitlesDataToUse[j].Movies_Id){
                        titleObj = CurrentTitlesDataToUse[i];
                        CurrentTitlesDataToUse[i] = CurrentTitlesDataToUse[j];
                        CurrentTitlesDataToUse[j] = titleObj;
                    }
                }
            }
            break;
        case "addAsc":
            for (let i = 0; i < CurrentTitlesDataToUse.length; i++) {
                for (let j = i+1; j < CurrentTitlesDataToUse.length; j++) {
                    if(CurrentTitlesDataToUse[i].Movies_Id > CurrentTitlesDataToUse[j].Movies_Id){
                        titleObj = CurrentTitlesDataToUse[i];
                        CurrentTitlesDataToUse[i] = CurrentTitlesDataToUse[j];
                        CurrentTitlesDataToUse[j] = titleObj;
                    }
                }
            }
            break;
        case "azAsc":
            for (let i = 0; i < CurrentTitlesDataToUse.length; i++) {
                for (let j = i+1; j < CurrentTitlesDataToUse.length; j++) {
                    if(CurrentTitlesDataToUse[i].Movies_MainName > CurrentTitlesDataToUse[j].Movies_MainName){
                        titleObj = CurrentTitlesDataToUse[i];
                        CurrentTitlesDataToUse[i] = CurrentTitlesDataToUse[j];
                        CurrentTitlesDataToUse[j] = titleObj;
                    }
                }
            }
            break;
        case "azDesc":
            for (let i = 0; i < CurrentTitlesDataToUse.length; i++) {
                for (let j = i+1; j < CurrentTitlesDataToUse.length; j++) {
                    if(CurrentTitlesDataToUse[i].Movies_MainName < CurrentTitlesDataToUse[j].Movies_MainName){
                        titleObj = CurrentTitlesDataToUse[i];
                        CurrentTitlesDataToUse[i] = CurrentTitlesDataToUse[j];
                        CurrentTitlesDataToUse[j] = titleObj;
                    }
                }
            }
            break;
        case "ryAsc":
            for (let i = 0; i < CurrentTitlesDataToUse.length; i++) {
                for (let j = i+1; j < CurrentTitlesDataToUse.length; j++) {
                    if(CurrentTitlesDataToUse[i].Movies_ReleaseYear > CurrentTitlesDataToUse[j].Movies_ReleaseYear){
                        titleObj = CurrentTitlesDataToUse[i];
                        CurrentTitlesDataToUse[i] = CurrentTitlesDataToUse[j];
                        CurrentTitlesDataToUse[j] = titleObj;
                    }
                }
            }
            break;
        case "ryDesc":
            for (let i = 0; i < CurrentTitlesDataToUse.length; i++) {
                for (let j = i+1; j < CurrentTitlesDataToUse.length; j++) {
                    if(CurrentTitlesDataToUse[i].Movies_ReleaseYear < CurrentTitlesDataToUse[j].Movies_ReleaseYear){
                        titleObj = CurrentTitlesDataToUse[i];
                        CurrentTitlesDataToUse[i] = CurrentTitlesDataToUse[j];
                        CurrentTitlesDataToUse[j] = titleObj;
                    }
                }
            }
            break;
    }
}

function filterGenere(){
    let Selectedgenere = $("#genereSelect").val();
    let filteredData = [];
    if(Selectedgenere != null && Selectedgenere.length != 0){
        CurrentTitlesDataToUse.forEach(row => {
            let flag = false;
            Selectedgenere.forEach(genere => {
                if(String(row.Movies_Genre).includes(genere)){
                    flag = true;
                }
            });
            if(flag){
                filteredData.push(row);
            }
        });
        CurrentTitlesDataToUse = filteredData;
    }
}