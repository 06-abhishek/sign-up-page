# Full-Stack Sign-In & Sign-Up Form 🚀

🔒 **Full-Stack Sign-In & Sign-Up Form** built with **Node.js**, **Express.js**, **MongoDB**, and **bcrypt** for secure authentication and user management.

This project demonstrates how to build a **full-stack authentication system** with sign-up, sign-in, and password reset features. Users can securely register, log in, and reset their passwords through a token-based authentication system. The password is encrypted using **bcrypt** for enhanced security.

---

## Features

### **1. Sign-Up Page**
- Users can register with a **username**, **email**, and **password**.
- Email validation ensures a valid email format.
- Password validation includes rules such as:
  - At least 8 characters, up to 13 characters.
  - Must include at least one uppercase letter, one lowercase letter, one number, and one symbol.
- Passwords are securely encrypted using **bcrypt** before storing them in the **MongoDB** database.

### **2. Sign-In Page**
- Allows users to log in using their **email** and **password**.
- The system checks the encrypted password against the stored value in the database.
- Provides an error message if credentials are incorrect.

### **3. Forgot Password / Password Reset**
- Users can request a **password reset** if they forget their password.
- A **reset token** is sent to the user’s email via **Nodemailer**.
- The token expires after 1 hour for security purposes.
- Users can reset their password by entering the new password along with confirmation.

### **4. Dynamic Feedback**
- Success and error messages displayed for account creation, sign-in, password reset, and invalid credentials.

---

## Tech Stack

- **Frontend**: 
  - **HTML**: Structure of the sign-up, sign-in, and password reset forms.
  - **CSS**: Styling for the user interface.
  - **JavaScript**: Client-side validation (e.g., form validation, error handling).

- **Backend**: 
  - **Node.js**: JavaScript runtime for the backend server.
  - **Express.js**: Framework to manage routing and server requests.
  - **MongoDB**: NoSQL database for storing user information securely.
  - **bcrypt**: For hashing passwords before storing them in the database.
  - **jsonwebtoken (JWT)**: For creating and verifying tokens used in authentication.

- **Email**:
  - **Nodemailer**: For sending password reset emails containing the reset token.

---

## Installation

### **1. Clone the repository**

```bash
git clone https://github.com/your-username/full-stack-sign-in-sign-up-form.git
cd full-stack-sign-in-sign-up-form
