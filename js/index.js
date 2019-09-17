$(document).ready(function() {
    $('.submitRegBtn').click(function(event) {
        event.preventDefault();
        const firstname = $('#firstname').val();
        const lastname = $('#lastname').val();
        const username = $('#username').val();
        const email = $('#email').val();
        const password = $('#password').val();

        if (!firstname || !lastname || !username || !email || !password) {
            $('.regMsg').html('Kindly fill all fields!');
            return;
        }
        $.ajax({
            method: 'GET',
            url: `http://localhost:3000/users?email=${email}`,
            data: {
                username,
                email,
            },
            success: function(response) {
                if (response.length) {
                    $('.regMsg').html('User already exists');
                } else {
                    $.ajax({
                        method: 'POST',
                        url: 'http://localhost:3000/users',
                        data: {
                            firstname,
                            lastname,
                            username,
                            email,
                            password,
                        },
                        success: function() {
                            $('.regMsg').html('Registration Successful');
                        },
                    });
                }
            },
        });
    });
});