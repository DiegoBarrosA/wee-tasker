let storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
let users = storedUsers;

document.addEventListener("DOMContentLoaded", function () {
  window.registerUser = registerUser;

  function registerUser(
    inputEmail,
    inputPassword,
    inputUsername,
    inputBirthdate,
  ) {
    let newUser = {
      id: users.length + 1,
      email: inputEmail,
      password: inputPassword,
      username: inputUsername,
      birthdate: inputBirthdate,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
  }

  // Handle the registration form
  const registrationForm = document.querySelector(".needs-validation");
  registrationForm.addEventListener(
    "submit",
    function (event) {
      event.preventDefault();
      event.stopPropagation();

      const email = document.querySelector("#email").value;
      const password = document.querySelector("#password").value;
      const repeatPassword = document.querySelector("#repeat_password").value;
      const username = document.querySelector("#username").value;
      const birthdate = document.querySelector("#birthdate").value;

      console.log("Registration form submitted:", {
        email,
        password,
        repeatPassword,
        username,
        birthdate,
      });

      const isValid = registrationForm.checkValidity();
      registrationForm.classList.add("was-validated");

      if (!isValid) {
        return;
      }

      if (password !== repeatPassword) {
        alert("Passwords do not match.");
        console.log("Passwords do not match.");
        return;
      }

      const registrationSuccess = window.registerUser(
        email,
        password,
        username,
        birthdate,
      );
      if (registrationSuccess) {
        registerUser(email, password, username, birthdate);
        console.log("Registration successful:", {
          email,
          password,
          username,
          birthdate,
        });
        registrationForm.reset();
        registrationForm.classList.remove("was-validated");
      } else {
        console.log("User already exists.");
      }
    },
    false,
  );
});
