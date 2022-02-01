$( document ).ready(function() {
    $("#script_link").val(getCookie("script_link_cookie"));
});

function AddDataToCookie(){
    script = $("#script_link").val();
    document.cookie = "script_link_cookie="+$("#script_link").val();;
}

function GetAndSaveData(){
    script = $("#script_link").val();
    getDataFromScript(script, function() {console.log("getDataFromScript");});
};

function getDataFromScript(script, _callback){
    $.get(script, function(data) {
        console.log("Started");
        AddingtoDataBase(data, function() {console.log("AddingtoDataBase");});
    });
    _callback();
};

function AddingtoDataBase(data,_callback){
    let db = new Localbase('BreadCrumb_Local_DB');
    db.collection('all_Data').delete()
    db.collection('all_Data').add(data,'my-key');
    console.log("AddingtoDataBase - Done");
    _callback();    
};

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};