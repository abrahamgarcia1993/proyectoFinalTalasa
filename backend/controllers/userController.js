import {createUser} from '../models/user'

const createNewUser= async (req, res)=>{
    const {email, password, role}=req.body

    try {
        const newUser= await createUser(email, password,role)

        if(newUser){
            res.status(201).json({message:"El usuario se ha creado correctamente"})
        }else{
            res.status(500).json({message:"no se pudo crear el usuario"})
        }
        
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"Error al crear el usuario"})
    }
}

export {createNewUser}