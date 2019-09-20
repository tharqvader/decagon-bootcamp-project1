$(document).ready(function() {
    
  //Registration Part!
  $('.regButton').click(function(event) {
      event.preventDefault();
      const fullname = $('#fullname').val();
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
      url: `http://localhost:3000/admin?email=${email}`,
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
              url: 'http://localhost:3000/admin',
              data: {
              fullname,
              username,
              email,
              password,
              },
              beforeSend: function() {
              $('.regMsg').html('Loading....');
              },
              success: function() {
              $('.regMsg').html('Registration Successfull');
              localStorage.setItem('email', email);
            //redirect to home page if the login is successfull
              window.location.assign('carupload.html');
              },
          });
          }
      },
      });
  });

  //Login Part!
  $('.logButton').click(function(event) {
      event.preventDefault();
      const passwordLogin = $('#passwordLogin').val();
      const emailLogin = $('#emailLogin').val();
      if (!passwordLog || !emailLog) {
        $('.regMsg').html('Kindly fill in all fields');
        return;
      }
      //Check if the user is in the database
      $.ajax({
        method: 'GET',
        url: `http://localhost:3000/admin?email=${emailLogin}&password=${passwordLogin}`,
        data: {
          email: emailLogin,
          password: passwordLogin,
        },
        beforeSend: function() {
          $('.regMsg').html('Please wait!!....');
        },
        success: function(response) {
          if (response.length) {
            $('.regMsg').html('Login sucessful');
            $('.chkLog').html('You are logged in');
            // $('#').modal('hide');
            window.localStorage.setItem('email', emailLogin);
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
      $('.chkLog').html('Kindly login');
      window.location.assign('index.html');
    });

//     $('.uploadBtn').click(function(event) {
//       event.preventDefault();
//       const carname = $('.carname').val();
//       const carmake = $('.carmake').val();
//       const carmodel = $('.carmodel').val();
//       const caryear = $('.caryear').val();
//       const caramt = $('.caramt').val();

//       if (!carname || !carmake || !carmodel || !caryear || !caramt) {
//           $('.errorMsg').html('Fields must not be empty!');
//           return;
//       }
//       $.ajax({
//           method: 'GET',
//           url: `http://localhost:3000/cars?carmodel=${carmodel}&caryear=${caryear}`,
//           url: `http://localhost:3000/users?username=${username}&email=${email}`,
//           data: {
//               carmodel,
//               caryear,
//           },
//           success: function(response) {
//                               if (response.length) {
//                     $('.errorMsg1').html(carname);
//           } else{
//               $('.errorMsg').html('No such cars!!');
//           }
//       }
//   });
// });
});