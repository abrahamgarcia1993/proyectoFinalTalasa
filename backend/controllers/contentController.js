import {
  createContent,
  deleteContent,
  getContentById,
  updateContent,
} from "../models/content";

const createNewContent = async (req, res) => {
  const { title, description, content_url } = req.body;
  try {
    const newContent = await createContent(title, description, content_url);
    if (newContent) {
      res
        .status(201)
        .json({ message: "El contenido se ha creado correctamente" });
    } else {
      res.status(400).json({ message: " todos los campos son requeridos" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno" });
  }
};

const findContentById = async (req, res) => {
  const { id } = req.params;

  try {
    const newContentById = await getContentById(id);
    if (newContentById) {
      res
        .status(200)
        .json({ message: "El contenido se ha encontrado correctamente" });
    } else {
      res.status(404).json({ message: "El contenido no se ha encontrado" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Interno" });
  }
};

const updateContentById = async (req, res) => {
  const { id } = req.params;
  const { title, description, content_url } = req.body;

  try {
    const updateNewContent = await updateContent(
      id,
      title,
      description,
      content_url
    );
    if (updateNewContent) {
      res
        .status(200)
        .json({ message: "El contenido se ha actualizado correctamente" });
    } else {
      res.status(404).json({ message: "El contenido no se ha encontrado" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno" });
  }
};
const deleteContentById = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteContentId = await deleteContent(id);
    if (deleteContentId) {
      res.status(200).json({ message: "Se ha eliminado correctamente" });
    } else {
      res.status(404).json({ message: "No se ha encontrado el contenido" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno" });
  }
};
export {
  createNewContent,
  findContentById,
  updateContentById,
  deleteContentById,
};
