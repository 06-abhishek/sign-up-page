function validEmail() {
  let email = document.querySelector("#email").value;
  let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  let validEmail = document.querySelector(".validEmail").classList;
  let condition = emailPattern.test(email);
  condition
    ? validEmail.add("hideEmail")
    : validEmail.remove("hideEmail");

  // can't able to submit form until condition get true.
  if (condition) {
    document.getElementById("signInBtn").disabled = false;
  } else {
    document.getElementById("signInBtn").disabled = true;
  }
}