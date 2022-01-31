function test(){
    let db = new Localbase('BreadCrumb_Local_DB');
    db.collection('all_Data').get().then(all_Data => {
        console.log(all_Data);
        $("#result").html("lol");
    })
}