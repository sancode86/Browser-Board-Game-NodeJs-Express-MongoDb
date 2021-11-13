

var lugaresDisponibles = [];
var ubicacionCartasJugador = [];
var ubicacionCartasCpu = [];

function ia(){
  
    accionesTurnoCpu = 5;
    accionesTurnoPj = 5;   
    while(accionesTurnoCpu != 0){    
        lugaresDisponibles = [];
        ubicacionCartasJugador = [];
        ubicacionCartasCpu = [];
        
        console.log("Inteligencia Artificial Básica | 'IAB1.0'");
        levantarCartasCpu();
        mirarElTablero();
        ponerCartasAlAzarCpu();   
        mirarElTablero();
        movimientosPosiblesSegunCartasEnTableroCpu();     
        dibujarTableroConCartasActuales();
        moverCartasAlAzarCpu();
    }
    //Termina el turno de la ia, pasa turno y pasar al siguiente round
   
    pasarDeTurno();    
    actualizarNumeroDeRound();   
           
}
function ponerCartasAlAzarCpu(){
    console.log("Poniendo cartas (CPU)");
    for(var j=0; j<manoCpu.length; j++){ 
        if(accionesTurnoCpu != 0){   
          
                dibujarTableroConCartasActuales();
                var casilleroRandomDisponibleElegido = lugaresDisponibles[Math.floor(Math.random() * lugaresDisponibles.length)];    
                var casilleroEnCampoDeBatalla = campoDeBatalla[casilleroRandomDisponibleElegido].carta;      
                var cartaAUsarCPU = manoCpu.pop();                 
                casilleroEnCampoDeBatalla.push(cartaAUsarCPU);
                campoDeBatalla[casilleroRandomDisponibleElegido].ocupadaCPU = 1; 

                console.log("Hello World");
                
                
                //El efecto de "poner una carta"
                var efectoBoton = document.getElementById("cuadradoId" + casilleroRandomDisponibleElegido);
                if (campoDeBatalla[casilleroRandomDisponibleElegido].bonoAtaqueTerreno == 1){
                    efectoBoton.setAttribute("class", "cuadrado animate__bounceIn");}else{
                        efectoBoton.setAttribute("class", "cuadrado2 animate__bounceIn");  
                    }            
                    
       
            accionesTurnoCpu = accionesTurnoCpu - 1; 
            dibujarTableroConCartasActuales();  
        }
    }
}
function moverCartasAlAzarCpu(){
    console.log("Moviendo cartas (CPU)");
    var verdaderasUbicacionesLibres= [];
    if(accionesTurnoCpu != 0 && manoCpu.length == 0 && mazoCpu.length == 0){   
   
            dibujarTableroConCartasActuales();
            ubicacionCartaAchequearMovimientosCpu = ubicacionCartasCpu[Math.floor(Math.random() * ubicacionCartasCpu.length)];         
            var infoCartaEnTableroAChequearMovimientosCpu = campoDeBatalla[ubicacionCartaAchequearMovimientosCpu].carta[0];
            var movCartaDiag = infoCartaEnTableroAChequearMovimientosCpu.casillerosMovimientoDiagonal;
            var movCartaHor = infoCartaEnTableroAChequearMovimientosCpu.casillerosMovimientoHorizontal;
            var movCartaVer = infoCartaEnTableroAChequearMovimientosCpu.casillerosMovimientoVertical;
            var arrayConMovimientosDisponiblesSegunCarta = mostrarMovimientosDisponiblesCpu(ubicacionCartaAchequearMovimientosCpu,movCartaDiag,movCartaHor,movCartaVer);

            //Limpiar del array los casilleros ocupados por CPU o PJ:           
            verdaderasUbicacionesLibres = arrayConMovimientosDisponiblesSegunCarta.filter(d => !ubicacionCartasCpu.includes(d));
            var proximaUbicacionCpuAzar = verdaderasUbicacionesLibres[Math.floor(Math.random() * verdaderasUbicacionesLibres.length)];
            console.log("Carta de la CPU en", ubicacionCartaAchequearMovimientosCpu, " se mueve a ", proximaUbicacionCpuAzar);  
                       
            var x = campoDeBatalla[ubicacionCartaAchequearMovimientosCpu].carta;
            var z = campoDeBatalla[proximaUbicacionCpuAzar].carta;    
            z.push(x[0]);          
        
            campoDeBatalla[ubicacionCartaAchequearMovimientosCpu].carta = [];
            campoDeBatalla[ubicacionCartaAchequearMovimientosCpu].ocupadaCPU = 0;            
            campoDeBatalla[proximaUbicacionCpuAzar].ocupadaCPU = 1;
            console.log(campoDeBatalla);
            accionesTurnoCpu = accionesTurnoCpu - 1; 

            //El efecto de "poner una carta"
            var efectoBoton = document.getElementById("cuadradoId" + ubicacionCartaAchequearMovimientosCpu);
         

            if (campoDeBatalla[ubicacionCartaAchequearMovimientosCpu].bonoAtaqueTerreno == 1){
                efectoBoton.setAttribute("class", "cuadrado animate__bounceIn");}else{
                    efectoBoton.setAttribute("class", "cuadrado2 animate__bounceIn");  
                }  
    
            var efectoBoton = document.getElementById("cuadradoId" + proximaUbicacionCpuAzar);
            if (campoDeBatalla[proximaUbicacionCpuAzar].bonoAtaqueTerreno == 1){
                efectoBoton.setAttribute("class", "cuadrado animate__bounceIn");}else{
                    efectoBoton.setAttribute("class", "cuadrado2 animate__bounceIn");  
                } 

            dibujarTableroConCartasActuales();  
      

       
    }
}
function mirarElTablero(){
    console.log("Mirando el tablero (CPU)");
    dibujarTableroConCartasActuales();
//Fijarse como esta el tablero en esta mano
//"resetear" de la mano anterior para poner los nuevos valores
    for(var i=0; i<campoDeBatalla.length; i++){
        if(campoDeBatalla[i].ocupadaPJ == 1){
            ubicacionCartasJugador.push(i);
        }
        if(campoDeBatalla[i].ocupadaCPU == 1){
            ubicacionCartasCpu.push(i);
        }
        if(campoDeBatalla[i].ocupadaPJ == 0 && campoDeBatalla[i].ocupadaCPU == 0 && campoDeBatalla[i].baseCPU != 1 && campoDeBatalla[i].basePj != 1){
            lugaresDisponibles.push(i);
        }
    }
}
function levantarCartasCpu(){
     //Primero levantar las cartas, si es "5" la cantidad del mazoCpu, copia todo y borralo.
    //Porque sino genera problemas a la hora de hacer un push y un splice
if(manoCpu.length == 0 && mazoCpu.length != 0){
    if(mazoCpu.length == 5){
        manoCpu = [...mazoCpu];
        mazoCpu = [];
    }else{
        for(var i=0; i<5; i++){
            manoCpu.push(mazoCpu[i]);
            mazoCpu.splice(i,1);
        }
    }
} 
}
function movimientosPosiblesSegunCartasEnTableroCpu(){
   var banderaHuboGuerra = 0;
    console.log("Buscando movimientos disponibles (CPU)");
    if(ubicacionCartasCpu.length != 0  && banderaHuboGuerra == 0){
        //fijarse si hay cartas de la CPU puestas, de haber, mirar sus movimientos posibles
              for(var j=0; j<ubicacionCartasCpu.length; j++){
                  if(banderaHuboGuerra == 0){                    
                  var ubicacionCartaAchequearMovimientosCpu = ubicacionCartasCpu[j];
                  var infoCartaEnTableroAChequearMovimientosCpu = campoDeBatalla[ubicacionCartasCpu[j]].carta[0];
                  var movCartaDiag = infoCartaEnTableroAChequearMovimientosCpu.casillerosMovimientoDiagonal;
                  var movCartaHor = infoCartaEnTableroAChequearMovimientosCpu.casillerosMovimientoHorizontal;
                  var movCartaVer = infoCartaEnTableroAChequearMovimientosCpu.casillerosMovimientoVertical;
                  var arrayConMovimientosDisponiblesSegunCarta = mostrarMovimientosDisponiblesCpu(ubicacionCartaAchequearMovimientosCpu,movCartaDiag,movCartaHor,movCartaVer);
                  }  

                  console.log("Buscando ataques Base PJ..."); 
                //atacar base si es posible ?
                    for(var w=0; w<arrayConMovimientosDisponiblesSegunCarta.length;w++ ){
                        if(arrayConMovimientosDisponiblesSegunCarta[w] == 76 && accionesTurnoCpu != 0 ){
                            console.log("La carta en ", ubicacionCartaAchequearMovimientosCpu," ataca BASE");
                            var cartaAtacante = ubicacionCartaAchequearMovimientosCpu;
                            var baseAtacada = 76;
                            cpuAtacaBasePj(cartaAtacante, baseAtacada);  
                            accionesTurnoCpu = accionesTurnoCpu - 1;   
                                                    
                        }
                    }

                  //chequear si el rango de ataque de la carta actual podria atacar a una del Pj
                  
                  if(ubicacionCartasJugador.length != 0 && accionesTurnoCpu != 0){
                        for(var w=0; w<arrayConMovimientosDisponiblesSegunCarta.length;w++ ){
                            if(banderaHuboGuerra == 0 ){
                                            for(var t=0; t<ubicacionCartasJugador.length;t++ ){
                                                
                                                if(arrayConMovimientosDisponiblesSegunCarta[w] == 76 && banderaHuboGuerra == 0 ){
                                                    console.log("La carta en ", ubicacionCartaAchequearMovimientosCpu," ataca BASE");
                                                    var cartaAtacante = ubicacionCartaAchequearMovimientosCpu;
                                                    var baseAtacada = 76;
                                                    cpuAtacaBasePj(cartaAtacante, baseAtacada);  
                                                    accionesTurnoCpu = accionesTurnoCpu - 1;   
                                                    banderaHuboGuerra = 1;                             
                                                }

                                                if(arrayConMovimientosDisponiblesSegunCarta[w] == ubicacionCartasJugador[t] && banderaHuboGuerra == 0 && accionesTurnoCpu != 0){
                                                    console.log("La carta (de la CPU) en", ubicacionCartaAchequearMovimientosCpu);
                                                    console.log("Ataca a la carta en ", ubicacionCartasJugador[t]," del jugador." );
                                                    var cartaAtacante = ubicacionCartaAchequearMovimientosCpu;
                                                    var cartaAtacada = ubicacionCartasJugador[t];
                                                    cpuAtacaCarta(cartaAtacante, cartaAtacada);
                                                    banderaHuboGuerra = 1;
                                                    accionesTurnoCpu = accionesTurnoCpu - 1;
                                                    dibujarTableroConCartasActuales();
                                                }else{
                                                    console.log("Ubicación chequeada, no hay ataques posibles.")
                                                }
                            
                                            }
                            }
                        }

                    }

                }
    }
  
}
function cpuAtacaBasePj(cartaAtacante, baseAtacada){
    var efectoBlink = document.getElementById("cuadradoId" + cartaAtacante);    
    if (campoDeBatalla[cartaAtacante].bonoAtaqueTerreno == 1){
    efectoBlink.setAttribute("class", "cuadrado blinking");}else{
        efectoBlink.setAttribute("class", "cuadrado2 blinking");  
    }   
    var efectoBlink2 = document.getElementById("cuadradoId" + baseAtacada);
    if (campoDeBatalla[baseAtacada].bonoAtaqueTerreno == 1){
    efectoBlink2.setAttribute("class", "cuadrado blinking");}else{
        efectoBlink2.setAttribute("class", "cuadrado2 blinking");  
    } 
    var infoCarta = campoDeBatalla[cartaAtacante].carta; 
    console.log("la base Pj fue atacada con un daño de",  (parseInt(infoCarta[0].ataqueCarta) +  parseInt(infoCarta[0].stickerAtaque) + campoDeBatalla[cartaAtacante].bonoAtaqueTerreno));
    vidaPJ = vidaPJ - (parseInt(infoCarta[0].ataqueCarta) +  parseInt(infoCarta[0].stickerAtaque) + campoDeBatalla[cartaAtacante].bonoAtaqueTerreno);
}
function cpuAtacaCarta(cartaAtacante, cartaAtacada){
    var efectoBlink = document.getElementById("cuadradoId" + cartaAtacante);
    efectoBlink.setAttribute("class", "");

    if (campoDeBatalla[cartaAtacante].bonoAtaqueTerreno == 1){
        efectoBlink.setAttribute("class", "cuadrado blinking");}else{
            efectoBlink.setAttribute("class", "cuadrado2 blinking");  
        } 
  

    var efectoBlink2 = document.getElementById("cuadradoId" + cartaAtacada);
    efectoBlink2.setAttribute("class", "");
    if (campoDeBatalla[cartaAtacada].bonoAtaqueTerreno == 1){
        efectoBlink2.setAttribute("class", "cuadrado blinking");}else{
            efectoBlink2.setAttribute("class", "cuadrado2 blinking");  
        } 
  

    var infoCartaAtacante = campoDeBatalla[cartaAtacante].carta;
    var infoCartaAtacada = campoDeBatalla[cartaAtacada].carta;

    var infoCartaAtacanteTotalAtaque = (parseInt(infoCartaAtacante[0].ataqueCarta) +  parseInt(infoCartaAtacante[0].stickerAtaque) + campoDeBatalla[cartaAtacante].bonoAtaqueTerreno);   
    var infoCartaAtacadaTotalAtaque = (parseInt(infoCartaAtacada[0].ataqueCarta) +  parseInt(infoCartaAtacada[0].stickerAtaque) + campoDeBatalla[cartaAtacada].bonoAtaqueTerreno);
   
    var infoCartaAtacanteTotalDefensa = (parseInt(infoCartaAtacante[0].defensaCarta) +  parseInt(infoCartaAtacante[0].stickerDefensa) + campoDeBatalla[cartaAtacante].bonoDefensaTerreno);   
    var infoCartaAtacadaTotalDefensa = (parseInt(infoCartaAtacada[0].defensaCarta) +  parseInt(infoCartaAtacada[0].stickerDefensa)+ campoDeBatalla[cartaAtacada].bonoDefensaTerreno);
   
    infoCartaAtacanteTotalDefensa = infoCartaAtacanteTotalDefensa - infoCartaAtacadaTotalAtaque;
    infoCartaAtacadaTotalDefensa = infoCartaAtacadaTotalDefensa - infoCartaAtacanteTotalAtaque;

    infoCartaAtacante = infoCartaAtacanteTotalDefensa - infoCartaAtacadaTotalAtaque;
    infoCartaAtacada = infoCartaAtacadaTotalDefensa - infoCartaAtacanteTotalAtaque;

    if(infoCartaAtacanteTotalDefensa <= 0){
        console.log("murio carta cpu");
        console.log( infoCartaAtacante);
        campoDeBatalla[cartaAtacante].carta = [];
        campoDeBatalla[cartaAtacante].ocupadaCPU = 0;      
    }
    if(infoCartaAtacadaTotalDefensa <= 0){
        console.log("murio carta Pj");
        console.log( infoCartaAtacada);
        campoDeBatalla[cartaAtacada].carta = [];        
        campoDeBatalla[cartaAtacada].ocupadaPJ = 0;
    }

}
function pjAtacaCpu(cartaAtacante, cartaAtacada,informacionSobreCuadradoProcedenciaCarta){
    var efectoBlink = document.getElementById("cuadradoId" + cartaAtacada);
    efectoBlink.setAttribute("class", "");
   
    if (campoDeBatalla[cartaAtacada].bonoAtaqueTerreno == 1){
        efectoBlink.setAttribute("class", "cuadrado blinking");}else{
            efectoBlink.setAttribute("class", "cuadrado2 blinking");  
        } 

    var efectoBlink2 = document.getElementById("cuadradoId" + informacionSobreCuadradoProcedenciaCarta);
    efectoBlink2.setAttribute("class", "");
  
    if (campoDeBatalla[informacionSobreCuadradoProcedenciaCarta].bonoAtaqueTerreno == 1){
        efectoBlink2.setAttribute("class", "cuadrado blinking");}else{
            efectoBlink2.setAttribute("class", "cuadrado2 blinking");  
        } 

    var infoCartaAtacante = cartaAtacante[0];
    var infoCartaAtacada = campoDeBatalla[cartaAtacada].carta;

    var infoCartaAtacanteTotalAtaque = (parseInt(infoCartaAtacante.ataqueCarta) +  parseInt(infoCartaAtacante.stickerAtaque) + campoDeBatalla[informacionSobreCuadradoProcedenciaCarta].bonoAtaqueTerreno);   
    var infoCartaAtacadaTotalAtaque = (parseInt(infoCartaAtacada[0].ataqueCarta) +  parseInt(infoCartaAtacada[0].stickerAtaque) + campoDeBatalla[informacionSobreCuadradoProcedenciaCarta].bonoAtaqueTerreno);
   
    var infoCartaAtacanteTotalDefensa = (parseInt(infoCartaAtacante.defensaCarta) +  parseInt(infoCartaAtacante.stickerDefensa) + campoDeBatalla[informacionSobreCuadradoProcedenciaCarta].bonoDefensaTerreno);   
    var infoCartaAtacadaTotalDefensa = (parseInt(infoCartaAtacada[0].defensaCarta) +  parseInt(infoCartaAtacada[0].stickerDefensa) + campoDeBatalla[informacionSobreCuadradoProcedenciaCarta].bonoDefensaTerreno);
   
    infoCartaAtacanteTotalDefensa = infoCartaAtacanteTotalDefensa - infoCartaAtacadaTotalAtaque ;
    infoCartaAtacadaTotalDefensa = infoCartaAtacadaTotalDefensa - infoCartaAtacanteTotalAtaque;

    infoCartaAtacante = infoCartaAtacanteTotalDefensa - infoCartaAtacadaTotalAtaque;
    infoCartaAtacada = infoCartaAtacadaTotalDefensa - infoCartaAtacanteTotalAtaque;

    if(infoCartaAtacanteTotalDefensa <= 0){
        console.log("murio carta pj");
        console.log( infoCartaAtacante);
        campoDeBatalla[informacionSobreCuadradoProcedenciaCarta].carta = [];
        campoDeBatalla[informacionSobreCuadradoProcedenciaCarta].ocupadaPJ = 0;      
    }
    if(infoCartaAtacadaTotalDefensa <= 0){
        console.log("murio carta cpu");
        console.log( infoCartaAtacada);
        campoDeBatalla[cartaAtacada].carta = [];        
        campoDeBatalla[cartaAtacada].ocupadaCPU = 0;
    }

}