function iluminarCasillerosDisponibles(i,movCartaDiag,movCartaHor,movCartaVer){
    var idDelCuadradoRecibido = i;         
    var casilleroActual = document.getElementById("cuadradoId" + idDelCuadradoRecibido);      
    casilleroActual.disabled = false; 
    //Primero, cambiar los colores del fondo de todo el camp batalla
    for(var j=0; j<campoDeBatalla.length; j++){
    var x = document.getElementById("cuadradoId" + j);          
        x.style.backgroundColor = "#9e9e9ee0";     
    }  
    //habilitar casillero vertical (teniendo en cuenta los limites del tablero) 
    if(idDelCuadradoRecibido != 0 && idDelCuadradoRecibido != 1 && idDelCuadradoRecibido != 2 && idDelCuadradoRecibido != 3 && idDelCuadradoRecibido != 4 && idDelCuadradoRecibido != 5 && idDelCuadradoRecibido != 6 && idDelCuadradoRecibido != 7 &&idDelCuadradoRecibido != 8 ){  
        //Casos especiales cuando la pieza se puede mover mas de 1 casillero y estaria "teletransportandose" sin estas condiciones:
        var tempVar = movCartaVer;
        if((idDelCuadradoRecibido == 9 || idDelCuadradoRecibido == 10 || idDelCuadradoRecibido == 11 || idDelCuadradoRecibido == 12 || idDelCuadradoRecibido == 13 || idDelCuadradoRecibido == 14 || idDelCuadradoRecibido == 15 || idDelCuadradoRecibido == 16 || idDelCuadradoRecibido == 17) && movCartaVer > 1){movCartaVer -= 1;}
        for(var w=0; w<movCartaVer; w++){
            var chequearExistencia = "cuadradoId" + (idDelCuadradoRecibido - (9 * (movCartaVer - w)));         
            if (typeof(chequearExistencia) != 'undefined' && chequearExistencia != null && !(chequearExistencia<0)){            
                var casilleroDisponibleVertical = document.getElementById("cuadradoId" + (idDelCuadradoRecibido - (9 * (movCartaVer - w))));
                casilleroDisponibleVertical.style.backgroundColor = "rgb(85 223 85 / 47%)";                 
            }
        }
    movCartaVer = tempVar;
    }
    if(idDelCuadradoRecibido != 72 && idDelCuadradoRecibido != 73 && idDelCuadradoRecibido != 74 && idDelCuadradoRecibido != 75 && idDelCuadradoRecibido != 76 && idDelCuadradoRecibido != 77 && idDelCuadradoRecibido != 78 && idDelCuadradoRecibido != 79 &&idDelCuadradoRecibido != 80 ){          
        //Casos especiales cuando la pieza se puede mover mas de 1 casillero y estaria "teletransportandose" sin estas condiciones:
        var tempVar = movCartaVer;
        if((idDelCuadradoRecibido == 63 || idDelCuadradoRecibido == 64 || idDelCuadradoRecibido == 65 || idDelCuadradoRecibido == 66 || idDelCuadradoRecibido == 67 || idDelCuadradoRecibido == 68 || idDelCuadradoRecibido == 69 || idDelCuadradoRecibido == 70 || idDelCuadradoRecibido == 71) && movCartaVer > 1){movCartaVer -= 1;}
        for(var w=0; w<movCartaVer; w++){   
            var chequearExistencia = "cuadradoId" + (idDelCuadradoRecibido + (9 * (movCartaVer - w)));    
            if (typeof(chequearExistencia) != 'undefined' && chequearExistencia != null && !(chequearExistencia<0)){      
                var casilleroDisponibleVertical = document.getElementById("cuadradoId" + (idDelCuadradoRecibido + (9 * (movCartaVer - w))));
                casilleroDisponibleVertical.style.backgroundColor = "rgb(85 223 85 / 47%)";                  
            }
        }
    movCartaVer = tempVar;
    }   
    //habilitar casillero horizontal (teniendo en cuenta los limites del tablero) 
    if(idDelCuadradoRecibido != 8 && idDelCuadradoRecibido != 17 && idDelCuadradoRecibido != 26 && idDelCuadradoRecibido != 35 && idDelCuadradoRecibido != 44 && idDelCuadradoRecibido != 53 && idDelCuadradoRecibido != 62 && idDelCuadradoRecibido != 71 &&idDelCuadradoRecibido != 80 ){    
        //Casos especiales cuando la pieza se puede mover mas de 1 casillero y estaria "teletransportandose" sin estas condiciones:
        var tempVar = movCartaHor;
        if((idDelCuadradoRecibido == 7 || idDelCuadradoRecibido == 16 || idDelCuadradoRecibido == 25 || idDelCuadradoRecibido == 34 || idDelCuadradoRecibido == 43 || idDelCuadradoRecibido == 52 || idDelCuadradoRecibido == 61 || idDelCuadradoRecibido == 70 || idDelCuadradoRecibido == 79) && movCartaHor > 1){movCartaHor -= 1;}
        for(var w=0; w<movCartaHor; w++){ 
            var chequearExistencia = "cuadradoId" + (idDelCuadradoRecibido + (movCartaHor - w)); 
            if (typeof(chequearExistencia) != 'undefined' && chequearExistencia != null && !(chequearExistencia<0)){    
                var casilleroDisponibleHorizontal = document.getElementById("cuadradoId" + (idDelCuadradoRecibido + (movCartaHor - w)));
                casilleroDisponibleHorizontal.style.backgroundColor = "rgb(85 223 85 / 47%)";                
            }  
        }
    movCartaHor = tempVar;
    }    
    if(idDelCuadradoRecibido != 0 && idDelCuadradoRecibido != 9 && idDelCuadradoRecibido != 18 && idDelCuadradoRecibido != 27 && idDelCuadradoRecibido != 36 && idDelCuadradoRecibido != 45 && idDelCuadradoRecibido != 54 && idDelCuadradoRecibido != 63 &&idDelCuadradoRecibido != 72 ){
        //Casos especiales cuando la pieza se puede mover mas de 1 casillero y estaria "teletransportandose" sin estas condiciones:
        var tempVar = movCartaHor;
        if((idDelCuadradoRecibido == 1 || idDelCuadradoRecibido == 10 || idDelCuadradoRecibido == 19 || idDelCuadradoRecibido == 28 || idDelCuadradoRecibido == 37 || idDelCuadradoRecibido == 46 || idDelCuadradoRecibido == 55 || idDelCuadradoRecibido == 64 || idDelCuadradoRecibido == 73) && movCartaHor > 1){movCartaHor -= 1;}
        for(var w=0; w<movCartaHor; w++){  
            var chequearExistencia = "cuadradoId" + (idDelCuadradoRecibido - (movCartaHor - w)); 
            if (typeof(chequearExistencia) != 'undefined' && chequearExistencia != null && !(chequearExistencia<0)){           
                var casilleroDisponibleHorizontal = document.getElementById("cuadradoId" + (idDelCuadradoRecibido - (movCartaHor - w)));
                casilleroDisponibleHorizontal.style.backgroundColor = "rgb(85 223 85 / 47%)";                
            }  
        } 
    movCartaHor = tempVar;    
    }
    //habilitar casilleros diagonales (teniendo en cuenta los limites del tablero) 
    //los de arriba
        for(var w=0; w<movCartaDiag; w++){
            var chequearExistencia = ((idDelCuadradoRecibido - 1 * movCartaDiag) - (9 * (1 * movCartaDiag - w) - w)); 
            var chequearExistencia2 = ((idDelCuadradoRecibido + 1 * movCartaDiag) - (9 * (1 * movCartaDiag - w) + w)); 
            var tempVar = movCartaDiag;
            if(idDelCuadradoRecibido != 0 && idDelCuadradoRecibido != 1 && idDelCuadradoRecibido != 2 && idDelCuadradoRecibido != 3 && idDelCuadradoRecibido != 4 && idDelCuadradoRecibido != 5 && idDelCuadradoRecibido != 6 && idDelCuadradoRecibido != 7 && idDelCuadradoRecibido != 8 ){
            //Arriba izquierda
            //evitar teletransportacion:
                if(idDelCuadradoRecibido == 18 || idDelCuadradoRecibido == 27 || idDelCuadradoRecibido == 36 || idDelCuadradoRecibido == 45 || idDelCuadradoRecibido == 54 || idDelCuadradoRecibido == 63|| idDelCuadradoRecibido == 72){  movCartaDiag = 0; }
                if(idDelCuadradoRecibido == 28|| idDelCuadradoRecibido == 37|| idDelCuadradoRecibido == 46||idDelCuadradoRecibido == 55 || idDelCuadradoRecibido == 73 || idDelCuadradoRecibido == 64){  movCartaDiag = 1; }
                            if ((chequearExistencia != null) && !(chequearExistencia<0) && idDelCuadradoRecibido != 72 ){            
                                var casilleroDisponibleDiagonal = document.getElementById("cuadradoId" + ((idDelCuadradoRecibido - 1 * movCartaDiag) - (9 * (1 * movCartaDiag - w) - w)));
                                casilleroDisponibleDiagonal.style.backgroundColor = "rgb(85 223 85 / 47%)";                                   
                            }
                movCartaDiag = tempVar;   
            //Arriba derecha
            if(idDelCuadradoRecibido == 79 || idDelCuadradoRecibido == 16 || idDelCuadradoRecibido == 25  || idDelCuadradoRecibido == 34|| idDelCuadradoRecibido == 35 || idDelCuadradoRecibido == 43 || idDelCuadradoRecibido == 52 || idDelCuadradoRecibido == 61 || idDelCuadradoRecibido == 70){  movCartaDiag = 1; }
            if(idDelCuadradoRecibido == 17 || idDelCuadradoRecibido == 26|| idDelCuadradoRecibido == 35|| idDelCuadradoRecibido == 44|| idDelCuadradoRecibido == 53 ||  idDelCuadradoRecibido == 62 ||idDelCuadradoRecibido == 71 || idDelCuadradoRecibido == 80){  movCartaDiag = 0; }
                            if (typeof(chequearExistencia2) != 'undefined' && chequearExistencia2 != null && !(chequearExistencia2<0) ){
                                var casilleroDisponibleDiagonal2 = document.getElementById("cuadradoId" + ((idDelCuadradoRecibido + 1 * movCartaDiag) - (9 * (1 * movCartaDiag - w) + w)));
                               if(idDelCuadradoRecibido != 80){
                                   casilleroDisponibleDiagonal2.style.backgroundColor = "rgb(85 223 85 / 47%)";
                               }
                                 
                            }  
            movCartaDiag = tempVar; 
            }                           
        }  
    //los de abajo
        for(var w=0; w<movCartaDiag ; w++){  
            var casilleroDisponibleDiagonal = ((idDelCuadradoRecibido - 1  * movCartaDiag ) + (9 * (1 * movCartaDiag - w )  + w)); 
            var casilleroDisponibleDiagonal2 = ((idDelCuadradoRecibido + 1 * movCartaDiag) + (9 * (1 * movCartaDiag - w ) - w));  
            var tempVar = movCartaDiag;
            if(idDelCuadradoRecibido != 72 && idDelCuadradoRecibido != 73 && idDelCuadradoRecibido != 74 && idDelCuadradoRecibido != 75 && idDelCuadradoRecibido != 76 && idDelCuadradoRecibido != 77 && idDelCuadradoRecibido != 78 && idDelCuadradoRecibido != 79 && idDelCuadradoRecibido != 80 ){ 
                            //Abajo Izquierda
                         //evitar teletransportacion:
            if(idDelCuadradoRecibido == 1 || idDelCuadradoRecibido == 10 || idDelCuadradoRecibido == 19|| idDelCuadradoRecibido == 28|| idDelCuadradoRecibido == 37||idDelCuadradoRecibido == 46|| idDelCuadradoRecibido == 55||idDelCuadradoRecibido == 64 ){  movCartaDiag = 1; }                
            if( idDelCuadradoRecibido == 9 ||idDelCuadradoRecibido == 18 || idDelCuadradoRecibido == 27 || idDelCuadradoRecibido == 36 || idDelCuadradoRecibido == 45 || idDelCuadradoRecibido == 54 || idDelCuadradoRecibido == 63 ||  idDelCuadradoRecibido == 72){  movCartaDiag = 0; }                       
                            if (typeof(casilleroDisponibleDiagonal) != 'undefined' && casilleroDisponibleDiagonal != null && idDelCuadradoRecibido != 0 && !(casilleroDisponibleDiagonal>80)){            
                                var casilleroDisponibleDiagonal = document.getElementById("cuadradoId" + ((idDelCuadradoRecibido - 1  * movCartaDiag ) + (9 * (1 * movCartaDiag - w )  + w)));
                                casilleroDisponibleDiagonal.style.backgroundColor = "rgb(85 223 85 / 47%)";                                   
                            }
            movCartaDiag = tempVar;                   
                        //Abajo Derecha 
                        if( idDelCuadradoRecibido == 8 || idDelCuadradoRecibido == 17 || idDelCuadradoRecibido == 26 || idDelCuadradoRecibido == 35 || idDelCuadradoRecibido == 44 || idDelCuadradoRecibido == 53 || idDelCuadradoRecibido == 62|| idDelCuadradoRecibido == 71){  movCartaDiag = 0; }                                   
                        if(idDelCuadradoRecibido == 7 || idDelCuadradoRecibido == 16 || idDelCuadradoRecibido == 25 ||  idDelCuadradoRecibido == 34 || idDelCuadradoRecibido == 43 || idDelCuadradoRecibido == 52 ){  movCartaDiag = 1; }   
                            if (typeof(casilleroDisponibleDiagonal2) != 'undefined' && casilleroDisponibleDiagonal2 != null && !(casilleroDisponibleDiagonal2>80) ){
                                var casilleroDisponibleDiagonal2 = document.getElementById("cuadradoId" + ((idDelCuadradoRecibido + 1 * movCartaDiag) + (9 * (1 * movCartaDiag - w ) - w)));
                                casilleroDisponibleDiagonal2.style.backgroundColor = "rgb(85 223 85 / 47%)";                                 
                            }
            movCartaDiag = tempVar;  
            }                
        }        
}