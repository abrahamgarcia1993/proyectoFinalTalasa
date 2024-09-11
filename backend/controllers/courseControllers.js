
const Course = require('../models/Course');
const { filesHasManyCourses, Files } = require('../models/Files');
const User = require('../models/User');
const Payment = require('./../models/Payment');
const Purchase = require('./../models/Payment');

// Crear un nuevo curso
const createCourse = async (req, res) => {
  const { title, description, precio, temporalidad } = req.body;
  const { userId } = req.user; 
    // Crear el nuevo curso
    try{

      const course = await Course.create({
        title,
        description,
        precio,
        temporalidad,
        OwnerUserId: userId, // Asocio el curso con el usuario  logueado
      });
  
      // Se buscan los cursos del usuario logueado
      const userCourses = await Course.findAll({
        where: { OwnerUserId: userId },
      });
  
      res.status(201).json({
        createdCourse: course,
        userCourses: userCourses,
      });
    } catch (error) {
      console.error("Error al crear el curso: ", error);
      res.status(500).json({ message: 'Error al crear el curso', error });
    }
  }

;

// Obtener todos los cursos
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los cursos', error });
  }
};

// Obtener un curso por ID
const getCourseById = async (req, res) => {
  const { id } = req.params;
 
  try {
    const course = await Course.findByPk(id);
    let archivos = [];

    if (!course) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }

    // Obtener los archivos asociados al curso
    const files = await filesHasManyCourses.findAll({
      where: {
        courseId: id
      }
    });

    // Buscar los archivos en la tabla files
    for (let i = 0; i < files.length; i++) {
      const file = await Files.findByPk(files[i].fileId);
      archivos.push(file);
    }

    course.dataValues.archivos = archivos;

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el curso', error });
  }
};

// Actualizar un curso
const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { title, description, precio, temporalidad, OwnerUserId, userRole } = req.body;

  try {
    const course = await Course.findByPk(id);

    if (!course) {
      return res.status(404).json({ message: "Curso no encontrado" });
    }
    
    // Verificar si el usuario es el propietario del curso o es un admin
    if (course.OwnerUserId != OwnerUserId && userRole != 'admin') {
      return res.status(403).json({ message: "No tienes permiso para actualizar este curso" });
    }

    course.title = title;
    course.description = description;
    course.precio = precio;
    course.temporalidad = temporalidad;

    await course.save();

    res.json({ message: "Curso actualizado con éxito", course });
  } catch (error) {
    console.error("Error actualizando curso: ", error);
    res.status(500).json({ message: "Error al actualizar el curso" });
  }
};

// Eliminar un curso
const deleteCourse = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await Course.findByPk(id);

    if (!course) {
      return res.status(404).json({ message: "Curso no encontrado" });
    }

    // obtener los archivos asociados al curso
    const files = await filesHasManyCourses.findAll({
      where: {
        courseId: id
      }
    });

  
    const user = await User.findByPk(req.user.userId);

    // Verificar si el usuario es el propietario del curso o es un admin
    if (course.OwnerUserId !== user.id && user.role !== 'admin') {
      return res.status(403).json({ message: "No tienes permiso para eliminar este curso" });
    }

    // buscar los archivos en la tabla files y eliminarlos

    for (let i = 0; i < files.length; i++) {
      const file = await Files.findByPk(files[i].fileId);
      await file.destroy();
    }

    // eliminar filesHasManyCourses
    await filesHasManyCourses.destroy({
      where: {
        courseId: id
      }
    });

    await course.destroy();

    res.json({ message: "Curso eliminado con éxito" });
  } catch (error) {
    console.error("Error eliminando curso: ", error);
    res.status(500).json({ message: "Error al eliminar el curso" });
  }
};

const buyCourse = async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user.userId; // El ID del usuario está en req.user, establecido por el middleware de autenticación

  try {
    // Verificar si el curso existe
    const course = await Course.findByPk(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }

    // Verificar si el usuario ya ha comprado este curso
    const existingPurchase = await Purchase.findOne({
      where: {
        userId,
        courseId,
      },
    });

    if (existingPurchase) {
      return res.status(400).json({ message: 'Ya has comprado este curso' });
    }

    // Crear la compra
    const newPurchase = await Purchase.create({
      userId,
      courseId,
    });

    // Responder con éxito
    res.status(201).json({
      message: 'Curso comprado con éxito',
      purchase: newPurchase,
    });
  } catch (error) {
    console.error('Error al comprar el curso:', error);
    res.status(500).json({ message: 'Error al comprar el curso' });
  }
};

const getCoursesByUser = async (req, res) => {
  try {
    const userId = req.user.userId;

    // 1. Consulta las compras del usuario para obtener los IDs de los cursos
    const purchases = await Payment.findAll({
      where: {
        userId,
      },
      attributes: ['courseId'], // Solo necesitamos los IDs de los cursos
    });

    // Extrae los IDs de los cursos
    const courseIds = purchases.map(purchase => purchase.courseId);

    if (courseIds.length === 0) {
      return res.status(200).json([]); // No hay cursos para mostrar
    }

    // 2. Consulta los cursos basados en los IDs
    const courses = await Course.findAll({
      where: {
        id: courseIds,
      },
    });

    res.status(200).json(courses);
  } catch (error) {
    console.error('Error al obtener los cursos del usuario:', error);
    res.status(500).json({ message: 'Error al obtener los cursos del usuario' });
  }
};

const getCoursesByUserAdmin = async (req, res) => {
  try {
    const userId = req.user.userId;

    // 1. Consulta las compras del usuario para obtener los IDs de los cursos
    const myCourses = await Course.findAll({
      where: {
        OwnerUserId: userId,
      }
    });

    if (myCourses.length === 0) {
      return res.status(200).json([]); // No hay cursos para mostrar
    }

    res.status(200).json(myCourses);
  } catch (error) {
    console.error('Error al obtener los cursos del usuario:', error);
    res.status(500).json({ message: 'Error al obtener los cursos del usuario' });
  }
}

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  buyCourse,
  getCoursesByUser,
  getCoursesByUserAdmin
};
