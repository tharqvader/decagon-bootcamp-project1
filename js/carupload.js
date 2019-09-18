$(document).ready(function() {
    $('.uploadBtn').click(function(event) {
        event.preventDefault();
        const carname = $('.carname').val();
        const carmake = $('.carmake').val();
        const carmodel = $('.carmodel').val();
        const caryear = $('.caryear').val();
        const caramt = $('.caramt').val();

        if (!carname || !carmake || !carmodel || !caryear || !caramt) {
            $('.errorMsg').html('Fields must not be empty!');
            return;
        }
        $.ajax({
            method: 'GET',
            url: `http://localhost:3000/cars?carmodel=${carmodel}&caryear=${caryear}`,
            data: {
                carmodel,
                caryear,
            },
            success: function(response) {
                                if (response.length) {
                      $('.errorMsg1').html(carname);
                $('.errorMsg').html('Duplicate Input!');
                } else {
                    $.ajax({
                        method: 'POST',
                        url: 'http://localhost:3000/cars',
                        data: {
                            carname,
                            carmake,
                            carmodel,
                            caryear,
                            caramt,
                        },
                        success: function() {
                            $('.errorMsg').html('Upload Successful!');
                        },
                    })
                }
            },
        });
    });
   
    $.getJSON("db.json", function(data){
        let details = "";
        
        $.each(data.cars, function(key, value){
            details += "<p>"+value.carname +"</p>"+"<p>"+ value.carmake+"</p>" +"<p>"+ value.carmodel +"</p>"+"<p>"+ value.caryear+"</p>" +"<p>"+ value.caramt + '<a href ="' + 'carupload.html?id=' + value.id + '"> ValueID</a>'


            $('#detail').html(details);

            
        })
    })

    let search = new URLSearchParams(window.location.search);
    let dataId = search.get('id');

    $('.updateBtn').click(function(event){
        event.preventDefault();
        const carname = $('.carname').val();
        const carmake = $('.carmake').val();
        const carmodel = $('.carmodel').val();
        const caryear = $('.caryear').val();
        const caramt = $('.caramt').val();

        $.ajax({
            method: 'PATCH',
            url: `http://localhost:3000/cars/${dataId}`,
            data: {
                carname,
                carmake,
                carmodel,
                caryear,
                caramt,
            },
        })
    });

    $('.deleteBtn').click(function(event){
        event.preventDefault();
        $.ajax({
            method: 'DELETE',
            url: `http://localhost:3000/cars/${dataId}`
        })
    })
});