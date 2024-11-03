document.addEventListener("DOMContentLoaded", function () {
  // Simulación de base de datos en localStorage
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  function getCurrentUser() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || [];
    console.log(currentUser);
    return currentUser;
  }
  function setCurrentUser(id, email, password, username, birthdate) {
    user = {
      id: id,
      email: email,
      username: username,
      password: password,
      birthdate: birthdate,
    };
    localStorage.setItem("currentUser", JSON.stringify(user));
  }
  // Función para registrar usuarios
  function registrarUsuario(email, password, username, birthdate) {
    console.log("Intentando registrar usuario:", {
      email,
      username,
      birthdate,
    });
    const usuarioExistente = usuarios.find(
      (user) => user.email === email || user.username === username,
    );
    if (usuarioExistente) {
      mostrarAlerta("El usuario ya existe.", "red-200");
      console.log("El usuario ya existe.");
      return false;
    }
    let id = usuarios.length + 1;
    const nuevoUsuario = { id, email, password, username, birthdate };
    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    mostrarAlerta("Usuario registrado exitosamente.", "green-200");
    console.log("Usuario registrado exitosamente:", nuevoUsuario);
    return true;
  }

  // Función para iniciar sesión
  function iniciarSesion(emailOrUsername, password) {
    console.log("Intentando iniciar sesión:", { emailOrUsername, password });

    console.log("Intentando iniciar sesión:", usuarios);
    const usuario = usuarios.find(
      (user) =>
        (user.email === emailOrUsername || user.username === emailOrUsername) &&
        user.password === password,
    );
    if (usuario) {
      mostrarAlerta("Inicio de sesión exitoso.", "success");
      console.log("Inicio de sesión exitoso:", usuario);
      setCurrentUser(
        usuario.id,
        usuario.email,
        usuario.password,
        usuario.username,
        usuario.birthdate,
      );
      return true;
    } else {
      mostrarAlerta("Email/Usuario o contraseña incorrectos.", "danger");
      console.log("Email/Usuario o contraseña incorrectos.");
      return false;
    }
  }

  function recoverPassword() {
    mostrarAlerta(
      "We will send you an email with fruter steps, please review your inbox.",
      "red-200",
    );
  }

  // Función para iniciar sesión
  function actualizarPerfil(email, username, password, birthdate) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || [];
    let id = currentUser.id;
    const nuevosDatos = { id, email, password, username, birthdate };
    const usuario = usuarios.find((user) => user.id === id);
    let usuariosNew = usuarios.filter((obj) => obj.id !== usuario.id);
    usuariosNew.push(nuevosDatos);
    localStorage.setItem("usuarios", JSON.stringify(usuariosNew));
    setCurrentUser(
      id,
      nuevosDatos.email,
      nuevosDatos.password,
      nuevosDatos.username,
      nuevosDatos.birthdate,
    );
    return true;
  }
  // Función para mostrar alertas
  function mostrarAlerta(mensaje, tipo) {
    const alertaDiv = document.createElement("div");
    alertaDiv.className = `px-4 py-3 relative rounded border border-${tipo} bg-${tipo}`;
    alertaDiv.appendChild(document.createTextNode(mensaje));
    const container = document.querySelector(".container");
    const firstChild = container.firstChild;

    // Insertar la alerta al principio del contenedor
    if (firstChild) {
      container.insertBefore(alertaDiv, firstChild);
    } else {
      container.appendChild(alertaDiv);
    }

    // Desaparecer alerta después de 3 segundos
    setTimeout(() => {
      const alerta = document.querySelector(".alert");
      if (alerta) {
        alerta.remove();
      }
    }, 6000);
  }

  // Exportar funciones
  window.registrarUsuario = registrarUsuario;
  window.iniciarSesion = iniciarSesion;

  window.getCurrentUser = getCurrentUser;
  window.actualizarPerfil = actualizarPerfil;
  window.recoverPassword = recoverPassword;
});
