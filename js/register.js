let storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
let users = storedUsers;

document.addEventListener('DOMContentLoaded', function() {

window.registerUser = registerUser;
function registerUser(input_email,input_password,input_username,input_birthdate) {
    let new_user = {
    id: users.length + 1,
    email: input_email,
    password: input_password,
    username: input_username,
    birthdate: input_birthdate
  };
  users.push(new_user);
  localStorage.setItem("users", JSON.stringify(users));
}



    // Manejar el formulario de registro
    const formRegister = document.querySelector('.needs-validation');
    formRegister.addEventListener('submit', function(event) {
      event.preventDefault();
      event.stopPropagation();
  
      const email = document.querySelector('#email').value;
      const password = document.querySelector('#password').value;
      const repeatPassword = document.querySelector('#repeat_password').value;
      const username = document.querySelector('#username').value;
      const birthdate = document.querySelector('#birthdate').value;
  
      console.log('Formulario de registro enviado:', { email,  password, repeatPassword, username, birthdate });
  
      const isValid = formRegister.checkValidity();
      formRegister.classList.add('was-validated');
       if (!isValid) {
        return;
      }
  
      if (password !== repeatPassword) {
        alert('Las contraseñas no coinciden.');
        console.log('Las contraseñas no coinciden.');
        return;
      }
       const registroExitoso = window.registrarUsuario(email, password, username, birthdate);
      if (registroExitoso) {
        console.log('Registro exitoso:', { email,password, username, birthdate });
        formRegister.reset();
        formRegister.classList.remove('was-validated');
      } else {
        console.log('El usuario ya existe.');
      }
    }, false);
  });
