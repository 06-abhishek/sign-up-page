import express from "express";
import path from "path";
import bcrypt from "bcrypt";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { userData } from "./models/signIn.js";
const app = express();

await mongoose.connect("mongodb://mongodb/database");

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

app.use(express.static(path.join(_dirname, "public")));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(
    `<button onclick="window.location.href = '/sign_up'">Join with us!</button>`
  );
});

// Create new account :
app.get("/sign_up", (req, res) => {
  res.render("sign_up_form");
});
app.post("/signup", async (req, res) => {
  try {
    let { newUsername, newEmail, newPassword } = req.body;

    let checkData = await userData.find({});
    let accountExists = false;

    for (let value of checkData) {
      // let usernameExists = await bcrypt.compare(newUsername, value.userName);
      // let emailExists = await bcrypt.compare(newEmail, value.email);

      let usernameExists = newUsername === value.userName;
      let emailExists = newEmail === value.email;

      if (usernameExists || emailExists) {
        accountExists = true;
        break;
      }
    }

    if (accountExists) {
      res.render("Already_Have_Account");
    } else {
      try {
        let salt = await bcrypt.genSalt(10);
        let HASHnewPass = await bcrypt.hash(newPassword, salt);
        // let HASHnewUsername = await bcrypt.hash(newUsername, salt);
        // let HASHnewEmail = await bcrypt.hash(newEmail, salt);

        let data = {
          userName: newUsername,
          email: newEmail,
          password: HASHnewPass,
        };
        await new userData(data).save();

        res.render("Account_Created_Successfully");
      } catch (err) {
        console.log(err);
        res.send("ERROR!");
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error occurred");
  }
});

// Login :
app.get("/sign_in", (req, res) => {
  res.render("sign_in_form");
});
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const checkData = await userData.find({});
  let checkUserLogin = false;

  for (let value of checkData) {
    let checkUsername = username === value.userName || username === value.email;
    let checkPass = await bcrypt.compare(password, value.password);

    if (checkUsername && checkPass) {
      checkUserLogin = true;
    }
  }

  if (checkUserLogin) {
    res.redirect("/");
  } else {
    res.render("Login_Error");
  }
});

// Forgot Password :
app.get("/forgot_password", (req, res) => {
  res.render("forgot_password_form");
});
app.post("/reset_password", async (req, res) => {
  try {
    let EnteredEmail = req.body.email;
    let findEmail = await userData.find({});
    let emailFound = false;

    try {
      for (let value of findEmail) {
        let emailExists = EnteredEmail === value.email;

        if (emailExists) {
          emailFound = true;
          const resetToken = crypto.randomBytes(32).toString("hex"); // Generated unique token
          const hashedToken = await bcrypt.hash(resetToken, 10); // Hashing token
          const expireTime = Date.now() + 3600000; // Token expire time

          await userData.updateOne(
            { email: value.email },
            { $set: { resetToken: hashedToken, resetTokenExpiry: expireTime } }
          );

          // Reset link create :
          const resetLink = `http://localhost:3000/reset_password_form?token=${resetToken}&email=${EnteredEmail}`;

          // Nodemailer to send reset link via mail :
          const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
              user: "your-gmail",
              pass: "your-password",
            },
          });

          // Setting up email data :
          const mailOptions = {
            from: "your-gmail(sender email)",
            to: EnteredEmail,
            subject: "Password reset request",
            text: `Click here to reset your login password : ${resetLink}`,
          };

          // Sending email :
          try {
            const info = await transporter.sendMail(mailOptions);

            console.log(
              "Password reset link sent successfully.",
              info.response
            );
          } catch (error) {
            console.log("Error while sending mail", error);
          }

          res.render("Mail_Sent");
        }
      }
    } catch (error) {
      console.log(error);
      res.send("Error");
    }
    if (!emailFound) {
      res.render("Email_Not_Found");
    }
  } catch (error) {
    console.log(error);
    res.send("Error");
  }
});

// Verify the token, when user opens the reset password link :
app.get("/reset_password_form", async (req, res) => {
  try {
    // Get token and email from URL :
    let { token, email } = req.query;

    // Check is token and email are exist in link :
    if (!token || !email) {
      res.render("Invalid_Request");
    }

    // Check email, is user exists in DB :
    let user = await userData.findOne({ email });
    if (user === null) {
      res.render("User_Not_Found");
    }

    // Check token expiry :
    if (Date.now() > user.resetTokenExpiry) {
      res.render("Token_Expired");
    }

    // Compare token :
    let userToken = user.resetToken;

    let tokenCompare = await bcrypt.compare(token, userToken);
    if (!tokenCompare) {
      res.send("Invalid token");
    }

    res.render("reset_password_form", { email });
  } catch (error) {
    console.log(error);
    res.send("Error");
  }
});

// Update (Change) password :
app.post("/password_updated", async (req, res) => {
  let email = req.body.email; // Getting email from reset_password.ejs
  let newPassword = req.body.newPassword;

  let salt = await bcrypt.genSalt(10);
  let HASHEDnewPassword = await bcrypt.hash(newPassword, salt);

  await userData.updateOne(
    { email: email },
    {
      $set: {
        password: HASHEDnewPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    }
  );

  res.render("Password_Updated");
});

app.listen(3000);
