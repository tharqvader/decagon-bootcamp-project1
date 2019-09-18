$(document).ready(function() {
    $.getJSON("db.json", function(data){
        let details = "";
        
        $.each(data.cars, function(key, value){
            details += "<p>"+value.carname+"</p>"+"<p>"+ value.carmake+"</p>" +"<p>"+ value.carmodel+"</p>"+"<p>"+ value.caryear+"</p>" +"<p>"+ value.caramt

            $('#detail').html(details);
        })

        
    })
})