let camposSinValidar = document.querySelectorAll('.campo_no_validado');
let mensajeError = document.querySelectorAll('span');
let mensajeEnvio = document.querySelector('p');

const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,120}$/,
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9-,]+$/,
    telefono: /^([0-9\s\-\.]){11}$/,
    dni: /^[0-9]{8}[a-zA-Z]+$/,
    letrasDNI: 'TRWAGMYFPDXBNJZSQVHLCKE'.split('')
}

const campos = {
    nombre: false,
    correo: false,
    telefono: false,
    dni: false
}

camposSinValidar.forEach((campo) =>{
    campo.addEventListener('keyup', validarFormulario);
    campo.addEventListener('blur', validarFormulario);
});

function validarFormulario(e){
    // console.log(e.target.name);
    switch(e.target.name){
        case 'nombre':
            validarCampo(expresiones.nombre, e.target, 0);
            break;
        case 'correo':
            validarCampo(expresiones.correo, e.target, 1);
            break;
        case 'telefono':
            validarCampo(expresiones.telefono, e.target, 2);
            break;
        case 'dni':
            validarDni(expresiones.dni, e.target, 3);
            break;
    }
};

function validarCampo(expresion, entrada, numero){
    // console.log(entrada.value);
    if(expresion.test(entrada.value)){
        // console.log(`${entrada.value} validada`);
        mensajeError[numero].innerHTML = '';
        mensajeError[numero].removeAttribute('class', 'error');
        campos[entrada.name] = true;
    }else{
        // console.log(`${entrada.value} no validada`);
        mensajeError[numero].innerHTML = '+ Introduzca un valor correcto';
        mensajeError[numero].setAttribute('class', 'error');
    }
};

function validarDni(expresion, entrada, numero){
    if (expresion.test(entrada.value)){
        // console.log(`${entrada.value} validada`);
        let numeroDni = entrada.value.slice(0,8);
        let letraDni = entrada.value.slice(-1);
        let resto = numeroDni % 23;
        if (letraDni.toUpperCase() === expresiones.letrasDNI[resto]){
            mensajeError[numero].innerHTML = '';
            mensajeError[numero].removeAttribute('class', 'error');
            campos[entrada.name] = true;
        }
    }else{
        // console.log(`${entrada.value} no validada`);
        mensajeError[numero].innerHTML = '+ Introduzca un valor correcto';
        mensajeError[numero].setAttribute('class', 'error');
    }
}

document.querySelector('input[type="submit"]').addEventListener('click', (e) =>{
    e.preventDefault();
    // console.log(campos.nombre);
    // console.log(campos.correo);
    // console.log(campos.telefono);
    // console.log(campos.dni);
    if (campos.nombre && campos.correo && campos.telefono && campos.dni){
        mensajeEnvio.innerHTML = 'MENSAJE ENVIADO CON ÉXITO';
        setTimeout(() =>{
            mensajeEnvio.innerHTML = '';
            document.formulario.submit();
        }, 2000);
    }else{
        mensajeEnvio.innerHTML = 'REVISE LOS CAMPOS DE SU FORMULARIO!!!';
    }
});