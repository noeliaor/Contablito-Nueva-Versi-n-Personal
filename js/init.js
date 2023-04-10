
document.addEventListener("DOMContentLoaded", () => {
  let user = localStorage.getItem('user');
  document.getElementsByClassName("site-header sticky-top py-1")[0].innerHTML = `<nav class="navbar navbar-expand-lg navbar-dark bg-dark" >
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link"  style="color: white;padding-right: 80px;padding-left:80px" href="index.html">Inventario</a>
      </li>
      <li class="nav-item">
        <a class="nav-link"  style="color: white;padding-right: 80px;padding-left:80px" href="productsmanagement.html">Gestión de productos</a>
      </li>
      <li class="nav-item">
        <a class="nav-link"  style="color: white;padding-right: 80px;padding-left:80px"" href="transactions.html">Historial de transacciones</a>
      </li>
      <li class="nav-item">
        <a class="nav-link"  style="color: white;padding-right: 8s0px;padding-left:80px" href="users.html">Gestión de usuarios</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle"  style="color: white;padding-right: 80px;padding-left:80px" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        ${user} 
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a class="dropdown-item" href="login.html" id="ToLogin">Cerrar sesión</a>
        </div>
      </li>
    </ul>
  </div>
</nav>`
});