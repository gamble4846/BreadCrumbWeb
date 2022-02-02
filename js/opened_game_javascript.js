var titles_data;
var links_data;
var game_title_glob;
var current_link;

$( document ).ready(function() {
    let db = new Localbase('BreadCrumb_Local_DB');
    db.collection('all_Data').get().then(all_Data_x => {
        all_Data = all_Data_x[0];

        titles_data = all_Data.Games.Titles;
        links_data = all_Data.Games.Links;

        // console.log(titles_data);
        // console.log(links_data);

        url_data = (window.location.href).split("?")[1].split("&");
        game_id_url = url_data[0].split("=")[1];
        game_server_id_url = url_data[1].split("=")[1];

        console.log(game_id_url);
        // console.log(game_server_id_url);

        for(let i=0; i<titles_data.length; i++){
            if(titles_data[i].Server_ID == game_server_id_url){
                for(let j=0; j<titles_data[i].DATA.length; j++){
                    if(titles_data[i].DATA[j].Game_Id == game_id_url){
                        Game_Title_Manipulating(titles_data[i].DATA[j]);
                    }
                }
                break;
            }
        }

        current_links = [];
        for(let i=0; i<links_data.length; i++){
            if(links_data[i].Server_ID == game_server_id_url){
                for(let j=0; j<links_data[i].DATA.length; j++){
                    if(links_data[i].DATA[j].Game_Id == game_id_url){
                        current_links.push(links_data[i].DATA[j]);
                    }
                }
                break;
            }
        }
        Game_Links_Manipulating(current_links);
    });
});

function Game_Title_Manipulating(game_title){
    game_title_glob = game_title;
    console.log(game_title);
    $("#game_name").html(game_title.Game_Name);
};

function Game_Links_Manipulating(game_links){
    console.log(game_links);

    innertablestr = "<tbody>";
    for(let i=0; i<game_links.length; i++){
        innertablestr += "<tr class='pointer' onclick='LinkClicked("+ game_links[i].Link_Id +")'>";
        innertablestr += "<td>" + game_links[i].Link_Name + "</td>";
        innertablestr += "<td>" + game_links[i].Link_Size + "</td>";
        innertablestr += "<td>" + game_links[i].Machine + "</td>";
        innertablestr += "</tr>";
    }
    innertablestr += "</tbody>";

    $("#links_table").html(innertablestr);
};

function LinkClicked(game_link_id){
    for(let i=0; i<current_links.length; i++){
        if(current_links[i].Link_Id == game_link_id){
            current_link = current_links[i];
        }
    }
    //console.log(current_link);
    
    innertablestr = "<tbody>";
    innertablestr += "<tr><td>Machine: </td>";
    innertablestr += "<td>" + current_link.Machine + "</td></tr>";
    
    innertablestr += "<tr><td>Link_Name: </td>";
    innertablestr += "<td>" + current_link.Link_Name + "</td></tr>";

    innertablestr += "<tr><td>Link_Size: </td>";
    innertablestr += "<td>" + current_link.Link_Size + "</td></tr>";

    innertablestr += "<tr><td>Link_Password: </td>";
    innertablestr += "<td>" + current_link.Link_Password + "</td></tr>";

    innertablestr += "<tr><td>Link_Desc: </td>";
    innertablestr += "<td>" + current_link.Link_Desc + "</td></tr>";
    innertablestr += "</tbody>";

    //console.log(innertablestr);

    $('#opened_links_table').html(innertablestr);
    $('#episode_id_op_link').html(game_title_glob.Game_Name);
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