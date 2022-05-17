var usuario;
document.addEventListener('DOMContentLoaded', e => { 
    usuario = JSON.parse(localStorage.getItem('usuario'));
    let index = localStorage.getItem('index');
    if (usuario === null){
        window.location.assign("http://127.0.0.1:5500/login.html");
    }
    else{
        console.log(usuario)
    }
    pintarUsuario(index);
    actualizarSaldo();
});

function cerrarSesion(){
    localStorage.clear();
    swal(`Cerrando Sesión`, "Se le redirigirá al login", "info").then((value) => {
        window.location.assign("http://127.0.0.1:5500/login.html");
    });
    
}

function pintarUsuario(index){
    const top_screen = document.querySelector('.top-screen');
    let template = `
        <img src="img/${(Number(index)+1)}.jpg" alt="usuario ${index+1}">
        <h2>${usuario.Nombre}</h2>
    `
    top_screen.innerHTML = template;
}

const botones = document.querySelectorAll('.opcion');
botones.forEach(btn => {
    btn.addEventListener('click', () => {
        const screenShowed = document.querySelector('.show');
        screenShowed.classList.toggle('show');
        const screenSelect = document.querySelector(`.${btn.classList[1]}-container`);
        screenSelect.classList.toggle('show');
    })
})

function ingresarSaldo(){
    let dinero = Number(document.getElementById('ingresar-input').value);
    let dineroActualizado = Number(usuario.Saldo) + dinero;
    if (dineroActualizado <= 990){
        usuario.Saldo = dineroActualizado;
        actualizarSaldo();
        swal(`Monto ingresado = ${dinero}`, `Nuevo saldo en cuenta = ${dineroActualizado}`, "success");
    }
    else{
        swal(`Operación incorrecta`, `Tu saldo actual excedería 990 pesos por $${dineroActualizado-990}`, "error");
    }  
}

function retirarSaldo(){
    let dinero = Number(document.getElementById('retirar-input').value);
    let dineroActualizado = Number(usuario.Saldo) - dinero;
    if (dineroActualizado >= 10){
        usuario.Saldo = dineroActualizado;
        actualizarSaldo();
        swal(`Monto retirado = ${dinero}`, `Nuevo saldo en cuenta = ${dineroActualizado}`, "success");
    }
    else{
        swal(`Operación incorrecta`, "Tu saldo actual sería menor a 10 pesos", "error");
    }  
}

function actualizarSaldo(){
    const saldoElement = document.querySelector('.saldo-p');
    let template = `$${usuario.Saldo}`;
    saldoElement.innerHTML = template;
}