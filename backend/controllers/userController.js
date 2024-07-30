import { createUser, getUserByEmail, getUserById, updateUser} from "../models/user";

const createNewUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const newUser = await createUser(email, password, role);

    if (newUser) {
      res
        .status(201)
        .json({ message: "El usuario se ha creado correctamente" });
    } else {
      res.status(500).json({ message: "no se pudo crear el usuario" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el usuario" });
  }
};
const findUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const findUser = await getUserById(id);
    if (findUser) {
      res
        .status(200)
        .json({ message: "Se ha encontrado el usuario correctamente" });
    } else {
      res.status(404).json({ message: "no se ha encontrado el usuario" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal error" });
  }
};

const findUserByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const findUser = await getUserByEmail(email);

    if (findUser) {
      res.status(200).json({ message: "Email encontrado" });
    } else {
      res.status(404).json({ message: "Email not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal error" });
  }
};
const updateThisUser=async (req, res)=>{
    const {id}=req.params;
    const {first_name, last_name,email, password, role, profile_picture}=req.body;
    try {
        const updateThisUser= await  updateUser(id,first_name, last_name, email, password, role, profile_picture);
        if (updateThisUser){
            res.status(200).json({message: "Usuario actualizado correctamente"});
        }else{
            res.status(404).json({message: "Usuario no encontrado"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error interno"});
    }
};
const deleteUser= async (req, res)=>{
    const {id}= req.params
    try {
      const deleteUserById= await deleteUser(id) 
        if (deleteUserById){
            res.status(200).json({message:"Usuario eliminado correctamente"})
        }else{
            res.status(404).json({message:"Usuario no encontrado"})
        };
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"Error interno"})
    }
};
export { createNewUser, findUserById, findUserByEmail, updateThisUser};