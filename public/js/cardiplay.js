$(document).ready(function() {
    $.getJSON("db.json", function(data){
        let details = "";
        
        $.each(data.cars, function(key, value){
            details += "<p>"+value.carname +"</p>"+"<p>"+ value.carmake+"</p>" +"<p>"+ value.carmodel +"</p>"+"<p>"+ value.caryear+"</p>" +"<p>"+ value.caramt + '<a href ="' + 'cardisplay.html?id=' + value.id + '"> ValueID</a>'


            $('#detail').html(details);

            let search = new URLSearchParams(window.location.search);
            let dataId = search.get('id');
        })

        
    })
})