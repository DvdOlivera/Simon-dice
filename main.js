function ejecutarSonido (colorArea){
    
        if (colorArea === "rojo" ){
            const bleepRojo = new Audio();
            bleepRojo.src="sounds/sonido-rojo.wav";
            bleepRojo.currentTime = 0;
            bleepRojo.play (); 
        }
        else if (colorArea === "verde" ){
            const bleepVerde = new Audio();
            bleepVerde.src="sounds/sonido-verde.wav";
            bleepVerde.currentTime = 0;
            bleepVerde.play ();
        }
        else if (colorArea === "azul" ){
            const bleepAzul = new Audio();
            bleepAzul.src="sounds/sonido-azul.wav";
            bleepAzul.currentTime = 0;
            bleepAzul.play ();
        }
        else if (colorArea === "amarillo" ){
            const bleepAmarillo = new Audio();
            bleepAmarillo.src="sounds/sonido-amarillo.wav";
            bleepAmarillo.currentTime = 0;
            bleepAmarillo.play ();
        };
    
}

function sonidoClickError(){
    const bleepError = new Audio();
    bleepError.src="sounds/sonido-error.wav";
    bleepError.currentTime = 0;
    bleepError.play ();   
};

document.querySelectorAll(".area").forEach(element => {
    element.addEventListener("click",manejarMovimientoUsuario);
});
document.querySelector("#boton-iniciar-partida").addEventListener("click",iniciarPartida);
   
function iniciarPartida(){
  inhabilitarBoton();  
  actualizarContadorDeTurnos(0);
  borrarMovimientosMaquina();  
  ejecutarMaquina();
};

function borrarTextoPartida(){
    document.querySelector("#resultado-partida-actual").innerHTML= "";
};

function inhabilitarBoton(){
    document.querySelector("#contenedor-boton").classList.add("inhabilitado");
    document.querySelector("#boton-iniciar-partida").classList.add("deshabilitar-click");
};

function habilitarBoton(){
    document.querySelector("#contenedor-boton").classList.remove("inhabilitado");
    document.querySelector("#boton-iniciar-partida").classList.remove("deshabilitar-click");
};

function mostrarMovimiento(numero) {
   document.querySelectorAll(".area")[numero].classList.remove("desactivo") 
    setTimeout(()=> {
        document.querySelectorAll(".area")[numero].classList.add("desactivo"); 
    }, 300);
};

function retraso(tiempo) {
    return new Promise(resolve =>{
        setTimeout(resolve, tiempo);
    } );
}
const movimientosMaquina = [];
const movimientosUsuario = [];

async function ejecutarMaquina(){
    deshabilitarClick();
    borrarTextoPartida();
    borrarMovimientosUsuario();
    movimientosMaquina.push(obtenerNumeroAlAzar(0,4));  
    await manejarMovimientoMaquina(movimientosMaquina)
    habilitarClick();
};
async function manejarMovimientoMaquina(movimientosMaquina){
    for (let movimiento of movimientosMaquina){    
        if (movimiento === 0){
            ejecutarSonido("verde");
        }
        else if (movimiento === 1){
            ejecutarSonido("amarillo");
        }
        else if (movimiento === 2){
            ejecutarSonido("rojo");
        }
        else if (movimiento === 3){
            ejecutarSonido("azul");
        }
        mostrarMovimiento(movimiento);
        await retraso(700); 
        };
}
function habilitarClick() {
document.querySelector("#area-de-juego").classList.remove("deshabilitar-click");
};
function deshabilitarClick() {
    document.querySelector("#area-de-juego").classList.add("deshabilitar-click");
};
 function manejarMovimientoUsuario(e){
    ejecutarSonido(e.target.classList[1])
    guardarMovimientoUsuario(e);
    compararMovimientos();

};

function guardarMovimientoUsuario(e){
 const colorArea = e.target.classList[1];

    if(colorArea === "verde"){
        
        mostrarMovimiento(0);
        movimientosUsuario.push(0); 
   } else if(colorArea === "amarillo"){
        mostrarMovimiento(1)
       movimientosUsuario.push(1); 
   } else if(colorArea === "rojo"){
        mostrarMovimiento(2)
        movimientosUsuario.push(2); 
   } else if(colorArea === "azul"){
        mostrarMovimiento(3);
       movimientosUsuario.push(3); 
   };
};

function compararMovimientos(){
    let resultado = true;
    movimientosUsuario.forEach(async (movimiento,i) =>{
        if (movimiento === movimientosMaquina[i]){
       }else{
         resultado = false; 
         imprimirResultado(resultado)
         deshabilitarClick();
         sonidoClickError();
         await retraso(2000); 
         habilitarBoton()
        };

    });

    if(movimientosMaquina.length === movimientosUsuario.length && resultado === true){
        imprimirResultado(resultado);
        deshabilitarClick();
        setTimeout(() => {
            actualizarContadorDeTurnos(movimientosMaquina.length);
            ejecutarMaquina();
        }, 1500);
    };
};
function actualizarContadorDeTurnos(turno){
    document.querySelector("#contador-de-turnos").innerHTML = turno;
};

function borrarMovimientosMaquina(){
    movimientosMaquina.splice(0, movimientosMaquina.length);
};

function borrarMovimientosUsuario(){
    movimientosUsuario.splice(0, movimientosUsuario.length);
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
     };
 }; 

 function pintarResultado(color){
    document.querySelector("#resultado-partida-actual").style.color = color
 };
  
