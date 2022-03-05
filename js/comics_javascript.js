$( document ).ready(function() {
    let db = new Localbase('BreadCrumb_Local_DB');
    db.collection('all_Data').get().then(all_Data => {
        innertable = "";
        all_Data = all_Data[0];
        titles_data = all_Data.Comics.Titles;
        console.log(titles_data);
        Comics_Titles_Maniputlating(titles_data);
    });
});

function Comics_Titles_Maniputlating(titles_data){
    for(let i=0; i<titles_data.length; i++){
        for(let j=0; j<(titles_data[i].DATA).length; j++){
            innertable += "<tr><td><a href='comic_openedComic.html?comic_id="+ titles_data[i].DATA[j].Comic_ID +"&comic_serverid="+ titles_data[i].Server_ID +"'>"+titles_data[i].DATA[j].Comic_Name+"</a></td></tr>";
        }
    }
    $("#comics_titles_table").html(innertable);
}