var all_Data;
var tvshow_server_id_url;
var tvshow_id_url;

$( document ).ready(function() {
    let db = new Localbase('BreadCrumb_Local_DB');
    db.collection('all_Data').get().then(all_Data_x => {
        all_Data = all_Data_x[0];

        titles_data = all_Data.TvShows.Titles;
        season_data = all_Data.TvShows.Seasons;

        url_data = (window.location.href).split("?")[1].split("&");
        tvshow_id_url = url_data[0].split("=")[1];
        tvshow_server_id_url = url_data[1].split("=")[1];

        for(let i=0; i<titles_data.length; i++){
            if(titles_data[i].Server_ID == tvshow_server_id_url){
                for(let j=0; j<titles_data[i].DATA.length; j++){
                    if(titles_data[i].DATA[j].Series_Id == tvshow_id_url){
                        Tvshow_Title_Manipulating(titles_data[i].DATA[j]);
                    }
                }
                break;
            }
        }

        current_season = [];
        for(let i=0; i<season_data.length; i++){
            if(season_data[i].Server_ID == tvshow_server_id_url){
                for(let j=0; j<season_data[i].DATA.length; j++){
                    if(season_data[i].DATA[j].Series_Id == tvshow_id_url){
                        current_season.push(season_data[i].DATA[j]);
                    }
                }
                break;
            }
        }
        Tvshow_Seasons_Manipulating(current_season);
    });
});


function Tvshow_Title_Manipulating(seriesTitle){
    $("#backgroundImageURLDiv").css("background-image", `url("`+seriesTitle.Series_Poster+`")`);
    $("#OpenedSeriesName").html(seriesTitle.Series_MainName);
    $("#OpenedSeriesDesc").html(seriesTitle.Series_ExtraInformation);
    $("#OpenedSeriesReleaseYear").html(seriesTitle.Series_ReleaseYear);
    $("#OpenedSeriesGenre").html(seriesTitle.Series_Genre);
    $("#OpenedSeriesOtherNames").html(seriesTitle.Series_AltNames);
}

function Tvshow_Seasons_Manipulating(seriesSeasons){
    NewSeasonSelected(seriesSeasons[0].Season_Id, seriesSeasons[0].Season_Name);
    options = ``;
    seriesSeasons.forEach(season => {
        options += getSeasonLI(season.Season_Name, season.Season_Id);
    });
    $("#seasonsOptions").html(options);
}

function getSeasonLI(seasonName, seasonId){
    return `<li><a class="dropdown-item pointer" onclick="NewSeasonSelected(`+seasonId+`, '`+seasonName+`')">`+ seasonName +`</a></li>`
}

function NewSeasonSelected(id,name){
    $("#SelectedSeason").html(name);
    let current_episodes = [];
    episodesData = all_Data.TvShows.Episodes;
    episodesData.forEach(server => {
        if(server.Server_ID == tvshow_server_id_url){
            server.DATA.forEach(episode => {
                if(episode.Season_Id == id){
                    current_episodes.push(episode);
                }
            });
        }
    });

    epsiodesList = ``;
    current_episodes.forEach(episode => {
        epsiodesList += getEpisodesRow(episode);
    });

    $('#epsiodesGrid').html(epsiodesList);
}

function getEpisodesRow(episode){
    return `
    
    <div class="row pointer linkRow" data-bs-toggle="collapse" data-bs-target="#EpisodeCol`+episode.Episode_Id+`">
        <div class="col-2 col-md-1 ellipsis-g links-col-body">`+episode.Episode_Number+`</div>
        <div class="col-10 col-md-8 ellipsis-g links-col-body">`+episode.Episode_Name+`</div>
        <div class="col-md-3 d-none d-md-block ellipsis-g links-col-body">`+episode.Episode_ReleaseDate+`</div>
    </div>

    <div class="collapse openedEpisode row" id="EpisodeCol`+episode.Episode_Id+`">
        <div class="links_container p-3">
            <div class="row bold-g bg-lv5">
                <div class="col-md-2 col-sm-2 col-2 ellipsis-g links-col-head">#</div>
                <div class="col-md-2 col-sm-3 col-3 ellipsis-g links-col-head">Quality</div>
                <div class="col-md-2 col-sm-4 col-4 ellipsis-g links-col-head">Language</div>
                <div class="col-md-5 col-sm-3 col-3 ellipsis-g links-col-head d-none d-sm-none d-md-block">Subtitle</div>
                <div class="col-md-1 col-sm-3 col-3 ellipsis-g links-col-head">Streamable</div>
            </div>
            <span>
                `+getEpisodeLinks(episode.Episode_Id)+`
            </span>
        </div>
    </div>
    `;
}

function getEpisodeLinks(id){
    linkData = all_Data.TvShows.Links;
    currentLinks = [];
    linkData.forEach(server => {
        if(server.Server_ID == tvshow_server_id_url){
            server.DATA.forEach(link => {
                if(link.Episode_Id == id){
                    currentLinks.push(link);
                }
            });
        }
    });

    linksList = ''
    currentLinks.forEach((link, i) => {
        linksList += getLinksRow((i+1),link);
    });

    return linksList;
}

function getLinksRow(number, link){
    let data = `
        <div class="row pointer linkRow" data-bs-toggle="collapse" data-bs-target="#LinkCol`+link.Link_Id+`">
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
        $("#videoModal").modal('show');
        $("#videoPlayerBody").html(generateEm(FinalLink, api));
    }
    else if(copy){
        copyToClipBoard(FinalLink);
    }
    else{
        openLink(FinalLink);
    }
}

function generateEm(link, api){
    let videoID = link.split("/")[5];
    let data = ``;
    if(api){
        data=`
            <video class="w-100 vh-65" controls>
                <source src="`+link+`" type="video/mp4">
                Your browser does not support HTML video.
            </video>
        `
    }
    else{
        data = `<iframe src="https://drive.google.com/file/d/`+videoID+`/preview" class="w-100 vh-65" allow="autoplay"></iframe>`;
    }

    return data;
}