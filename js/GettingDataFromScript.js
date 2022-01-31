function GetAndSaveData(){
    script = "https://script.google.com/macros/s/AKfycbwJwytNRVikZ4wT7sNOvtjlOYffRswz8lS3gUVmer8bMisnqD5tjYjJsbVTUx1425kN/exec";
    getDataFromScript(script, function() {console.log("getDataFromScript");});
}

function getDataFromScript(script, _callback){
    $.get(script, function(data) {
        console.log("Started");
        AddingtoDataBase(data, function() {console.log("AddingtoDataBase");});
    });
    _callback();
}

function AddingtoDataBase(data,_callback){
    let db = new Localbase('BreadCrumb_Local_DB');
    db.collection('all_Data').delete()
    db.collection('all_Data').add(data);
    console.log("AddingtoDataBase - Done");
    _callback();    
}