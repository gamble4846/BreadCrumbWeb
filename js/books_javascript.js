$( document ).ready(function() {
    let db = new Localbase('BreadCrumb_Local_DB');
    db.collection('all_Data').get().then(all_Data => {
        innertable = "";
        all_Data = all_Data[0];
        titles_data = all_Data.Books.Titles;
        console.log(titles_data);
        Books_Titles_Maniputlating(titles_data);
    });
});

function Books_Titles_Maniputlating(titles_data){
    for(let i=0; i<titles_data.length; i++){
        for(let j=0; j<(titles_data[i].DATA).length; j++){
            innertable += "<tr><td><a href='book_openedBook.html?book_id="+ titles_data[i].DATA[j].Book_Id +"&book_serverid="+ titles_data[i].Server_ID +"'>"+titles_data[i].DATA[j].Book_Name+"</a></td></tr>";
        }
    }
    $("#books_titles_table").html(innertable);
}