document.addEventListener("DOMContentLoaded", () => {
  let content = `<option selected value="0"> Elige una opción </option>`
  let index = 0;
  let categoriesids = [];
  let categorytoproduct;
  let newcategory;
  let categorieslist = JSON.parse(localStorage.getItem("categorieslistSave"));
  for (let item of categorieslist) { //Recorro items en la lista de categorías
    categoriesids[index] = item.idpadre; //Almaceno en lista los id's padres existentes 
    content += `<option value=${item.idpadre}>${item.name}</option>` //Cada categoría se guarda como opción
    index += 1;
  }
  content += `<option value="new">Nueva categoría</option>` //Opción de nueva categoría
  content += `</optgroup>`;
  document.getElementById("tocategories").innerHTML = content;

  document.getElementById("tocategories").addEventListener("change", function () {

    categorytoproduct = document.getElementById("tocategories").value;
    if (categorytoproduct == "new") { //Si nueva categoría entonces espacio para nombre
      newcategory = true;
      document.getElementById("newcategory").innerHTML = `<div class="col-auto">
            <p class="font-weight-bold my-2">Ingrese el nombre de la nueva categoría:</p>
        </div>
        <div class="col-auto">
            <input class="form-control" type="search" id="newCategoryName" style="width:100px">
        </div>`
    } else {
      newcategory = false;
    }
  });


  document.getElementById("btnGuardar").addEventListener("click", function () {
    if (!newcategory) {
      categorytoproduct = document.getElementById("tocategories").value;
    }else{
      categorytoproduct = Math.max.apply(0, categoriesids) + 1;//Asigno como id de categoría al máximo ID más uno
    };
    let listofproducts = JSON.parse(localStorage.getItem("productslistSave"));
    let newname = document.getElementById("newProductName").value;
    let newID = parseInt(categorytoproduct.toString() + document.getElementById("IDnewProduct").value.toString());
    let newminstock = parseInt(document.getElementById("NewminStock").value);
    let newstock = parseInt(document.getElementById("initialCount").value);
    let newcost = parseInt(document.getElementById("newCost").value);
    if (newname && categorytoproduct && newID && newminstock && newstock && newcost) { //Si todos los espacios completos
      if (findId(newID, listofproducts)) { //Si ID no se repite
        listofproducts.push({ id: newID, name: newname, price: newcost, stock: newstock, minstock: newminstock });
        alert("Producto añadido con éxito.");
        localStorage.setItem("productslistSave", JSON.stringify(listofproducts)); //Guardo la nueva vista
        if (newcategory) { //Si la categoría es nueva se almacena como tal
            categorieslist.push({ idpadre: categorytoproduct, name: document.getElementById("newCategoryName").value });
          localStorage.setItem("categorieslistSave", JSON.stringify(categorieslist)); //Guardo la nueva lista de categorías
        }

      } else {
        alert("Ya existe un producto con este ID, ingrese otro.")
      }
    } else {
      alert("Complete todos los campos.");
    }

  });


});
function findId(ID, list) { //Función que devuelve true si no hay coincidencias con ID's existentes
  let status = true;
  for (let product of list) {
    if (ID == product.id) {
      status = false;
    }
  }
  return status;
}

