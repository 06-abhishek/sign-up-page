function validPassword() {
  let newPassword = document.querySelector("#newPassword").value;

  // password must be greater than 8 and less than 13 letters.
  let LetterPass = document.querySelector(".LetterPass").classList;
  let cond1 = newPassword.length < 8 || newPassword.length > 13;
  cond1
    ? LetterPass.remove("hideLetterPass")
    : LetterPass.add("hideLetterPass");

  // password must be at least one Uppercase.
  let UpercasePass = document.querySelector(".UpercasePass").classList;
  let cond2 = /[A-Z]/.test(newPassword);
  cond2
    ? UpercasePass.add("hideUpercasePass")
    : UpercasePass.remove("hideUpercasePass");

  // password must be at least one Lowercase.
  let LowercasePass = document.querySelector(".LowercasePass").classList;
  let cond3 = /[a-z]/.test(newPassword);
  cond3
    ? LowercasePass.add("hideLowercasePass")
    : LowercasePass.remove("hideLowercasePass");

  // password must be contains at least one digit
  let DigitPass = document.querySelector(".DigitPass").classList;
  let cond4 = /\d/.test(newPassword);
  cond4 ? DigitPass.add("hideDigitPass") : DigitPass.remove("hideDigitPass");

  // can't able to submit form until all conditions get true.
  if (!cond1 && cond2 && cond3 && cond4) {
    document.getElementById("signInBtn").disabled = false;
  } else {
    document.getElementById("signInBtn").disabled = true;
  }
}

(function confirmPassword() {
  let newPassword = document.querySelector("#newPassword");
  let confirmPassword = document.querySelector("#confirmPassword");
  let hideMatch = document.querySelector(".PasswordMatch").classList;

  confirmPassword.addEventListener("input", () => {
    if(newPassword.value === confirmPassword.value) {
      hideMatch.add("hidePasswordMatch");
      document.getElementById("resetBTN").disabled = false;
    }
    else {
      hideMatch.remove("hidePasswordMatch");
      document.getElementById("resetBTN").disabled = true;
    }
  });
})();