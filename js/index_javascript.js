$( document ).ready(function() {
    console.log('starting');
    let db = new Localbase('BreadCrumb_Local_DB');
    db.collection('all_Data').get().then(all_Data => {
        innertable = "";
        all_Data = all_Data[0];

        database = Object.keys(all_Data);
        
        for(let i=0; i<database.length; i++){
            table = Object.keys(all_Data[database[i]]);
            for(let j=0; j<table.length; j++){
                innertable += "<tr><td>" + database[i] + "_" + table[j] + "</td>";
                temp1 = all_Data[database[i]][table[j]];
                count = 0;
                for(let z=0; z<temp1.length; z++){
                    try {
                        count += (temp1[z].DATA).length;
                    }
                    catch(err) {
                    }
                }
                innertable += "<td>" + count + "</td>";
            }
            innertable += "</tr>";
        }

        $("#data_count_table").html(innertable);
    });
});