//Al cargar el index este script verifica que hayan datos de usuario y contraseña (o email para caso Google) almacenados en la sesión

document.addEventListener("DOMContentLoaded", function(e){
    var bool1 = Boolean(localStorage.getItem('user') && localStorage.getItem('password')); //¿Hay datos de usuario y contraseña en el formulario?
     if (!bool1) {
       window.location.href = "login.html"; //En caso de que no hayan datos de sesión redirige al login
     }
     });