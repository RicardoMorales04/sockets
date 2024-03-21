const socket = io();
var mensajeDivP = document.getElementById("mensajeP");
var datosP = document.getElementById("datosP");

////////////////////////////  PRODUCTO          //////////////////////////////////////////////////////////

//MOSTRAR PRODUCTOS DE MONGODB
socket.on("servidorEnviarProductos",(productos)=>{
    var tr = "";
    productos.forEach((producto, idLocal) => {
        tr = tr+`
            <tr>
                <td>${(idLocal+1)*100}</td>
                <td>${producto.nombreP}</td>
                <td>${producto.cantidad}</td>
                <td>${producto.precio}</td>
                <td>
                    <a href="#" onclick="editarProducto('${producto._id}')">Editar</a> / 
                    <a href="#" onclick="borrarProducto('${producto._id}')">Borrar</a>
                </td>
            </tr>
        `;
    });
    datosP.innerHTML = tr;
});

//GUARDAR DATOS A MONGODB

var enviarDatosP = document.getElementById("enviarDatosP");


enviarDatosP.addEventListener("submit",(e) => {
    e.preventDefault();
    var producto ={
        nombreP:document.getElementById("nombreP").value,
        cantidad:document.getElementById("cantidad").value,
        precio:document.getElementById("precio").value,
    }

    socket.emit("clienteGuardarProducto",producto);
    socket.on("servidorProductoGuardado",(mensajeP)=>{
        console.log(mensajeP);
        mensajeDivP.innerHTML = mensajeP;
        setTimeout(()=>{
            mensajeDivP.innerHTML= "";
        },3000);
        //REINICIAR EL FORMULARIO
        document.getElementById("nombreP").value = "";
        document.getElementById("cantidad").value = "";
        document.getElementById("precio").value = "";
        document.getElementById("nombreP").focus();
    });

});

//MODIFICAR UN REGISTRO DE MONGODB
function editarProducto(id){
    console.log(id);
}

//ELIMINAR UN REGISTRO DE MONGODB
function borrarProducto(id){
    console.log(id);
}