
document.addEventListener("DOMContentLoaded", () => {
    let user = localStorage.getItem('user');
    let password = localStorage.getItem('password');
    if (user == "admin") { //Si el usuario es administrador muestro menú para gestión de usuarios
        document.getElementById("toadmin").innerHTML = `
    <h3 style="text-align:center">Agregar un nuevo usuario</h3>
    <br><br>
    <form>
    <div style="margin:auto;  width: 300px;">
    <label for="newuser">Nuevo usuario:</label>
      <input style="width:300px" type="text" id="newuser" class="form-control">
      <br>
    <label for="password">Nueva contraseña: </label>
      <input style="width:300px" type="text" id="newpassword" class="form-control">
    </div>
</form>
<br></br>
<br></br>
<center><button type="submit" id="newusersave" style="float:center;border:0px; background-color: rgb(67, 71, 71);" class="btn btn-primary">Guardar usuario</button></center>
<br></br>
<br></br>
<center><img class="cover-ingreso" src="img/usersicon.png" style="width:100px"></center>
<br></br>
<center><button type="submit" id="usersview" style="float:center; border:0px;background-color: rgb(67, 71, 71);;" class="btn btn-primary">Ver usuarios</button></center>
<br></br>
<div id="showusers"></div>
` //Contenido del HTML con valores dados por la información almacenada inicialmente

    } else { //Si el usuario no es administrador, no muestro la información.
        document.getElementById("toadmin").innerHTML = `  <center><h3>Usuario no autorizado para acceder a esta información.</h3></center>
        `
    }

    document.getElementById("newusersave").addEventListener("click", () => { //Clickeo para creación de nuevo usuario.
        let newuser = document.getElementById("newuser").value;
        let newpassword = document.getElementById("newpassword").value;
        if (newuser && newpassword) { //Verificación de campos completos
            if (findUser(newuser, JSON.parse(localStorage.getItem("usersInfo")))) { //Verificación de nombre de usuario no repetido
                let ispassword = prompt("Por favor, confirme su contraseña", "");
                if (ispassword == password) { //Si el administrador ingresó contraseña correcta agrego el usuario
                    alert("Usuario agregado correctamente.");
                    let userslist = JSON.parse(localStorage.getItem("usersInfo"));
                    userslist.push({ username: newuser, password: newpassword }); //Agrego el usuario a la lista
                    localStorage.setItem("usersInfo", JSON.stringify(userslist));
                    showData(); //Actualizo lista de usuarios y la muestro
                } else {
                    alert("Contraseña errónea, verifique e intente nuevamente.")
                }
            }else{
                alert("Error: ya existe un usuario con el mismo nombre.")
            }

        } else {
            alert("Por favor, complete los dos campos.")
        }

    });
    document.getElementById("usersview").addEventListener("click", () => { //Click para desplegar lista de usuarios
        document.getElementById("showusers").innerHTML = `  <table>
<thead>
  <tr>
    <th>Usuario</th>
    <th>Contraseña</th>
    <th></th>
  </tr>
</thead>
<tbody id="tousers"></tbody>
</table>`
            ;
        showData();
    });
});

const showData = () => { //Función que realiza la muestra de usuarios, va concatenando los datos de cada uno
    let tbody = document.getElementById("tousers");
    tbody.innerHTML = "";
    let userslist = JSON.parse(localStorage.getItem("usersInfo"));
    for (var i = 0; i < userslist.length; i++) {
        tbody.innerHTML += `<tr><td>${userslist[i].username}</td><td>${userslist[i].password}</td><td onclick="deleteData(${i})" id="trash${i}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
      </svg></td></tr>`;
    }
}
function deleteData(index) { //Función que se ejecuta cuando se cliquea en el ícono de basura
    let userslist = JSON.parse(localStorage.getItem("usersInfo"));
    if (userslist[index].username != "admin") {
        if (confirm(`¿Está seguro que desea eliminar a ${userslist[index].username}?`)) {
            userslist.splice(index, 1); //Elimino el elemento en el ícono indicado y redefino lista 
            localStorage.setItem("usersInfo", JSON.stringify(userslist));
            let tbody = document.getElementById("tousers");
            tbody.innerHTML = "";
            showData() //Muestro la nueva lista
        }
    } else {
        alert("ERROR: el usuario administrador no se puede eliminar.")
    }
}

function findUser(username, list) { //Función que devuelve true si no hay coincidencias con ID's existentes
    let status = true;
    for (let userinfo of list) {
        if (username == userinfo.username) {
            status = false;
        }
    }
    return status;
}

