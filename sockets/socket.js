const Usuario = require("../modelos/usuario")
const Producto = require("../modelos/producto")

function socket(io){
    io.on("connection",(socket) =>{
        //MOSTRAR USUARIOS
        mostrarUsuarios();
        async function mostrarUsuarios(){
            const usuarios = await Usuario.find();
            io.emit("servidorEnviarUsuarios", usuarios);
        }
        
        //GUARDAR USUARIO
        socket.on("clienteGuardarUsuario", async (usuario)=>{
            try{
            await new Usuario(usuario).save();
            io.emit("servidorUsuarioGuardado","Usuario Guardado");
            }
            catch(err){
                console.log("Error al registra el usuario "+err);
            }
        });

        ///////////// PRODUCTO /////////////////
        
        //MOSTRAR PRODUCTOS
        mostrarProductos();
        async function mostrarProductos(){
            const productos = await Producto.find();
            io.emit("servidorEnviarProductos", productos);
        }
        
        //GUARDAR PRODUCTO
        socket.on("clienteGuardarProducto", async (producto)=>{
            try{
            await new Producto(producto).save();
            io.emit("servidorProductoGuardado","Producto Guardado");
            }
            catch(err){
                console.log("Error al registra el producto "+err);
            }
        });
    });//FIN io.on
}

module.exports = socket;