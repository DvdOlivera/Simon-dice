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
    await retraso(1000); 
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
    movimientosUsuario.forEach((movimiento,i) =>{
        if (movimiento === movimientosMaquina[i]){
       }else{
            error = true;
               setTimeout(() => {
                finalizarPartida();
                deshabilitarClick();
                habilitarBoton()
               }, 0);
            };

    });

    if(movimientosMaquina.length === movimientosUsuario.length && error === false){
        deshabilitarClick();
        setTimeout(() => {
           partidas++
            actualizarContadorDePartidas(partidas)
            ejecutarMaquina();
        }, 2000);
    };
};
function actualizarContadorDePartidas(partidas = 0){
    document.querySelector("#contador-de-partidas").innerHTML = partidas
}
function finalizarPartida(){
    alert("perdiste");
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


function mostrarAlertaTurno(turno){

    if(turno===true){
        document.querySelector(".turno").innerHTML="es tu turno!"
    }
    if(turno===false){
        document.querySelector(".turno").innerHTML=" turno de la maquina!"
    }
};

//  transform: perspective( 700px ) rotateX( 45deg );