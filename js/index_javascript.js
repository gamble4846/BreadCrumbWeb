$( document ).ready(function() {
    let db = new Localbase('BreadCrumb_Local_DB');
    db.collection('all_Data').get().then(all_Data => {
        innertable = "";
        all_Data = all_Data[0];
        console.log(all_Data);

        tables = Object.keys(all_Data);
        
        for(let i=0; i<tables.length; i++){
            console.log(tables[i]);
        }
    })
});