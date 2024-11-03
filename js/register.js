document.addEventListener("DOMContentLoaded", function () {
  function checkPasswordStrength(password) {
    let strength = 0;

    // Check length
    if (password.length >= 8) strength++;

    // Check for uppercase letters
    if (/[A-Z]/.test(password)) strength++;

    // Check for lowercase letters
    if (/[a-z]/.test(password)) strength++;

    // Check for numbers
    if (/[0-9]/.test(password)) strength++;

    // Check for special characters
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

    // Evaluate strength
    if (strength === 5) {
      return "Strong";
    } else if (strength >= 3) {
      return "Medium";
    } else {
      return "Weak";
    }
  }

  // Manejar el formulario de registro
  const formRegister = document.querySelector(".needs-validation");
  formRegister.addEventListener(
    "submit",
    function (event) {
      event.preventDefault();
      event.stopPropagation();

      const email = document.querySelector("#email").value;
      const password = document.querySelector("#password").value;
      const repeatPassword = document.querySelector("#repeat_password").value;
      const username = document.querySelector("#username").value;
      const birthdate = document.querySelector("#birthdate").value;

      console.log("Formulario de registro enviado:", {
        email,
        password,
        repeatPassword,
        username,
        birthdate,
      });

      const isValid = formRegister.checkValidity();
      formRegister.classList.add("was-validated");

      if (!isValid) {
        return;
      }

      if (password !== repeatPassword) {
        alert("Las contraseñas no coinciden.");
        console.log("Las contraseñas no coinciden.");
        return;
      }
      if (checkPasswordStrength(password) === "Weak") {
        alert("La contraseña es muy debil!");
        return;
      }
      const registroExitoso = registrarUsuario(
        email,
        password,
        username,
        birthdate,
      );
      if (registroExitoso) {
        console.log("Registro exitoso:", {
          email,
          password,
          username,
          birthdate,
        });
        formRegister.reset();
        formRegister.classList.remove("was-validated");
      } else {
        console.log("El usuario ya existe.");
      }
    },
    false,
  );
});
