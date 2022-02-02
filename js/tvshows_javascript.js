$( document ).ready(function() {
    let db = new Localbase('BreadCrumb_Local_DB');
    db.collection('all_Data').get().then(all_Data => {
        innertable = "";
        all_Data = all_Data[0];
        titles_data = all_Data.TvShows.Titles;
        console.log(titles_data);
        Tvshow_Titles_Maniputlating(titles_data);
    });
});

function Tvshow_Titles_Maniputlating(titles_data){
    for(let i=0; i<titles_data.length; i++){
        for(let j=0; j<(titles_data[i].DATA).length; j++){
            innertable += "<tr><td><a href='openedTvShow.html?tvshow_id="+ titles_data[i].DATA[j].Series_Id +"&tvshow_serverid="+ titles_data[i].Server_ID +"'>"+titles_data[i].DATA[j].Series_MainName+"</a></td></tr>";
        }
    }
    $("#tvshows_titles_table").html(innertable);
}