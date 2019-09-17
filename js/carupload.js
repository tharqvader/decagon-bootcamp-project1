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
});