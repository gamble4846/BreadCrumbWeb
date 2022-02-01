$( document ).ready(function() {
    let db = new Localbase('BreadCrumb_Local_DB');
    db.collection('all_Data').get().then(all_Data => {
        innertable = "";
        all_Data = all_Data[0];
        titles_data = all_Data.TvShows.Titles;

        url_data = (window.location.href).split("?")[1].split("&");
        tvshow_id_url = url_data[0].split("=")[1];
        tvshow_server_id_url = url_data[1].split("=")[1];

        for(let i=0; i<titles_data.length; i++){
            if(titles_data[i].Server_ID == tvshow_server_id_url){
                console.log("Found");
                for(let j=0; j<titles_data[i].DATA.length; j++){
                    if(titles_data[i].DATA[j].Series_Id == tvshow_id_url){
                        Tvshow_Title_Maniputlating(titles_data[i].DATA[j]);
                    }
                }
                break;
            }
        }
    });
});

function Tvshow_Title_Maniputlating(tvshow_title){
    console.log(tvshow_title);
}