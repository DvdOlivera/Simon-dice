
function sonidoClickAmarillo(){
    const bleepAmarillo = new Audio();
    bleepAmarillo.src="sounds/sonido-amarillo.wav"
    bleepAmarillo.currentTime = 0;
    bleepAmarillo.play ();
    
};

function sonidoClickAzul(){
    const bleepAzul = new Audio();
    bleepAzul.src="sounds/sonido-azul.wav"
    bleepAzul.currentTime = 0;
    bleepAzul.play ();
    
};

function sonidoClickRojo(){
    const bleepRojo = new Audio();
    bleepRojo.src="sounds/sonido-rojo.wav"
    bleepRojo.currentTime = 0;
    bleepRojo.play ();
    
};

function sonidoClickVerde(){
    const bleepVerde = new Audio();
    bleepVerde.src="sounds/sonido-verde.wav"
    bleepVerde.currentTime = 0;
    bleepVerde.play ();
    
};

function sonidoClickError(){
    const bleepError = new Audio();
    bleepError.src="sounds/sonido-error.wav"
    bleepError.currentTime = 0;
    bleepError.play ();
    
}

document.querySelectorAll(".area").forEach(element => {
    element.addEventListener("click",manejarMovimientoUsuario);
});
document.querySelector("#boton-iniciar-partida").addEventListener("click",iniciarPartida)
   
function iniciarPartida(){
  ocultarBoton()  
  borrarTurnos()
  actualizarContadorDeTurnos()
  borrarMovimientosMaquina()  
  ejecutarMaquina();
}

function borrarTextoPartida(){
    document.querySelector("#resultado-partida-actual").innerHTML= ""
}
function ocultarBoton(){
    document.querySelector("#contenedor-boton").classList.add("inhabilitado")
    document.querySelector("#boton-iniciar-partida").classList.add("deshabilitar-click")
}
function mostrarBoton(){
    document.querySelector("#contenedor-boton").classList.remove("inhabilitado")
    document.querySelector("#boton-iniciar-partida").classList.remove("deshabilitar-click")
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
function borrarTurnos(){
    turnos = 0
}
function retraso(tiempo) {
    return new Promise(resolve =>{
        setTimeout(resolve, tiempo);
    } );
}
let movimientosMaquina = []
let movimientosUsuario = []
let turnos = 0;

async function ejecutarMaquina(){
    deshabilitarClick()
    borrarTextoPartida()
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
    let resultado = true;
    movimientosUsuario.forEach(async (movimiento,i) =>{
        if (movimiento === movimientosMaquina[i]){
       }else{
         resultado = false; 
         imprimirResultado(resultado)
         deshabilitarClick();
         sonidoClickError()
         await retraso(3000); 
         mostrarBoton()
        };

    });

    if(movimientosMaquina.length === movimientosUsuario.length && resultado === true){
        imprimirResultado(resultado)
        deshabilitarClick();
        setTimeout(() => {
           turnos++
           console.log(turnos)
            actualizarContadorDeTurnos(turnos)
            ejecutarMaquina();
        }, 1500);
    };
};
function actualizarContadorDeTurnos(turnos = 0){
    document.querySelector("#contador-de-turnos").innerHTML = turnos
}

function borrarMovimientosMaquina(){
    movimientosMaquina =[];
};

function borrarMovimientosUsuario(){
    movimientosUsuario =[];
};
function obtenerNumeroAlAzar(min,max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

 function imprimirResultado(resultado){
     if (resultado === true){
         pintarResultado("rgb(30, 255, 0)");
         document.querySelector("#resultado-partida-actual").innerHTML= "Bien Hecho!"
     }
     else if (resultado=== false ){
         pintarResultado("rgb(255, 60, 60)");
        document.querySelector("#resultado-partida-actual").innerHTML= "Perdiste! Mejor suerte la próxima"
     }
 } 

 function pintarResultado(color){
    document.querySelector("#resultado-partida-actual").style.color = color
 }

