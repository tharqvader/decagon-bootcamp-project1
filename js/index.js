$(document).ready(function() {
    $('.submitRegBtn').click(function(event) {
        event.preventDefault();
        const firstname = $('#firstname').val();
        const lastname = $('#lastname').val();
        const username = $('#username').val();
        const password = $('#password').val();
        const email = $('#email').val();
        //Check if user input is empty
        if (!firstname || !lastname || !username || !password || !email) {
        $('.regMsg').html('Kindly fill in all fields');
        return;
        }
        //Make get request to check if the user already exist
        $.ajax({
        method: 'GET',
        url: `http://localhost:3000/users?email=${email}`,
        data: {
            email,
        },
        beforeSend: function() {
            $('.regMsg').html('Loading....');
        },
        success: function(response) {
            if (response.length) {
            $('.regMsg').html('User already exist');
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
                beforeSend: function() {
                $('.regMsg').html('Loading....');
                },
                success: function() {
                $('.regMsg').html('Registration Successfull');
                },
            });
            }
        },
        });
    });
});