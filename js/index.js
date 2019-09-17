$(document).ready(function() {
    //Registration Part!
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

    //Login Part!
    $('.submitLogBtn').click(function(event) {
        event.preventDefault();
        const passwordLog = $('#passwordLog').val();
        const emailLog = $('#emailLog').val();
        if (!passwordLog || !emailLog) {
          $('.regMsg').html('Kindly fill in all fields');
          return;
        }
        //Check if the user is in the database
        $.ajax({
          method: 'GET',
          url: `http://localhost:3000/users?email=${emailLog}&password=${passwordLog}`,
          data: {
            email: emailLog,
            password: passwordLog,
          },
          beforeSend: function() {
            $('.regMsg').html('Loading....');
          },
          success: function(response) {
            if (response.length) {
              $('.regMsg').html('Login sucessful');
              $('.logChk').html('You are logged in');
              localStorage.setItem('email', emailLog);
              //redirect to home page if the login is successfull
              window.location = 'index.html';
            } else {
              $('.regMsg').html('Username or password Incorrect');
            }
          },
        });
      });
      //Logout Function
      $('.logoutBtn').click(function() {
        //clear the localstorage and redirect to signup page
        localStorage.clear();
        $('.logChk').html('Kindly login');
        window.location.assign('signup.html');
      });
});