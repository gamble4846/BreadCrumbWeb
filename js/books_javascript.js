var CurrentTitlesData = [];
var CurrentTitlesDataToUse = [];

$( document ).ready(function() {
    let db = new Localbase('BreadCrumb_Local_DB');
    db.collection('all_Data').get().then(all_Data => {
        all_Data = all_Data[0];
        titles_data = all_Data.Books.Titles;
        Book_Titles_Maniputlating(titles_data);
    });
});

function Book_Titles_Maniputlating(titles_data){
    for(let i=0; i<titles_data.length; i++){
        for(let j=0; j<(titles_data[i].DATA).length; j++){
            titles_data_obj = titles_data[i].DATA[j];
            titles_data_obj.Server_ID = titles_data[i].Server_ID;
            CurrentTitlesData.push(titles_data_obj);
        }
    }
    UpdateBooks();
}

function OpenNormalLink(id, serverId){
    window.open(`book_openedBook.html?series_id=${id}&series_serverid=${serverId}`,"_self");
}

function UpdateBooks(){
    CurrentTitlesDataToUse = CurrentTitlesData;
    RemoveAllDivs("#all_books");
    let rowHTML = "";
    filterSort();
    filterSearch();

    CurrentTitlesDataToUse.forEach(row => {
        let cardHtml = GetCardHTML(row.Book_Name, row.Cover_Image_Link, row.Publisher, row.Publish_Date.split("T")[0], row.Book_Id, row.Server_ID, invalidIMAGEBook);
        rowHTML += `<div class="col-md-2 mt-5 col-sm-4 col-6">${cardHtml}</div>`;
    });
    $("#all_books").html(rowHTML);
}

function ChangeSortingOrderBook(node){
    $("#sortingTypeDIV").attr("data-select-btn", $(node).attr("data-value"));
    UpdateBooks();
}

function filterSearch(){
    let SearchTerm = ($("#bookSearch").val()).toUpperCase();
    let filteredList = [];
    CurrentTitlesDataToUse.forEach(row => {
        let mainName = String(row.Book_Name).toUpperCase();
        let ISBN_13 = String(row.ISBN_13).toUpperCase();
        let ISBN_10 = String(row.ISBN_10).toUpperCase();
        let Authors = String(row.Authors).toUpperCase();
        let Publisher = String(row.Publisher).toUpperCase();
        if(mainName.includes(SearchTerm) || ISBN_13.includes(SearchTerm) || ISBN_10.includes(SearchTerm) || Authors.includes(SearchTerm) || Publisher.includes(SearchTerm)){
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
                    if(CurrentTitlesDataToUse[i].Book_Id < CurrentTitlesDataToUse[j].Book_Id){
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
                    if(CurrentTitlesDataToUse[i].Book_Id > CurrentTitlesDataToUse[j].Book_Id){
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
                    if(CurrentTitlesDataToUse[i].Book_Name > CurrentTitlesDataToUse[j].Book_Name){
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
                    if(CurrentTitlesDataToUse[i].Book_Name < CurrentTitlesDataToUse[j].Book_Name){
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
                    if(CurrentTitlesDataToUse[i].Publish_Date > CurrentTitlesDataToUse[j].Publish_Date){
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
                    if(CurrentTitlesDataToUse[i].Publish_Date < CurrentTitlesDataToUse[j].Publish_Date){
                        titleObj = CurrentTitlesDataToUse[i];
                        CurrentTitlesDataToUse[i] = CurrentTitlesDataToUse[j];
                        CurrentTitlesDataToUse[j] = titleObj;
                    }
                }
            }
            break;
    }
}
