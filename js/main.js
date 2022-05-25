let principal = document.querySelector("#principal")
let juegoIniciado = false;
let palabra;
let cantidadLetras;
let adivinando;
let errores;
let cuentaErrores;

mostrarInicio();

function iniciarJuego() {
    adivinando = "";
    errores = "";
    cuentaErrores = 0;
    palabra = obtenerPalabra().toUpperCase();
    
    if(palabra == false) { return };
    
    cantidadLetras = palabra.length;
    juegoIniciado = true;

    for(let i = 0; i < cantidadLetras; i++) {
        adivinando += "_ ";
    }

    mostrarJuego(adivinando);
}
function reiniciarJuego() {
    if(juegoIniciado == false || confirm("Hay un juego empezado, ¿desea dejarlo y empezar de nuevo?")) {
        iniciarJuego();
    }
}
function rendirse() {
    if(juegoIniciado == false || confirm("¿Desea salir del juego?")) {
        juegoIniciado = false;
        mostrarInicio();
    }
}
function terminarJuego() {
    juegoIniciado = false;
    resultado = document.querySelector("#resultado");
    if(cuentaErrores < 9) {
        resultado.innerText = "¡Ganaste, felicidades!";
    } else {
        resultado.innerText = "El juego se terminó";
    }
}
function obtenerPalabra() {
    let tamanio = palabras.length;
    if(tamanio == 0) {
        return;
    }
    let index = Math.floor(Math.random() * tamanio);
    return palabras[index];
}
function guardarPalabra() {
    let input = document.querySelector("#entrada");
    let palabra = input.value;
    if((/[a-zA-ZñÑ]{4,8}/).test(palabra)) {
        palabras.push(palabra.toUpperCase());
        alert("La palabra se agregó");
        iniciarJuego();
    } else {
        alert("La palabra no se pudo agregar, verifique que sean entre 4 y 8 letras, sin números ni símbolos");
    }
}
function mostrarInicio() {
    $("#principal").css("justify-content", "center");
    principal.innerHTML = `
    <a href="https://www.aluracursos.com/" alt="Sitio web de Alura"><img class="logo" src="img/Logo.png" alt="Logo de Alura"></a>
        <button id="btn-start" onclick="iniciarJuego()">Iniciar Juego</button>
        <button id="btn-addword" onclick="mostrarGuardarPalabra()">Agregar nueva palabra</button>
    `;
}

function mostrarGuardarPalabra() {
    $("#principal").css("justify-content", "space-around");
    principal.innerHTML = `
        <input type="text" id="entrada" placeholder="Ingrese una palabra">
        <div id="div-botones">
            <button id="btn-guardar" onclick="guardarPalabra()" class="btn btn-primary btn-custom m-1">Guardar y empezar</button>
            <button id="btn-cancelar" onclick="mostrarInicio()" class="btn btn-primary  btn-custom m-1">Cancelar</button>
        </div>
    `;
}
function mostrarJuego(adivinando) {
    principal.innerHTML = `
        <canvas width=400 height=400>
        </canvas>
        <div id="resultado">
        </div>
        <div id="letras-adivinadas">
        ${adivinando}
        </div>
        <div id="letras-descartadas">
        </div>
        <div id="div-botones">
            <button id="btn-nuevo" onclick="reiniciarJuego()" class="btn btn-primary btn-custom m-1">Nuevo Juego</button>
            <button id="btn-rendirse" onclick="rendirse()" class="btn btn-primary btn-custom m-1">Desistir</button>
        </div>
    `;

    dibujarAhorcado(cuentaErrores);

    window.addEventListener("keypress", function(e) {
        if(juegoIniciado) {
            let letra = e.key.toUpperCase();
            ingresoTeclado(letra);
        }
    });
}
function ingresoTeclado(letra) {
    // si no es una letra, no se hace nada
    if(!(/[a-zA-Z]/).test(letra)) {
        return;
    }
    if(palabra.includes(letra)) {
        let letrasAdivinadas = document.querySelector("#letras-adivinadas");
        let adivinando = letrasAdivinadas.innerText;
        let index = palabra.indexOf(letra);
        while(index != -1) {
            adivinando = adivinando.replaceAt(index * 2, letra);
            index = palabra.indexOf(letra, index + 1)
        }
        letrasAdivinadas.innerText = adivinando;
        if(adivinando.includes("_") == false) {
            terminarJuego();
        }
    } else {
        let letrasDescartadas = document.querySelector("#letras-descartadas");
        let errores = letrasDescartadas.innerText;
        if(!errores.includes(letra)) {
            cuentaErrores++;
            errores += " " + letra;
            letrasDescartadas.innerText = errores;
            dibujarAhorcado(cuentaErrores);
            if(cuentaErrores == 9) {
                terminarJuego();
            }
        }
    }
}

// Se agrega esta función al prototipo de String para usarla como si ya viniera incluida
String.prototype.replaceAt = function(index, replacement) {
    if (index >= this.length) {
        return this.valueOf();
    }
    return this.substring(0, index) + replacement + this.substring(index + 1);
}