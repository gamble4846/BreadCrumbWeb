var all_Data;
var tvshow_id_url;
var tvshow_server_id_url;
var current_episodes;
var current_links;

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

function Get_Current_Episdoes(Season_ID){
    Season_ID = Season_ID.toString();
    episodes_data = all_Data.TvShows.Episodes;
    //console.log(episodes_data);

    current_episodes = [];
    for(let i=0; i<episodes_data.length; i++){
        if(episodes_data[i].Server_ID == tvshow_server_id_url){
            for(let j=0; j<episodes_data[i].DATA.length; j++){
                if(episodes_data[i].DATA[j].Season_Id == Season_ID){
                    current_episodes.push(episodes_data[i].DATA[j]);
                }
            }
            break;
        }
    }
    Tvshow_Episodes_Manipulating(current_episodes);
}

function Get_Current_Links(Episode_ID){
    Episode_ID = Episode_ID.toString();
    links_data = all_Data.TvShows.Links;
    //console.log(links_data);

    current_links = [];
    for(let i=0; i<links_data.length; i++){
        if(links_data[i].Server_ID == tvshow_server_id_url){
            for(let j=0; j<links_data[i].DATA.length; j++){
                if(links_data[i].DATA[j].Episode_Id == Episode_ID){
                    current_links.push(links_data[i].DATA[j]);
                }
            }
            break;
        }
    }
    Tvshow_Links_Manipulating(current_links,Episode_ID);
}

function Tvshow_Title_Manipulating(tvshow_title){
    console.log(tvshow_title);
    $("#tvshow_name").html(tvshow_title.Series_MainName);
}

function Tvshow_Seasons_Manipulating(tvshow_seasons){
    //console.log(tvshow_seasons);
    options_string = "";
    for(let i=0; i<tvshow_seasons.length; i++){
        $('#seasons_select').append(`<option value="${tvshow_seasons[i].Season_Id}">${tvshow_seasons[i].Season_Name}</option>`);
    }
    Get_Current_Episdoes(tvshow_seasons[0].Season_Id);
}

function Tvshow_Episodes_Manipulating(tvshow_episodes){
    //console.log(tvshow_episodes);
    innertablestr = "<tbody>";
    for(let i=0; i<tvshow_episodes.length; i++){
        innertablestr += "<tr class='pointer' onclick='Get_Current_Links(" + tvshow_episodes[i].Episode_Id + ")'";
        innertablestr += "><td>";
        innertablestr += tvshow_episodes[i].Episode_Number + "</td><td>";
        innertablestr += tvshow_episodes[i].Episode_Name + "</td><td>";
        innertablestr += tvshow_episodes[i].Episode_ReleaseDate + "</td>";
        innertablestr += "</tr>";
    }
    innertablestr += "</tbody>";
    $("#episodes_table").html(innertablestr);
}

function Tvshow_Links_Manipulating(tvshow_links,Episode_ID){
    for(let i=0; i<current_episodes.length; i++){
        if(current_episodes[i].Episode_Id == Episode_ID){
            current_episode = current_episodes[i];
        }
    }

    innertablestr = "<tbody>";
    for(let i=0; i<tvshow_links.length; i++){
        innertablestr += "<tr class='pointer' onclick='LinkClicked("+ tvshow_links[i].Link_Id +")'>";
        innertablestr += "<td>" + tvshow_links[i].Link_Language + "</td>";
        innertablestr += "<td>" + tvshow_links[i].Link_Quality + "</td>";
        innertablestr += "<td>" + tvshow_links[i].Streamable + "</td>";
        innertablestr += "</tr>";
    }
    innertablestr += "</tbody>";
    
    //console.log(tvshow_links);
    $("#episode_name").html(current_episode.Episode_Name);
    $("#links_table").html(innertablestr);
    $('#Links_modal').modal('toggle');
}

function LinkClicked(tvshow_link_id){
    for(let i=0; i<current_links.length; i++){
        if(current_links[i].Link_Id == tvshow_link_id){
            current_link = current_links[i];
        }
    }
    //console.log(current_link);
    
    innertablestr = "<tbody>";
    innertablestr += "<tr><td>Link_Language: </td>";
    innertablestr += "<td>" + current_link.Link_Language + "</td></tr>";
    
    innertablestr += "<tr><td>Link_Quality: </td>";
    innertablestr += "<td>" + current_link.Link_Quality + "</td></tr>";

    innertablestr += "<tr><td>Link_Size: </td>";
    innertablestr += "<td>" + current_link.Link_Size + "</td></tr>";

    innertablestr += "<tr><td>Link_Subtitles: </td>";
    innertablestr += "<td>" + current_link.Link_Subtitles + "</td></tr>";

    innertablestr += "<tr><td>Streamable: </td>";
    innertablestr += "<td>" + current_link.Streamable + "</td></tr>";

    innertablestr += "<tr><td>Password: </td>";
    innertablestr += "<td>" + current_link.Link_Password + "</td></tr>";
    innertablestr += "</tbody>";

    //console.log(innertablestr);

    $('#opened_links_table').html(innertablestr);
    $('#episode_id_op_link').html(current_link.Episode_Id);
    CreateButtons(tvshow_link_id);
    $('#Opened_Link_modal').modal('toggle');
}

function CreateButtons(tvshow_link_id){
    for(let i=0; i<current_links.length; i++){
        if(current_links[i].Link_Id == tvshow_link_id){
            current_link = current_links[i];
        }
    }

    var innerbuttons = `
        <button type="button" class="btn btn-primary w-100 mt-1" onclick="link_manipulation('` + current_link.Link_link + `')">Open Link</button><br>
        <button type="button" class="btn btn-primary w-100 mt-1" onclick="link_manipulation('` + current_link.Link_link + `')">Copy Link</button><br>
        <button type="button" class="btn btn-primary w-100 mt-1" onclick="link_manipulation('` + current_link.Link_link + `')">Open Link Incognito</button><br>
        <button type="button" class="btn btn-primary w-100 mt-1" onclick="link_manipulation('` + current_link.Link_link + `')">Copy Link Incognito</button><br>
        <button type="button" class="btn btn-primary w-100 mt-1" onclick="link_manipulation('` + current_link.Link_link + `')">Open API Link</button><br>
        <button type="button" class="btn btn-primary w-100 mt-1" onclick="link_manipulation('` + current_link.Link_link + `')">Copy API Link</button><br>
        <button type="button" class="btn btn-primary w-100 mt-1" onclick="link_manipulation('` + current_link.Link_link + `')">Open API Link Incognito</button><br>
        <button type="button" class="btn btn-primary w-100 mt-1" onclick="link_manipulation('` + current_link.Link_link + `')">Copy API Link Incognito</button><br>
    `; 

    $("#div_links_buttons").html(innerbuttons);
    console.log(current_link);
}

function link_manipulation(link){
    window.open(link, '_blank').focus();
}