import bcrypt from "bcrypt";

// It creates hash password, but it's too easy to crack it.
let pass = "Password1";
let hash = await bcrypt.hash(pass, 10);  // 10 means 10 power of 2 (2x2; 10 times)
console.log({pass, hash});


// By using salt; hash password get too difficult to crack.
let pass2 = "Password2";
let salt = bcrypt.genSaltSync(10);  // 10 means 10 power of 2 (2x2; 10 times)
let hash2 = await bcrypt.hash(pass2, salt);
console.log({pass2, salt, hash2});

// Compare hash password.
let isMatch = await bcrypt.compare(pass2, hash2);
console.log(isMatch);