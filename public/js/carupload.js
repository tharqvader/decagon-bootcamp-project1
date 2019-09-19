$(document).ready(function() {
    $('.uploadBtn').click(function(event) {
        event.preventDefault();
        const imgurl = $('.imgurl').val();
        const carname = $('.carname').val();
        const carmake = $('.carmake').val();
        const carmodel = $('.carmodel').val();
        const caryear = $('.caryear').val();
        const caramt = $('.caramt').val();

        if (!imgurl || !carname || !carmake || !carmodel || !caryear || !caramt) {
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
                            imgurl,
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
   $.ajax({
       method: "GET",
       url: "http://localhost:3000/cars",
       success: function(data) {
           console.log(data);
           
        $.each(data, function(key, value){
            details = '';
            frontEnd = '';
            frontEnd += `<div class="card">
        <div class="card-body">
        <img class="card-img-top img-fluid" src="${value.imgurl}" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">${value.carname}</h5>
            <h5 class="card-subtitle mb-2">${value.carmake}</h5>
            <h5 class="card-subtitle mb-2">${value.carmodel}</h5>
            <h5 class="card-subtitle mb-2"  style="font-size: 12px">${value.caramt}</h5>
            <h5 class="card-subtitle mb-2"  style="font-size: 12px">${value.caryear}</h5>
            <a href="payment.html" class="btn btn-primary btn-sm">Buy</a>
        </div>
        </div>
    </div>`
            details += "<p>"+'<img src="'+value.imgurl+'"/>'+"</p>"+"<p>"+value.carname +"</p>"+"<p>"+value.carmake +"</p>" +"<p>"+ value.carmodel +"</p>"+"<p>"+ value.caryear+"</p>" +"<p>"+ value.caramt + '<a href ="' + 'carupload.html?id=' + value.id + '"> ValueID</a>'
            // frontEnd += "<p>"+'<img src="'+value.imgurl+'"/>'+"<p>"+value.carname +"</p>"+"<p>"+ value.carmake+"</p>" +"<p>"+ value.carmodel +"</p>"+"<p>"+ value.caryear+"</p>" +"<p>"+ value.caramt + '<a href ="' + 'carupload.html?id=' + value.id + '"> ValueID</a>'


            $('#detail').append(details);
            $('#frontEnd').append(frontEnd);

            
        })
       }
   })

    let search = new URLSearchParams(window.location.search);
    let dataId = search.get('id');

    $('.updateBtn').click(function(event){
        event.preventDefault();
        const imgurl = $('.imgurl').val();
        const carname = $('.carname').val();
        const carmake = $('.carmake').val();
        const carmodel = $('.carmodel').val();
        const caryear = $('.caryear').val();
        const caramt = $('.caramt').val();
    $.ajax({
        method: 'PATCH',
        url: `http://localhost:3000/cars/${dataId}`,
        data: {
            imgurl,
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
});

    $('.deleteBtn').click(function(event){
        event.preventDefault();
        $.ajax({
            method: 'DELETE',
            url: `http://localhost:3000/cars/${dataId}`
        })
    })
});