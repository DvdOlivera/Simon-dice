
function sonidoClickAmarillo(){
    const bleepAmarillo = new Audio();
    bleepAmarillo.src="/sonido-amarillo.wav"
    bleepAmarillo.currentTime = 0;
    bleepAmarillo.play ();
    
};

function sonidoClickAzul(){
    const bleepAzul = new Audio();
    bleepAzul.src="/sonido-azul.wav"
    bleepAzul.currentTime = 0;
    bleepAzul.play ();
    
};

function sonidoClickRojo(){
    const bleepRojo = new Audio();
    bleepRojo.src="/sonido-rojo.wav"
    bleepRojo.currentTime = 0;
    bleepRojo.play ();
    
};

function sonidoClickVerde(){
    const bleepVerde = new Audio();
    bleepVerde.src="/sonido-verde.wav"
    bleepVerde.currentTime = 0;
    bleepVerde.play ();
    
};

function sonidoClickError(){
    const bleepError = new Audio();
    bleepError.src="/sonido-error.wav"
    bleepError.currentTime = 0;
    bleepError.play ();
    
}



document.querySelectorAll(".area").forEach(element => {
    element.addEventListener("click",manejarMovimientoUsuario);
});
document.querySelector("#iniciar-partida").addEventListener("click",iniciarPartida)

function iniciarPartida(){
  deshabilitarBoton()  
  borrarPartidas()
  actualizarContadorDePartidas()
  borrarMovimientosMaquina()  
  ejecutarMaquina();
}
function deshabilitarBoton(){
    document.querySelector("#iniciar-partida").classList.add("deshabilitar-click")
}
function habilitarBoton(){
    document.querySelector("#iniciar-partida").classList.remove("deshabilitar-click")
}

function mostrarMovimientoMaquina(numero) {
    if (numero === 0){
        sonidoClickVerde()
    }
    else if (numero === 1) {
        sonidoClickAmarillo()
    }
    else if (numero === 2) {
        sonidoClickRojo()
    }
    else if (numero === 3) {
        sonidoClickAzul()
    }
    document.querySelectorAll(".area")[numero].classList.remove("desactivo") 
    setTimeout(()=> {
        document.querySelectorAll(".area")[numero].classList.add("desactivo"); 
    }, 300)
}
function borrarPartidas(){
    partidas = 0
}
function retraso(tiempo) {
    return new Promise(resolve =>{
        setTimeout(resolve, tiempo);
    } );
}
let movimientosMaquina = []
let movimientosUsuario = []
let partidas = 0;
async function ejecutarMaquina(){
    deshabilitarClick()
    borrarMovimientosUsuario()
    movimientosMaquina.push(obtenerNumeroAlAzar(0,4));  
    for (let movimiento of movimientosMaquina){
    mostrarMovimientoMaquina(movimiento);
    await retraso(700); 
    };
    habilitarClick();
}

function habilitarClick() {
document.querySelector("#area-de-juego").classList.remove("deshabilitar-click")
};
function deshabilitarClick() {
    document.querySelector("#area-de-juego").classList.add("deshabilitar-click")
};
 function manejarMovimientoUsuario(e){
    
    guardarMovimientoUsuario(e);
    compararMovimientos()

}

function guardarMovimientoUsuario(e){
    if(e.target.classList[1] === "verde"){
        mostrarMovimientoMaquina(0);
        movimientosUsuario.push(0); 
   } else if(e.target.classList[1] === "amarillo"){
        mostrarMovimientoMaquina(1)
       movimientosUsuario.push(1); 
   } else if(e.target.classList[1] === "rojo"){
        mostrarMovimientoMaquina(2)
       movimientosUsuario.push(2); 
   } else if(e.target.classList[1] === "azul"){
        mostrarMovimientoMaquina(3);
       movimientosUsuario.push(3); 
   }
}

function compararMovimientos(){
    let error = false;
    movimientosUsuario.forEach(async (movimiento,i) =>{
        if (movimiento === movimientosMaquina[i]){
       }else{
         error = true;  
         deshabilitarClick();
         sonidoClickError()
         finalizarPartida();
         await retraso(3000); 
         habilitarBoton()
        };

    });

    if(movimientosMaquina.length === movimientosUsuario.length && error === false){
        deshabilitarClick();
        setTimeout(() => {
           partidas++
            actualizarContadorDePartidas(partidas)
            ejecutarMaquina();
        }, 1500);
    };
};
function actualizarContadorDePartidas(partidas = 0){
    document.querySelector("#contador-de-partidas").innerHTML = partidas
}
function finalizarPartida(){
    
    
};

function borrarMovimientosMaquina(){
    movimientosMaquina =[];
};

function borrarMovimientosUsuario(){
    movimientosUsuario =[];
};
function obtenerNumeroAlAzar(min,max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

