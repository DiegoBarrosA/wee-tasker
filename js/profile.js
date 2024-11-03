document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("profile-username").value = getCurrentUser().username;

  document.getElementById("profile-email").value = getCurrentUser().email;

  document.getElementById("profile-birthdate").value =
    getCurrentUser().birthdate;

  const formLogin = document.getElementById("form-profile");

  formLogin.addEventListener(
    "submit",
    function (event) {
      event.preventDefault();
      event.stopPropagation();

      const email = document.getElementById("profile-email").value;
      const username = document.getElementById("profile-username").value;
      const birthdate = document.getElementById("profile-birthdate").value;
      const password = document.getElementById("profile-password").value;
      const loginExitoso = actualizarPerfil(
        email,
        username,
        password,
        birthdate,
      );

      if (loginExitoso) {
        formLogin.reset();
      } else {
        console.log("Error en el inicio de sesión.");
      }
    },
    false,
  );
});
