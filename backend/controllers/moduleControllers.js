// controllers/moduleController.js
const Module = require('../models/module');
const Course = require('../models/Course');

// Creo un nuevo módulo
const createModule = async (req, res) => {
  const { title, content, courseId } = req.body;
  try {
    const course = await Course.findByPk(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }
    const module = await Module.create({ title, content, courseId });
    res.status(201).json(module);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el módulo', error });
  }
};

// Obtengo todos los módulos
const getAllModules = async (req, res) => {
  try {
    const modules = await Module.findAll();
    res.status(200).json(modules);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los módulos', error });
  }
};

// Obtengo un módulo por id
const getModuleById = async (req, res) => {
  const { id } = req.params;
  try {
    const module = await Module.findByPk(id);
    if (!module) {
      return res.status(404).json({ message: 'Módulo no encontrado' });
    }
    res.status(200).json(module);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el módulo', error });
  }
};

// Actualizo un módulo
const updateModule = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const module = await Module.findByPk(id);
    if (!module) {
      return res.status(404).json({ message: 'Módulo no encontrado' });
    }
    module.title = title || module.title;
    module.content = content || module.content;
    await module.save();
    res.status(200).json(module);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el módulo', error });
  }
};

// Elimino un módulo
const deleteModule = async (req, res) => {
  const { id } = req.params;
  try {
    const module = await Module.findByPk(id);
    if (!module) {
      return res.status(404).json({ message: 'Módulo no encontrado' });
    }
    await module.destroy();
    res.status(204).json({ message: 'Módulo eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el módulo', error });
  }
};

module.exports = {
  createModule,
  getAllModules,
  getModuleById,
  updateModule,
  deleteModule,
};
