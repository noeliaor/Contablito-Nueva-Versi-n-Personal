

function alertData(theindex) {
    let list = JSON.parse(localStorage.getItem("productslistSave")); //Extraigo lista de productos cargada
    if (list[theindex].stock < list[theindex].minstock) {
        classname = "color-red";
    } else if (list[theindex].stock < list[theindex].minstock * 1.5) { //Al 50% del stock mínimo
        classname = "color-yellow";
    } else {
        classname = "color-green";
    }
    return classname
}
function deleteData(index) { //Función que se ejecuta cuando se cliquea en el ícono de basura
    let list = JSON.parse(localStorage.getItem("productslistSave")); //Extraigo lista de productos cargada
    if (confirm(`¿Está seguro que desea eliminar ${list[index].name}?`)) {
        list.splice(index, 1); //Elimino el elemento en el ícono indicado y redefino lista 
        localStorage.setItem("productslistSave", JSON.stringify(list));
        let tbody = document.getElementById("toinformation");
        tbody.innerHTML = "";
        showData() //Muestro la nueva lista
    }

}
function showData() {
    let tbody = document.getElementById("toinformation");
    let list = JSON.parse(localStorage.getItem("productslistSave")); //Extraigo lista de productos cargada
    for (var i = 0; i < list.length; i++) {
        alertData(i);
        tbody.innerHTML += `<tr><td>${list[i].name}</td><td>${list[i].id}</td><td>${JSON.stringify((list[i].id)).substring(2, 0)}</td><td>$${list[i].price}</td><td  class="${classname}">${list[i].stock}</td><td onclick="deleteData(${i})" id="trash${i}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
       <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
      </svg></td></tr>`;
    }
};

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("ProductDescription").value = "";
    document.getElementById("count").value = "";
    showData();
    localStorage.setItem("totalcompras", JSON.stringify(0)); //Almaceno total de compras y ventas para progreso
    localStorage.setItem("totalventas", JSON.stringify(0));
    document.getElementById("btnIngresar").addEventListener("click", buttonIngresar);

    // $(document).ready(function () {
    //     $(".bi-trash").hover(function () {
    //         $(this).toggleClass("animate__pulse");
    //     });
    //   });

});

const buttonIngresar = () => { //Al cliquear en botón de Guardar

    let tbody = document.getElementById("toinformation");
    let type;
    let IVA;
    let total;
    let subtotal;
    let IVAtype;
    let transactionOK = false;
    let transactioninfo = JSON.parse(localStorage.getItem("transInfo"));
    let idproduct = document.getElementById("ProductDescription").value; //Id del producto
    let count = document.getElementById("count").value;
    let countOk = (count != 0 && count != "NaN" && count > 0);

    let list = JSON.parse(localStorage.getItem("productslistSave")); //Extraigo lista de productos cargada
    let idSearch = findId(idproduct, list); //Almacena el estado del id y la posición del producto correspondiente.

    if (idproduct && countOk && !idSearch[0]) { //Si datos completos de id de producto y cantidad e ID existente.
        subtotal = parseInt(list[idSearch[1]].price) * count;

        //Cálculo del total según IVA
        if (document.getElementById('basico').checked) {
            IVA = 22 / 100 * subtotal;
            IVAtype = document.getElementById('basico').value;
            total = parseInt(subtotal) + IVA;
        } else if (document.getElementById('minimo').checked) {
            IVA = 10 / 100 * subtotal;
            IVAtype = document.getElementById('basico').value;
            total = parseInt(subtotal) + IVA;
        } else {
            IVA = 0;
            IVAtype = document.getElementById('basico').value;
            total = parseInt(subtotal);
        }
        if (document.getElementById('venta').checked) {
            if (list[idSearch[1]].stock - parseInt(count) >= 0) {
                type = document.getElementById('venta').value;
                list[idSearch[1]].stock = list[idSearch[1]].stock - parseInt(count); //Si es una resto cantidad de vendidos
                transactionOK = true;
            } else {
                alert("Stock insuficiente.")
            }
        } else {
            type = document.getElementById('compra').value;
            list[idSearch[1]].stock = list[idSearch[1]].stock + parseInt(count); //Sino sumo
            transactionOK = true;
        }
        if (transactionOK) { //Si se completó la transacción correctamente la almaceno;

            //ALMACENAMIENTO DE LAS TRANSACCIONES
            tbody.innerHTML = "";
            localStorage.setItem("productslistSave", JSON.stringify(list)); //Guardo la nueva vista
            showData();
            var today = new Date();
            var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
            transactioninfo.push({ total: total, IVAtype: IVAtype, product: list[idSearch[1]].name, type: type, date: date, user: localStorage.getItem('user') }); //Agrego la transacción a la lista
            localStorage.setItem("transInfo", JSON.stringify(transactioninfo));
            alert("La transacción se completó correctamente.");
        };

    } else {
        alert("Datos de ID y/o cantidad vacíos o incorrectos.");
        alert("Verifique que el ID ingresado es de un producto existente.")
    }

    function findId(ID, list) { //Función que devuelve true si no hay coincidencias con ID's existentes
        let status = true;
        let index = 0;
        let theindex;
        for (let product of list) {

            if (ID == product.id) {
                status = false;
                theindex = index;
            }
            index += 1;
        }
        return [status, theindex];
    }

};

