var titles_data;
var links_data;
var movie_title_glob;
var current_link;

$( document ).ready(function() {
    $("#videoPlayer").hide();
    let db = new Localbase('BreadCrumb_Local_DB');
    db.collection('all_Data').get().then(all_Data_x => {
        all_Data = all_Data_x[0];

        titles_data = all_Data.Movies.Titles;
        links_data = all_Data.Movies.Links;

        url_data = (window.location.href).split("?")[1].split("&");
        movie_id_url = url_data[0].split("=")[1];
        movie_server_id_url = url_data[1].split("=")[1];

        for(let i=0; i<titles_data.length; i++){
            if(titles_data[i].Server_ID == movie_server_id_url){
                for(let j=0; j<titles_data[i].DATA.length; j++){
                    if(titles_data[i].DATA[j].Movies_Id == movie_id_url){
                        Movie_Title_Manipulating(titles_data[i].DATA[j]);
                    }
                }
                break;
            }
        }

        current_links = [];
        for(let i=0; i<links_data.length; i++){
            if(links_data[i].Server_ID == movie_server_id_url){
                for(let j=0; j<links_data[i].DATA.length; j++){
                    if(links_data[i].DATA[j].Movies_Id == movie_id_url){
                        current_links.push(links_data[i].DATA[j]);
                    }
                }
                break;
            }
        }
        Movie_Links_Manipulating(current_links);
    });
});

function Movie_Title_Manipulating(movie_title){
    movie_title_glob = movie_title;
    $("#OpenedMovieName").html(movie_title.Movies_MainName);
    $("#backgroundImageURLDiv").css("background-image", `url("`+movie_title.Movies_Poster+`")`);
    $("#OpenedMovieDesc").html(movie_title.Movies_ExtraInformation);
    $("#OpenedMovieReleaseYear").html(movie_title.Movies_ReleaseYear);
    $("#OpenedMovieGenre").html(movie_title.Movies_Genre);
    $("#OpenedMovieOtherNames").html(movie_title.Movies_AltNames);
    $("#OpenedMovieDirectors").html(movie_title.Movies_Directors);
    $("#OpenedMovieWriters").html(movie_title.Movies_Writers);
    $("#OpenedMovieStars").html(movie_title.Movies_Stars);
};

function Movie_Links_Manipulating(current_links){
    linksTableData = "";
    current_links.forEach(function (link, i) {
        linksTableData += GetRow((i+1), link);
    });
    $("#openedMovieLinks").html(linksTableData);
}

