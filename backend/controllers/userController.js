import { createUser, getUserByEmail, getUserById, updateUser, deleteUser } from "../models/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const { JWT_SECRET } = process.env;
const createNewUser = async (req, res) => {
    const { first_name, last_name, email, password, role, profile_picture, cv } = req.body;

    try {
        const newUser = await createUser(first_name, last_name, email, password, role, profile_picture, cv);
        res.status(201).json({ message: "El usuario se ha creado correctamente", userId: newUser });
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
            res.status(200).json(findUser);
        } else {
            res.status(404).json({ message: "No se ha encontrado el usuario" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno" });
    }
};
async function registerUser(first_name, last_name, email, password, role, profile_picture, cv) {
  if (!first_name || !last_name || !email || !password || !role) {
      throw new Error('Missing required fields');
  }

  try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const [result] = await pool.execute(
          "INSERT INTO users (first_name, last_name, email, password, role, profile_picture, cv, created_at, updated_at) VALUES (?,?,?,?,?,?,?,NOW(),NOW())",
          [first_name, last_name, email, hashedPassword, role, profile_picture, cv]
      );
      return result.insertId;
  } catch (error) {
      console.error('Error registering user:', error);
      throw error;
  }
}
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
      const user = await getUserByEmail(email);

      if (user && await bcrypt.compare(password, user.password)) {
          const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
          res.json({ token });
      } else {
          res.status(401).json({ message: 'Email o contraseña incorrectos' });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error interno" });
  }
};
const findUserByEmail = async (req, res) => {
    const { email } = req.params;
    try {
        const findUser = await getUserByEmail(email);
        if (findUser) {
            res.status(200).json(findUser);
        } else {
            res.status(404).json({ message: "Email no encontrado" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno" });
    }
};

const updateThisUser = async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email, password, role, profile_picture, cv } = req.body;

    try {
        const updated = await updateUser(id, first_name, last_name, email, password, role, profile_picture, cv);
        if (updated) {
            res.status(200).json({ message: "Usuario actualizado correctamente" });
        } else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno" });
    }
};

const deleteThisUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await deleteUser(id);
        if (deleted) {
            res.status(200).json({ message: "Usuario eliminado correctamente" });
        } else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno" });
    }
};

export { createNewUser, findUserById,loginUser, registerUser, findUserByEmail, updateThisUser, deleteThisUser };
