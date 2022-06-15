let contenido = document.querySelector("#contenido")
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

    resultado = document.querySelector("#resultado");
    resultado.innerText = "Comenzó el juego";
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
        resultado.innerText = "Perdiste, inténtalo de nuevo";
        mostrarPalabra();
    }
}
function obtenerPalabra() {
    let tamanio = palabras.length;
    if(tamanio == 0) { return; }
    let index = Math.floor(Math.random() * tamanio);
    return palabras[index];
}
function guardarPalabra() {
    let input = document.querySelector("#entrada");
    let palabra = input.value;
    if((/^[a-zA-ZñÑ]{4,8}$/).test(palabra)) {
        if(!palabras.includes(palabra.toUpperCase())) {
            palabras.push(palabra.toUpperCase());
            alert("La palabra se agregó");
            iniciarJuego();
        } else {
            alert("La palabra ya está en la ista");
        }
    } else {
        alert("La palabra no se pudo agregar, verifique que sean entre 4 y 8 letras, sin números ni símbolos");
    }
}
function mostrarPalabra() {
    adivinando = "";
    for(let i = 0; i < palabra.length; i++) {
        adivinando +=  palabra[i] + " ";
    }
    let letrasAdivinadas = document.querySelector("#letras-adivinadas");
    letrasAdivinadas.innerText = adivinando;
}
function mostrarInicio() {
    $("#contenido").css("justify-content", "space-between");
    contenido.innerHTML = `
        <button id="btn-start" class="btn-custom" onclick="iniciarJuego()">Iniciar Juego</button>
        <button id="btn-addword" class="btn-custom btn-inverse" onclick="mostrarGuardarPalabra()">Agregar nueva palabra</button>
    `;
}

function mostrarGuardarPalabra() {
    // $("#contenido").css("justify-content", "space-between");
    contenido.innerHTML = `
        <input type="text" id="entrada" placeholder="Ingrese una palabra">
        <div id="div-botones">
            <button id="btn-guardar" onclick="guardarPalabra()" class="btn-custom m-1">Guardar y empezar</button>
            <button id="btn-cancelar" onclick="mostrarInicio()" class="btn-custom btn-inverse m-1">Cancelar</button>
        </div>
    `;
    let entrada = document.querySelector("#entrada");
    entrada.focus();
}
function mostrarJuego(adivinando) {
    contenido.innerHTML = `
        <div id="juego">
            <div id="resultado">
            </div>
            <canvas width=310 height=310>
            </canvas>
            <div id="letras-adivinadas">
            ${adivinando}
            </div>
            <div id="letras-descartadas">
            </div>
            <input type=text id="mobile-input" min-length=1 max-length=1 size=1>
            <div id="div-botones">
                <button id="btn-nuevo" onclick="reiniciarJuego()" class="btn-custom m-1">Nuevo Juego</button>
                <button id="btn-rendirse" onclick="rendirse()" class="btn-custom btn-inverse m-1">Desistir</button>
            </div>
        </div>
    `;

    dibujarAhorcado(cuentaErrores);
    
    let mobileInput = document.querySelector("#mobile-input");
    mobileInput.oninput = function() {
        let entrada = mobileInput.value;
        let letra = mobileInput.value = entrada[entrada.length - 1].toUpperCase();
        if(juegoIniciado) {
            ingresoTeclado(letra);
        }
    }
    window.addEventListener("keypress", function(e) {
        if(juegoIniciado) {
            let letra = e.key.toUpperCase();
            ingresoTeclado(letra);
        }
    });
}
function ingresoTeclado(letra) {
    // si no es una letra, no se hace nada
    if(!(/^[a-zA-ZñÑ]$/).test(letra)) {
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
        } else {
            resultado = document.querySelector("#resultado");
            resultado.innerText = "Acertaste la letra " + letra;
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
            } else {
                resultado = document.querySelector("#resultado");
                resultado.innerText = "La letra " + letra + " no está";
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