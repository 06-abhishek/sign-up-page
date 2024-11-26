// Function to toggle between sign-in and sign-up forms
function toggleForms() {
  const signInForm = document.getElementById("signInForm"); // Get the sign-in form element
  const signUpForm = document.getElementById("signUpForm"); // Get the sign-up form element

  // Check if the sign-in form is hidden
  if (signInForm.classList.contains("hidden")) {
    signInForm.classList.remove("hidden"); // Show the sign-in form
    signUpForm.classList.add("hidden"); // Hide the sign-up form
  } else {
    signInForm.classList.add("hidden"); // Hide the sign-in form
    signUpForm.classList.remove("hidden"); // Show the sign-up form
  }
}


function validPassword() {
  let newPassword = document.querySelector("#newPassword").value;

  // password must be greater than 8 and less than 13 letters.
  let LetterPass = document.querySelector(".LetterPass").classList;
  let cond1 = newPassword.length < 8 || newPassword.length > 13;
  cond1 ? LetterPass.remove("hideLetterPass") : LetterPass.add("hideLetterPass");

  // password must be at least one Uppercase.
  let UpercasePass = document.querySelector(".UpercasePass").classList;
  let cond2 = /[A-Z]/.test(newPassword);
  cond2 ? UpercasePass.add("hideUpercasePass") : UpercasePass.remove("hideUpercasePass");

  // password must be at least one Lowercase.
  let LowercasePass = document.querySelector(".LowercasePass").classList;
  let cond3 = /[a-z]/.test(newPassword);
  cond3 ? LowercasePass.add("hideLowercasePass") : LowercasePass.remove("hideLowercasePass");

  // password must be contains at least one digit
  let DigitPass = document.querySelector(".DigitPass").classList;
  let cond4 = /\d/.test(newPassword);
  cond4 ? DigitPass.add("hideDigitPass") : DigitPass.remove("hideDigitPass");


  // can't able to submit form until all conditions get true.
  if (!cond1 && cond2 && cond3 && cond4) {
    document.getElementById("signInBtn").disabled = false;
  }
  else {
    document.getElementById("signInBtn").disabled = true;
  }
}

function validEmail() {
  let email = document.querySelector("#newEmail").value;
  let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  let validEmail = document.querySelector(".validEmail").classList;
  let condition = emailPattern.test(email);
  condition ? validEmail.add("hideValidEmail") : validEmail.remove("hideValidEmail");

  
  // can't able to submit form until condition get true.
  if (condition) {
    document.getElementById("signInBtn").disabled = false;
  }
  else {
    document.getElementById("signInBtn").disabled = true;
  }
}

function validUsername() {
  let username = document.querySelector("#newUsername").value;

  let validUsername = document.querySelector(".validUsername").classList;
  let validUsernameCharacters = document.querySelector(".validUsernameCharacters").classList;
  let condition1 = username.length > 20 || username.length < 3;
  let condition2 = /^[a-zA-Z0-9_]+$/.test(username);

  condition1 ? validUsername.remove("hideValidUsername") : validUsername.add("hideValidUsername");
  condition2 ? validUsernameCharacters.add("hideValidUsernameCharacters") : validUsernameCharacters.remove("hideValidUsernameCharacters");

  // can't able to submit form until condition get true.
  if (!condition1 && condition2) {
    document.getElementById("signInBtn").disabled = false;
  }
  else {
    document.getElementById("signInBtn").disabled = true;
  }
}