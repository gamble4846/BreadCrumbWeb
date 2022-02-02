var titles_data;
var links_data;
var movie_title_glob;
var current_link;

$( document ).ready(function() {
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
    //console.log(movie_title);
    $("#movie_name").html(movie_title.Movies_MainName);
};

function Movie_Links_Manipulating(movie_links){
    //console.log(movie_links);

    innertablestr = "<tbody>";
    for(let i=0; i<movie_links.length; i++){
        innertablestr += "<tr class='pointer' onclick='LinkClicked("+ movie_links[i].Link_Id +")'>";
        innertablestr += "<td>" + movie_links[i].Link_Language + "</td>";
        innertablestr += "<td>" + movie_links[i].Link_Quality + "</td>";
        innertablestr += "<td>" + movie_links[i].Streamable + "</td>";
        innertablestr += "</tr>";
    }
    innertablestr += "</tbody>";

    $("#links_table").html(innertablestr);
};

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
    innertablestr += "</tbody>";

    //console.log(innertablestr);

    $('#opened_links_table').html(innertablestr);
    $('#episode_id_op_link').html(current_link.Episode_Id);
    CreateButtons();
    $('#Opened_Link_modal').modal('toggle');
};

function CreateButtons(){
    //console.log(current_link);

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
}

function link_manipulation(link){
    window.open(link, '_blank').focus();
}