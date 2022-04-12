var notify;
$(document).ready(function() {
    notify = new Notify();
    $("#script_link").val(getCookie("script_link_cookie"));
    $("#google_api_link").val(getCookie("google_api_link_cookie"));
});

function AddDataToCookie(){
    document.cookie = "script_link_cookie="+$("#script_link").val() + "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
    document.cookie = "google_api_link_cookie="+$("#google_api_link").val() + "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
    notify.render({
        head: `Database <i class="fas fa-bell"></i>`,
        content: "Settings Saved to Cookies",
    });
}

function GetAndSaveData(){
    script = $("#script_link").val();
    getDataFromScript(script, function() {
        notify.render({
            head: `Database <i class="fas fa-bell"></i>`,
            content: "Syncying Data from Google Sheets",
        });
    });
};

function getDataFromScript(script, _callback){
    $.get(script, function(data) {
        notify.render({
            head: `Database <i class="fas fa-bell"></i>`,
            content: "Data Synced from Google Sheets",
            style: "success",
        });
        AddingtoDataBase(data, function() {console.log("AddingtoDataBase");});
    });
    _callback();
};

function AddingtoDataBase(data,_callback){
    let db = new Localbase('BreadCrumb_Local_DB');
    db.collection('all_Data').delete()
    db.collection('all_Data').add(data,'my-key');
    _callback();
};