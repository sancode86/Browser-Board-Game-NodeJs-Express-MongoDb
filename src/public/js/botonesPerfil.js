
var delay = ( function() {
var timer = 0;
return function(callback, ms) {
clearTimeout (timer);
timer = setTimeout(callback, ms);
};
})();

function verInventario(){
    sonidoBoton();
    delay(function(){
        var idUsuarioAPasar = document.getElementById("idUsuario").value;        
        console.log(idUsuarioAPasar);
        window.location.href = "/inventario/" + idUsuarioAPasar;
    }, 100 ); // end delay
}

function volverPerfil(){
    sonidoBoton();
    delay(function(){
        window.location.href = "/profile";
    }, 100 ); // end delay   
}

function verGaleriaJugador(){
    sonidoBoton();
    delay(function(){
        window.location.href = "/galeria";
    }, 100 ); // end delay
}

function apostar(){
    sonidoBoton();
    delay(function(){
        var idUsuarioAPasar = document.getElementById("idUsuario").value;        
        console.log(idUsuarioAPasar);
        window.location.href = "/apostar/" + idUsuarioAPasar;  
    }, 100 ); // end delay  
}

function tienda(){
    sonidoBoton();
    delay(function(){
        var idUsuarioAPasar = document.getElementById("idUsuario").value;        
        console.log(idUsuarioAPasar);
        window.location.href = "/tienda/" + idUsuarioAPasar;
    }, 100 ); // end delay
}


function botonEnviarInventario(){
    delay(function(){
        document.getElementById("formInventario").submit();
    }, 100 ); // end delay 
}

function jugar(){
    sonidoBoton();
    delay(function(){
        var idUsuarioAPasar = document.getElementById("idUsuario").value; 
        window.location.href = "/jugar/" + idUsuarioAPasar;
    }, 100 ); // end delay
}