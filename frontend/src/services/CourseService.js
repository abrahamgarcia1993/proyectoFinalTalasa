/* 
const API_URL = 'http://localhost:3000/api';

// Obtener todos los cursos
export const getCourses = async () => {
  try {
    const response = await fetch(`${API_URL}/courses`);
    if (!response.ok) {
      throw new Error('Error al obtener los cursos');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Obtener un curso por ID
export const getCourseById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/courses/${id}`);
    if (!response.ok) {
      throw new Error('Error al obtener el curso');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Crear un nuevo curso
export const createCourse = async (courseData, token) => {
  try {
    const response = await fetch(`${API_URL}/courses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(courseData),
    });
    if (!response.ok) {
      throw new Error('Error al crear el curso');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Actualizar un curso
export const updateCourse = async (id, courseData, token) => {
  try {
    const response = await fetch(`${API_URL}/courses/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(courseData),
    });
    if (!response.ok) {
      throw new Error('Error al actualizar el curso');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Eliminar un curso
export const deleteCourse = async (id, token) => {
  try {
    const response = await fetch(`${API_URL}/courses/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Error al eliminar el curso');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

 */