function GetRow(number, link){
    let data = `
        <div class="row pointer linkRow" data-bs-toggle="collapse" data-bs-target="#LinkCol`+link.Link_Id+`"">
            <div class="col-md-2 col-sm-2 col-2 ellipsis-g links-col-body">`+number+`</div>
            <div class="col-md-2 col-sm-3 col-3 ellipsis-g links-col-body">`+link.Link_Quality+`</div>
            <div class="col-md-2 col-sm-4 col-4 ellipsis-g links-col-body">`+link.Link_Language+`</div>
            <div class="col-md-5 col-sm-3 col-3 ellipsis-g links-col-body d-none d-sm-none d-md-block">`+link.Link_Subtitles+`</div>
            <div class="col-md-1 col-sm-3 col-3 ellipsis-g links-col-body">`+link.Streamable+`</div>
        </div>

        <div class="row openedLinkRow collapse" id="LinkCol`+link.Link_Id+`">
            <div class="col-12 p-0">
                <div class="row m-2">
                    <div class="col-12">
                        <div class="row openedLinkRow">
                            <div class="col-md-3 col-sm-12 p-2">Quality</div>
                            <div class="col-md-9 col-sm-12 p-2">`+link.Link_Quality+`</div>
                        </div>
                        <div class="row openedLinkRow">
                            <div class="col-md-3 col-sm-12 p-2">Language</div>
                            <div class="col-md-9 col-sm-12 p-2">`+link.Link_Language+`</div>
                        </div>
                        <div class="row openedLinkRow">
                            <div class="col-md-3 col-sm-12 p-2">Subtitles</div>
                            <div class="col-md-9 col-sm-12 p-2">`+link.Link_Subtitles+`</div>
                        </div>
                        <div class="row openedLinkRow">
                            <div class="col-md-3 col-sm-12 p-2">Email</div>
                            <div class="col-md-9 col-sm-12 p-2">`+link.Link_Email+`</div>
                        </div>
                        <div class="row openedLinkRow">
                            <div class="col-md-3 col-sm-12 p-2">Size</div>
                            <div class="col-md-9 col-sm-12 p-2">`+link.Link_Size+`</div>
                        </div>
                        <div class="row openedLinkRow">
                            <div class="col-md-3 col-sm-12 p-2">Password</div>
                            <div class="col-md-9 col-sm-12 p-2">`+link.Link_Password+`</div>
                        </div>
                        <div class="row openedLinkRow">
                            <div class="col-md-3 col-sm-12 p-2">Desc</div>
                            <div class="col-md-9 col-sm-12 p-2">`+link.Link_Desc+`</div>
                        </div>
                        <div class="row openedLinkRow">
                            <div class="col-md-3 col-sm-12 p-2">Streamable</div>
                            <div class="col-md-9 col-sm-12 p-2">`+link.Streamable+`</div>
                        </div>
                        <div class="row openedLinkRow">
                            <div class="col-md-3 col-sm-12 p-2">Links</div>
                            <div class="col-md-9 col-sm-12 p-2">
                                `+CreateLinkButtons(link)+`
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
    return data;
}

function CreateLinkButtons(link_){
    let googleAPI = getCookie("google_api_link_cookie");
    
    let data = ``;
    data += `<button class="custom-btn-lv btn" onclick="LinkButtonClicked('`+link_.Link_link+`', false, false, false)">Open Link</button>`;
    data += `<button class="custom-btn-lv btn" onclick="LinkButtonClicked('`+link_.Link_link+`', true, false, false)">Copy Link</button>`;
    
    if(link_.Streamable.toUpperCase() == 'YES'){
        data += `<button class="custom-btn-lv btn" onclick="LinkButtonClicked('`+link_.Link_link+`', false, false, true)">Play Link</button>`;
        if(googleAPI){
            data += `<button class="custom-btn-lv btn" onclick="LinkButtonClicked('`+link_.Link_link+`', false, true, false)">Open API Link</button>`;
            data += `<button class="custom-btn-lv btn" onclick="LinkButtonClicked('`+link_.Link_link+`', true, true, false)">Copy API Link</button>`;
            data += `<button class="custom-btn-lv btn" onclick="LinkButtonClicked('`+link_.Link_link+`', false, true, true)">Play API Link</button>`;        
        }
        else{
            data += `<small>Add Google API Key to get more options</small>`
        }
    }

    return data;
}

function LinkButtonClicked(link, copy, api, play){
    let FinalLink = "";
    let googleAPI = getCookie("google_api_link_cookie");

    if(api)
        FinalLink = `https://www.googleapis.com/drive/v3/files/`+link.split("/")[5]+`?alt=media&key=`+googleAPI+``;
    else
        FinalLink = link;

    if(play){
        $("#videoPlayer").show();
        $("#videoPlayerBody").html(generateEm(FinalLink, api));
    }
}

function generateEm(link, api){
    let videoID = link.split("/")[5];
    let data = ``;
    if(api){
        data=`
            <video class="w-100" controls>
                <source src="`+link+`" type="video/mp4">
                Your browser does not support HTML video.
            </video>
        `
    }
    else{
        data = `<iframe src="https://drive.google.com/file/d/`+videoID+`/preview" class="w-100" allow="autoplay"></iframe>`;
    }

    return data;
}

function hideDiv(id){
    $(id).hide();
}