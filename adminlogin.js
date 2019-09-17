$(document).ready(function() {

    $('.regButton').click(function(event) {
        event.preventDefault();
        const fullname = $('.fullname').val();
        const username = $('.username').val();
        const email = $('.email').val();
        const password = $('.password').val();

        if(!fullname || !username || !email || !pasword) {
            $('.regMsg').html('Fill in all details');
            return;
        }

        $.ajax({
            method: 'GET',
            url: `http://localhost:3000/users?username=${username}&email=${email}`,
            data: {
                username,
                email,
            },
            beforeSend: function() {
                $('.regMsg').html('Please wait!....');
            },
            success: function(response) {
                if(response.length) {
                    $('.regMsg').html('Details already in the server!');
                } else {
                    $.ajax({
                        method: 'POST',
                        url: 'http://localhost:3000/users',
                        data: {
                            fullname,
                            username,
                            email,
                            password,
                        },
                        beforeSend: function() {
                            $('.regMsg').html('Please wait!....');
                        },
                        success: function(response) {
                            $('.regMsg').html('Access Granted!')
                        },
                    });
                }
            }
        });
    });
});