// primero que nada---> el area de juego se tiene que matener en opacidad 0.3, salvo cuando se muestre  la secuencia
//  de  movimientos o se haga click ( mientras no se muestre la secuencia de movimientos)
// al hacer click en "iniciar" generará una secuencia  de movimientos con 1 movimiento
// la secuencia de movimientos tiene que ser al azar y tiene que ser GUARDADA
// luego de eso MOSTRAR  la secuencia de movimientos GUARDADA, con un intervalo de tiempo entre cada movimiento.
// luego de MOSTRAR ,  actualizar el estado de juego  y pedir al usuario
// que  repita la secuencia.
// GUARDAR la secuencia de Usuario y  luego COMPARAR con la secuencia guardada
// si no coincide, actualizar el estado de juego, y si sugerir  resetear ( no se muy bien como voy a parar el evento)
// si coincide, generar 1 secuencia mas y luego agregarla a la secuencia anterior previamente guardada.
document.querySelectorAll(".area").forEach(element => {
    element.addEventListener("click",guardarMovimientoUsuario);
});
document.querySelector("#iniciar-partida").addEventListener("click",iniciarJuego)
function iniciarJuego(){

//console.log(numeroAlAzar)

//creo que falta algo

ejecutarMaquina();


}


function activacionTemporaria(numero) {
    document.querySelectorAll(".area")[numero].classList.remove("desactive") //saca la propiedad opacidad: 0.3
    setTimeout(()=> {
        document.querySelectorAll(".area")[numero].classList.add("desactive"); //le agrega la opacidad: 0.3
    }, 300)
}

function retraso(tiempo) {

    return new Promise(resolve =>{
        setTimeout(resolve, tiempo);
    } );
}
const movimientosMaquina = []
let movimientosUsuario = []
async function ejecutarMaquina(){
    movimientosMaquina.push(obtenerNumeroAlAzar(0,4));  
    for (let movimiento of movimientosMaquina){
    activacionTemporaria(movimiento);
    await retraso(1000); 

   /* for (let movimiento of movimientosMaquina){
        try{
        activacionTemporaria(movimiento);
        await retraso(2000); 
     }
       catch{
        console.log(movimiento)
       }*/
       
}
      
    /*movimientosMaquina.map(( numero )=>{
           
         setTimeout(()=>{
             activacionTemporaria(numero);
         }, 2000); 
            
      
    })*/



    

   habilitarEleccion();
 
};




function habilitarEleccion() {

    

}
 function guardarMovimientoUsuario(e){
    
    if(e.target.classList[1] === "verde"){
         activacionTemporaria(0);
         movimientosUsuario.push(0); 
    } else if(e.target.classList[1] === "amarillo"){
        activacionTemporaria(1)
        movimientosUsuario.push(1); 
    } else if(e.target.classList[1] === "rojo"){
        activacionTemporaria(2)
        movimientosUsuario.push(2); 
    } else if(e.target.classList[1] === "azul"){
        activacionTemporaria(3);
        movimientosUsuario.push(3); 
    }



 compararMovimientos()

}
function compararMovimientos(){
    movimientosMaquina.forEach((movimiento,i) =>{
        console.log(movimiento)
        console.log(movimientosUsuario[i])
        if (movimiento === movimientosUsuario[i]){
            console.log("bien")
        }else{
            console.log("mal")
        }

    })

    console.log(movimientosMaquina)
  

}
function borrarMovimientosUsuario(){
    movimientosUsuario =[]
}
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