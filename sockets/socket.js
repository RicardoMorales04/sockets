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
                if(usuario.id==""){
                    await new Usuario(usuario).save();
                    io.emit("servidorUsuarioGuardado","Usuario Guardado");
                }
                else{
                    await Usuario.findByIdAndUpdate(usuario.id,usuario);
                    io.emit("servidorUsuarioGuardado","Usuario modificado");
                }
                mostrarUsuarios();
            }
            catch(err){
                console.log("Error al registra el usuario "+err);
            }
        });

        //OBTENER USUARIO POR ID
        socket.on("clienteObtenerUsuarioPorID",async (id)=>{
            const usuario = await Usuario.findById(id);
            io.emit("servidorObtenerUsuarioPorID",usuario);
        })

        //BORRAR USUARIO POR ID
        socket.on("clienteBorrarUsuario",async (id)=>{
            await Usuario.findByIdAndDelete(id);
            io.emit("servidorUsuarioGuardado","Usuario Borrado");
            mostrarUsuarios();
        })


        

//////////////////////////////          PRODUCTO              ////////////////////////////////////////////
        
        //MOSTRAR PRODUCTOS
        mostrarProductos();
        async function mostrarProductos(){
            const productos = await Producto.find();
            io.emit("servidorEnviarProductos", productos);
        }
        
        //GUARDAR PRODUCTO
        socket.on("clienteGuardarProducto", async (producto)=>{
            try{
                if(producto.id==""){
                    await new Producto(producto).save();
                    io.emit("servidorProductoGuardado","Producto Guardado");
                    mostrarProductos();
                }
                else{
                    await Producto.findByIdAndUpdate(producto.id,producto);
                    io.emit("servidorProductoGuardado","Producto modificado");
                }
                mostrarProductos();
            }
            catch(err){
                console.log("Error al registra el Producto "+err);
            }
        });

        //OBTENER PRODUCTO POR ID
        socket.on("clienteObtenerProductoPorID",async (id)=>{
            const producto = await Producto.findById(id);
            io.emit("servidorObtenerProductoPorID",producto);
        })

        //BORRAR PRODUCTO POR ID
        socket.on("clienteBorrarProducto",async (id)=>{
            await Producto.findByIdAndDelete(id);
            io.emit("servidorProductoGuardado","Producto Borrado");
            mostrarProductos();
        })

        
    });//FIN io.on
}

module.exports = socket;