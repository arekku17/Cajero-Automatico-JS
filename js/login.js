class Cuenta {
    constructor(nombre, saldo, password){
        this.Nombre = nombre;
        this.Saldo = saldo;
        this.Password = password;
    }
}

let cuenta1 = new Cuenta('Alejandro', 200, 'gatitos123');
let cuenta2 = new Cuenta('Laura', 400, 'maruchan');
let cuenta3 = new Cuenta('Martin', 100, 'itto10');
let cuentas = [cuenta1,cuenta2,cuenta3];
let cuentaActual = 0;

document.addEventListener('DOMContentLoaded', e => { 
    pintarCuentas();
    pintarLogin(cuentaActual);

    let btnCuentas = document.querySelectorAll(".cuenta");
    btnCuentas.forEach((btn, index) => {
        btn.addEventListener('click', () =>
        {
            btnSelected = document.querySelector('.selected');
            btnSelected.classList.toggle('selected');
            btn.classList.toggle('selected');
            cuentaActual = index;
            pintarLogin(cuentaActual);
        })
    })
});


function pintarCuentas(){
    let ctnr_cuentas = document.querySelector(".container-cuentas");
    let template = '';
    cuentas.forEach((user, index) => {
        template += `
            <article class="cuenta cuenta${index+1} ${index == 0 ? 'selected' : ''}">
            <img src="img/${index+1}.jpg" alt="foto perfil ${index+1}">
            <p>${user.Nombre}</p>
            </article>
        `;
    })
    ctnr_cuentas.innerHTML = template;
}

function pintarLogin(index){
    const cuenta_top = document.querySelector('.cuenta-top');
    template = `
        <img src="img/${index+1}.jpg" alt="foto perfil ${index}">
        <p>${cuentas[index].Nombre}</p>
    `
    cuenta_top.innerHTML = template;
}

function validarLogin(){
    const input = document.getElementById('inputPassword5').value;
    // Si no está vacio realizar
    if(input !== ''){
        if (input === cuentas[cuentaActual].Password){
            swal("Bienvenido", "Ingresaste a tu cuenta", "success").then((value) => {
                localStorage.setItem('usuario', JSON.stringify(cuentas[cuentaActual]));
                localStorage.setItem('index', cuentaActual);
                window.location.assign("http://127.0.0.1:5500/index.html");
              });;
        }
        else{
            swal("Rayos", "Te equivocaste de contraseña", "error");
        }
    }
    else{
        swal("Vaya...", "No has ingresado contraseña", "warning");
    }
}


