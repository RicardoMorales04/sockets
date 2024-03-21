const {mongoose} = require("../bd/conexion");
const productoSchema = new mongoose.Schema({
    nombreP:{
        type:String,
        require:true
    },
    cantidad:{
        type:String,
        require:true
    },
    precio:{
        type:String,
        require:true
    },
    estatus:{
        type:Boolean,
        default:true
    }

});

module.exports = mongoose.model("producto",productoSchema);