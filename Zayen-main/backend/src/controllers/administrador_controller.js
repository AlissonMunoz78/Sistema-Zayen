import Administrador from "../models/administrador.js"

const registro = async (req,res)=>{
    const {email,password} = req.body
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    const verificarEmailBDD = await Administrador.findOne({email})
    if(verificarEmailBDD) return res.status(400).json({msg:"Lo sentimos, el email ya se encuentra registrado"})
    const nuevoAdministrador = new Veterinario(req.body)
    nuevoAdministrador.password = await nuevoAdministrador.encrypPassword(password)

    const token = nuevoAdministrador.crearToken()
    await sendMailToRegister(email,token)
    await nuevoAdministrador.save()
    res.status(200).json({msg:"Revisa tu correo electrónico para confirmar tu cuenta ;)"})

    nuevoAdministrador.crearToken()
    await nuevoAdministrador.save()
    res.status(200).json({nuevoAdministrador})

    
}

const confirmarMail = async (req,res)=>{
    const token = req.params.token
    const administradorBDD = await Administrador.findOne({token})
    if(!administradorBDD?.token) return res.status(404).json({msg:"Su cuenta ya fue confirmada."})
    administradorBDD.token = null
    administradorBDD.confirmEmail=true
    await administradorBDD.save()
    res.status(200).json({msg:"Confirmación realizada, puede iniciar sesión!"}) 
}

export {
    registro,
    confirmarMail,
}
