$(document).ready(function() {

    $('.regButton').click(function(event) {
        event.preventDefault();
        const fullname = $('.fullname').val();
        const username = $('.username').val();
        const email = $('.email').val();
        const password = $('.password').val();

        if(!fullname || !username || !email || !password) {
        $('.regMsg').html('Fill in all details');
        return;
        }
        $.ajax({
            method: 'GET',
            url: `http://localhost:3000/admin?username=${username}&email=${email}`,
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
                        url: 'http://localhost:3000/admin',
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
                            localStorage.setItem('email', email);
                            //redirect to home page if the login is successfull
                            window.location.assign('carupload.html');
                        },
                    });
                }
            }
        });
    });

    //Login Part!
    $('.submitBtn').click(function(event) {
        event.preventDefault();
        const passwordLogin = $('#passwordLog').val();
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
            $('.regMsg').html('Please wait!!....');
          },
          success: function(response) {
            if (response.length) {
              $('.regMsg').html('Login sucessful');
              $('.logChk').html('You are logged in');
              // $('#').modal('hide');
              window.localStorage.setItem('email', emailLog);
              //redirect to home page if the login is successfull
              window.location.assign('enter.html');
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
        window.location.assign('index.html');
      });
});
