$( document ).ready(function() {
    let db = new Localbase('BreadCrumb_Local_DB');
    db.collection('all_Data').get().then(all_Data => {
        innertable = "";
        all_Data = all_Data[0];
        titles_data = all_Data.Games.Titles;
        console.log(titles_data);
        Movies_Titles_Maniputlating(titles_data);
    });
});

function Movies_Titles_Maniputlating(titles_data){
    for(let i=0; i<titles_data.length; i++){
        for(let j=0; j<(titles_data[i].DATA).length; j++){
            innertable += "<tr><td><a href='game_openedGame.html?game_id="+ titles_data[i].DATA[j].Game_Id +"&movie_serverid="+ titles_data[i].Server_ID +"'>"+titles_data[i].DATA[j].Game_Name+"</a></td></tr>";
        }
    }
    $("#games_titles_table").html(innertable);
}