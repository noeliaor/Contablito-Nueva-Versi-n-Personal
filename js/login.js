"use strict";
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let AccessButton = document.getElementsByClassName("AccessButton")[0];

document.addEventListener("DOMContentLoaded", function (e) {
  cargaInicial();
  AccessButton.addEventListener("click", () => { //Al presionar en el botón de ingreso:
    //Se extraen los datos del formulario;
   let Txtuser = document.getElementById('datauser').value;//Ingreso directo en la página
  let  Txtpassword = document.getElementById('datapassword').value;
    if (Boolean(Txtuser && Txtpassword)&& findUser(Txtuser,Txtpassword)) {  //Controlo que se haya realizado alguna de las autenticaciones
      window.location.href = "index.html"; //si se autenticó redirige al index (página inicial de la tienda)
      localStorage.setItem('user', Txtuser); //Almacena como datos de sesión el usuario y contraseña ingresados en el formulario de la página.
      localStorage.setItem('password', Txtpassword);

    }
    else {
      alert("Usuario y/o contraseña no registrados.") //
    }

  })
});
function findUser(User,Password) { //Función que devuelve true si no hay coincidencias con ID's existentes
    let status = false;
    for (let user of JSON.parse(localStorage.getItem("usersInfo"))) {
        if ((User == user.username)&&(Password==user.password)) {
            status = true;
        }
    }
    return status;
}

//Función que se ejecuta cuando se carga el documento HTML. Verifica que hayan datos de productos, categorías y usuario
//administrador cargados, de lo contrario los carga.
function cargaInicial() {
  //PRODUCTOS
  let getlocal = localStorage.getItem("productslistSave"); // si no tengo datos de productos cargo lista
  if (getlocal == null || getlocal == "" || getlocal == false || getlocal == undefined) {
    let productslist = [ //Genero listado de productos inicial
      { id: 394, name: "Tornillo 2cm", price: 20, stock: 400, minstock: 200 },
      { id: 395, name: "Tornillo 3cm", price: 30, stock: 560, minstock: 200 },
      { id: 396, name: "Tornillo 4cm", price: 40, stock: 280, minstock: 200 },
      { id: 397, name: "Tornillo 5cm", price: 50, stock: 390, minstock: 200 },
      { id: 400, name: "Ladrillo común", price: 200, stock: 500, minstock: 300 },
      { id: 401, name: "Ladrillo hueco", price: 390, stock: 300, minstock: 300 },
      { id: 402, name: "Ladrillo refractario", price: 418, stock: 400, minstock: 300 },
      { id: 403, name: "Ladrillo de vidrio", price: 540, stock: 1000, minstock: 300 },
    ];
    localStorage.setItem("productslistSave", JSON.stringify(productslist)); // Cargo lista por primera vez
  }
//CATEGORÍAS
  getlocal = localStorage.getItem("categorieslistSave"); // si no tengo datos de categorías cargo lista
  if (getlocal == null || getlocal == "" || getlocal == false || getlocal == undefined) {

    let categorieslist = [{ idpadre: 39, name: "Tornillo" }, { idpadre: 40, name: "Ladrillo" }];
    localStorage.setItem("categorieslistSave", JSON.stringify(categorieslist)); //Guardo la nueva vista
  }

//USUARIOS
getlocal = localStorage.getItem("usersInfo"); // si no tengo datos de usuarios cargo lista
if (getlocal == null || getlocal == "" || getlocal == false || getlocal == undefined) {
  let usersinfo = [{ username: "admin", password: "@Contablito2021" }]; //Almaceno datos de usuario administrador
  localStorage.setItem("usersInfo", JSON.stringify(usersinfo));
 }

 //MOVIMIENTOS
getlocal = localStorage.getItem("transInfo"); // si no tengo datos de usuarios cargo lista
if (getlocal == null || getlocal == "" || getlocal == false || getlocal == undefined) {
let transinfo = [{total:"",IVAtype:"", product:"", type:"",date:"",user:""}]; //Almaceno datos de usuario administrador
 localStorage.setItem("transInfo", JSON.stringify(transinfo));
 }
};

