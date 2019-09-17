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

    // $('#btnshowImg').click(function () {
    //     $.getJSON('db.json', function (data) {
    //         let arrItems = [];  //the array that'll store json items.
    //         $.each(data, function (index, value) {
    //             arrItems.push(value); //push values into array
    //         });

    //         //Extract values for the table header.
    //         let col = [];
    //         for (let i = 0; i < arrItems.length; i++){
    //             for (let key in arrItems[i]) {
    //                 if (col.indexOf(key) === -1) {
    //                     col.push(key);
    //                 }
    //             }
    //         }

    //         //create a table element from the db (dynamically)
    //         let table = document.createElement('table');

    //         let tr = table.insertRow(-1);

    //         for (let i = 0; i < col.length; i++) {
    //             let th = document.createElement('th');
    //             th.innerHTML = col[1];
    //             tr.appendChild(th);
    //         }

    //         for (let i = 0; i < arrItems.length; i++) {
    //             tr = table.insertRow(-1);

    //             for (let j = 0; j < col.length; j++) {
    //                 let tabCell = tr.insertCell(-1);
    //                 if (j === 2) {

    //                     let img = document.createElement('img');
    //                     img.src = arrItems[i].Image;
    //                     tabCell.appendChild(img);
    //                 }
    //                 else {
    //                     tabCell.innerHTML = arrItems[i][col[j]];
    //                 }   
    //             }
    //         }

    //         let divContainer = document.getElementById('showData');
    //         divContainer.innerHTML = "";
    //         divContainer.appendChild(table);
    //     });
    // });
    $('#bt').click(function () {
            
        var url = "http://localhost:3000/cars";

        $.getJSON(url, function (data) {
            $.each(data, function (index, value) {
                // APPEND OR INSERT DATA TO SELECT ELEMENT.
                $('#sel').append('<option value="' + value.ID + '">' + value.Name + '</option>');
            });
        });
    });

    // SHOW SELECTED VALUE.
    $('#sel').change(function () {
        $('#msg').text('Selected Item: ' + this.options[this.selectedIndex].text);
    });
});