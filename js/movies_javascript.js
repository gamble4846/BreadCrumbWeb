$( document ).ready(function() {
    let db = new Localbase('BreadCrumb_Local_DB');
    db.collection('all_Data').get().then(all_Data => {
        innertable = "";
        all_Data = all_Data[0];
        titles_data = all_Data.Movies.Titles;
        console.log(titles_data);
        Movies_Titles_Maniputlating(titles_data);
    });
});

function Movies_Titles_Maniputlating(titles_data){
    for(let i=0; i<titles_data.length; i++){
        for(let j=0; j<(titles_data[i].DATA).length; j++){
            innertable += "<tr><td><a href='movie_openedMovie.html?movie_id="+ titles_data[i].DATA[j].Movies_Id +"&movie_serverid="+ titles_data[i].Server_ID +"'>"+titles_data[i].DATA[j].Movies_MainName+"</a></td></tr>";
        }
    }
    $("#movies_titles_table").html(innertable);
}