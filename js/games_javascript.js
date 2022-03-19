var CurrentTitlesData = [];
var CurrentTitlesDataToUse = [];

$( document ).ready(function() {
    let db = new Localbase('BreadCrumb_Local_DB');
    db.collection('all_Data').get().then(all_Data => {
        all_Data = all_Data[0];
        titles_data = all_Data.Games.Titles;
        Games_Titles_Maniputlating(titles_data);
        CreateVirtualSelect("genereSelect",null);
    });
});

function Games_Titles_Maniputlating(titles_data){
    for(let i=0; i<titles_data.length; i++){
        for(let j=0; j<(titles_data[i].DATA).length; j++){
            titles_data_obj = titles_data[i].DATA[j];
            titles_data_obj.Server_ID = titles_data[i].Server_ID;
            CurrentTitlesData.push(titles_data_obj);
        }
    }
    UpdateGames();
}

function OpenNormalLink(id, serverId){
    window.open(`game_openedGame.html?game_id=${id}&game_serverid=${serverId}`,"_self");
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
        let tempGenere = String(row.Series_Genre).split(",");
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

function UpdateGames(){
    CurrentTitlesDataToUse = CurrentTitlesData;
    RemoveAllDivs("#all_games");
    let rowHTML = "";
    filterSort();
    filterGenere();
    filterSearch();

    CurrentTitlesDataToUse.forEach(row => {
        let cardHtml = GetCardHTML(row.Game_Name, row.Game_Poster, row.Game_ReleaseYear, "", row.Game_Id, row.Server_ID, invalidIMAGEGame);
        rowHTML += `<div class="col-md-2 mt-5 col-sm-4 col-6">${cardHtml}</div>`;
    });
    $("#all_games").html(rowHTML);
}

function ChangeSortingOrderGame(node){
    $("#sortingTypeDIV").attr("data-select-btn", $(node).attr("data-value"));
    UpdateGames();
}

function filterSearch(){
    let SearchTerm = ($("#gameSearch").val()).toUpperCase();
    let filteredList = [];
    CurrentTitlesDataToUse.forEach(row => {
        let mainName = String(row.Game_Name).toUpperCase();
        let secondaryName = String(row.Game_AltNames).toUpperCase();
        if(mainName.includes(SearchTerm) || secondaryName.includes(SearchTerm)){
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
                    if(CurrentTitlesDataToUse[i].Game_Id < CurrentTitlesDataToUse[j].Game_Id){
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
                    if(CurrentTitlesDataToUse[i].Game_Id > CurrentTitlesDataToUse[j].Game_Id){
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
                    if(CurrentTitlesDataToUse[i].Game_Name > CurrentTitlesDataToUse[j].Game_Name){
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
                    if(CurrentTitlesDataToUse[i].Game_Name < CurrentTitlesDataToUse[j].Game_Name){
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
                    if(CurrentTitlesDataToUse[i].Game_ReleaseYear > CurrentTitlesDataToUse[j].Game_ReleaseYear){
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
                    if(CurrentTitlesDataToUse[i].Game_ReleaseYear < CurrentTitlesDataToUse[j].Game_ReleaseYear){
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
                if(String(row.Game_Genre).includes(genere)){
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
