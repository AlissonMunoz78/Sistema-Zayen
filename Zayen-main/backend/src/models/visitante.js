import {Schema, model} from 'mongoose'
import bcrypt from "bcryptjs"

const visitanteSchema = new Schema({
    nombre:{
        type:String,
        require:true,
        trim:true
    },
    apellido:{
        type:String,
        require:true,
        trim:true
    },
    institucion:{
        type:String,
        require:true
    },
    token:{
        type:String,
        default:null
    },
    rol:{
        type:String,
        default:"visitante"
    }

},{
    timestamps:true
})

// Método para cifrar el password del administrador
visitanteSchema.methods.encrypPassword = async function(password){
    const salt = await bcrypt.genSalt(10)
    const passwordEncryp = await bcrypt.hash(password,salt)
    return passwordEncryp
}


// Método para verificar si el password ingresado es el mismo de la BDD
visitanteSchema.methods.matchPassword = async function(password){
    const response = await bcrypt.compare(password,this.password)
    return response
}


// Método para crear un token 
visitanteSchema.methods.crearToken = function(){
    const tokenGenerado = this.token = Math.random().toString(36).slice(2)
    return tokenGenerado
}


export default model('Visitante',visitanteSchema)