$(document).ready(function() {
    //Check if there is any user data stored in the local storage
    //because user data is stored in localstorage at login
    let user = window.localStorage.getItem('email');
    if (!user) {
      //If no user data, redirect to signup/login page, anyone you like
      $('.logChk').html('Kindly Log in');
      window.Location.assign('signin.html');
    } else {
      //Else prompt the user he is logged in
      $('.logChk').html('You are logged in');
    }
  });
  