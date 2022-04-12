var Folders = [];
var Files = [];
var FilesLink = [];

var FolderId = null;
var ServerId = null;

var currentFolders = [];
var currentFiles = [];

$( document ).ready(function() {
    //?movie_id=273&movie_serverid=1qu39fdEI_1lCjeXp8I99YEqAxVdlxqPPDEmzYKzdM6w
    try{
        FolderId = (window.location.href).split('?')[1].split('&')[0].split('=')[1];
        ServerId = (window.location.href).split('?')[1].split('&')[1].split('=')[1];
    }
    catch(ex){
        console.log(ex);
        //pass
    }
    

    let db = new Localbase('BreadCrumb_Local_DB');
    db.collection('all_Data').get().then(all_Data => {
        all_Data = all_Data[0];
        Folders = all_Data.Folders_Files.Folders;
        Files = all_Data.Folders_Files.Files;
        FilesLink = all_Data.Folders_Files.File_Links;
        manipulateData();
    });
});

function manipulateData(){
    let AllServers = [];
    
    if(FolderId == null || ServerId == null){
        Folders.forEach(server => {
            AllServers.push(server.Server_ID)
        });
        
        let serverRows = "";
        AllServers.forEach(server => {
            serverRows += getFFRow(`<i class="fa fa-server" aria-hidden="true"></i>`, server, "?folderId=-&ServerId="+server);
        });

        $("#FFDisplayBody").html(serverRows);
    }
    else{
        Folders.forEach(server => {
            if(server.Server_ID == ServerId){
                server.DATA.forEach(folder => {
                    if(folder.Folder_UpperFolderId == FolderId){
                        currentFolders.push(folder);
                    }
                });
            }
        });

        Files.forEach(server => {
            if(server.Server_ID == ServerId){
                server.DATA.forEach(file => {
                    if(file.Files_UpperFolderId == FolderId){
                        currentFiles.push(file);
                    }
                });
            }
        });

        let FFRows = ``
        currentFolders.forEach(folder => {
            FFRows += getFFRow(`<i class="fa fa-folder" aria-hidden="true"></i>`, folder.Folder_Name, "?folderId="+folder.Folder_Id+"&ServerId="+ServerId)
        });

        currentFiles.forEach(file => {
            FFRows += getFFFileRow(getFileIcon(file.File_Type), file.Files_Name, file.File_Type, file.Files_Id)
        });

        $("#FFDisplayBody").html(FFRows);
    }
}

function getFFFileRow(icon, Name, type, id){
    return`
    <div class="row ffRow-body pointer" onclick="showFileModal('`+type+`', '`+id+`')">
        <div class="col-1 ffCol-body ellipsis-g">`+icon+`</div>
        <div class="col-11 ffCol-body ellipsis-g">`+Name+`</div>
    </div>
    `
}

function showFileModal(type, id){
    let currentLinks = [];
    FilesLink.forEach(server => {
        if(server.Server_ID == ServerId){
            server.DATA.forEach(links => {
                if(links.File_Id == id){
                    currentLinks.push(links);
                }
            });
        }
    });

    $("#fileModal").modal('show');
    $("#fileModalBody").html(getEmbeed(currentLinks[0].Link_link.split("/")[5]));
    console.log(currentLinks);
}

function getEmbeed(id){
    return `<iframe src="https://drive.google.com/file/d/`+id+`/preview" class="w-100 vh-65" allow="autoplay"></iframe>`;
}

function getFFRow(icon, Name, link){
    return `
    <a class="row ffRow-body pointer" href="`+link+`">
        <div class="col-1 ffCol-body ellipsis-g">`+icon+`</div>
        <div class="col-11 ffCol-body ellipsis-g">`+Name+`</div>
    </a>
    `
}

function getFileIcon(fileType){
    switch(fileType){
        case "application/zip":
            return `<i class="fa fa-archive" aria-hidden="true"></i>`;
        case "text/plain":
            return `<i class="fa fa-file-text" aria-hidden="true"></i>`;
        case "image/jpeg":
            return `<i class="fa fa-picture-o" aria-hidden="true"></i>`;
        case "image/png":
            return `<i class="fa fa-picture-o" aria-hidden="true"></i>`;
        default:
            return `<i class="fa fa-file" aria-hidden="true"></i>`;
    }
}