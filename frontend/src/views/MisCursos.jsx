import { useState, useEffect } from "react";
import { DashboardLayout } from "../layouts/DashboardLayout";
import useAuthStore from "../store/useAuthStore";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";

import Swal from 'sweetalert2';

import './../assets/dashboard.css';

export const MisCursos = () => {
  const [cursosComprados, setCursosComprados] = useState([]);
  const [myCoursesAdmin, setMyCoursesAdmin] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false); // Nuevo estado para el modal de subida de archivos
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const [exams, setExams] = useState([]);
  const [isExamModalOpen, setIsExamModalOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);

  const { user, isAuthenticated, role, token } = useAuthStore();

  const fetchCursosComprados = async () => {
    if (!isAuthenticated) return;
    try {
      const response = await fetch(`http://localhost:3000/api/courses/courses/user/cursosComprados`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: user?.id }),
      });
      const data = await response.json();
      setCursosComprados(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const fetchMyCoursesAdmin = async () => {
    if (!isAuthenticated || role !== "admin") return;
    try {
      const response = await fetch("http://localhost:3000/api/courses/courses/user/myCourses", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: user?.id }),
      });
      const data = await response.json();
      setMyCoursesAdmin(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchCursosComprados();
      fetchMyCoursesAdmin();
    }
  }, [isAuthenticated, role]);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("El título es requerido"),
    description: Yup.string().required("La descripción es requerida"),
    precio: Yup.number().required("El precio es requerido").positive("Debe ser positivo"),
    temporalidad: Yup.date().optional(),
  });

  const handleCreateOrUpdateCourse = async (values) => {
    try {
      const url = selectedCourse ? `http://localhost:3000/api/courses/courses/${selectedCourse.id}` : "http://localhost:3000/api/courses/courses";
      const method = selectedCourse ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...values,
          OwnerUserId: user?.id,
          userRole: role,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Error al guardar el curso");
      }

      if( !selectedCourse ){
        setMyCoursesAdmin(data.userCourses || data);
      }else{
        window.location.reload();
      }

      setIsModalOpen(false);
      setSelectedCourse(null);
    } catch (error) {
      console.error("Error saving course: ", error);
    }
  };

  const handleDeleteCourse = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/courses/courses/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el curso");
      }

      setMyCoursesAdmin(myCoursesAdmin.filter(course => course.id !== id));
    } catch (error) {
      console.error("Error deleting course: ", error);
    }
  };

  const handleUploadFile = async (event) => {
    event.preventDefault();
    const fileInput = selectedFile;
    // Verificar que files existe y no está vacío
    if (fileInput) {
      const file = selectedFile;
      
      const formData = new FormData();
      formData.append('file', file);
      formData.append('courseId', selectedCourse.id);
  
      try {
        const response = await fetch('http://localhost:3000/api/courses/upload', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error('Error al subir el archivo');
        }

        setIsUploadModalOpen(false); // Cerrar modal

        Swal.fire({
          icon: 'success',
          title: '¡Archivo subido!',
          text: 'El archivo se ha subido correctamente.',
        });
  
        // Opcional: Actualiza la UI o el estado
      } catch (error) {
        console.error('Error uploading file:', error);

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al subir el archivo. Inténtalo de nuevo.',
        });

      }
    } else {
      console.error('No file selected');

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al subir el archivo. Inténtalo de nuevo.',
      });

    }
  };

  const fetchExams = async (courseId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/exams?courseId=${courseId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setExams(data);
    } catch (error) {
      console.error("Error fetching exams: ", error);
    }
  };

  const validationSchemaExam = Yup.object().shape({
    title: Yup.string().required("El título es requerido"),
    description: Yup.string().optional(),
    questions: Yup.array().of(
      Yup.object().shape({
        questionText: Yup.string().required("El enunciado es requerido"),
        answers: Yup.array().of(
          Yup.object().shape({
            answerText: Yup.string().required("La respuesta es requerida"),
            isCorrect: Yup.boolean().required("Debe indicar si es la respuesta correcta"),
          })
        ).required("Debe proporcionar al menos una respuesta")
      })
    ).required("Debe proporcionar al menos una pregunta"),
    duration: Yup.number().required("La duración es requerida").positive("Debe ser positiva"),
    validityDate: Yup.date().required("La fecha de validez es requerida"),
    valuePerQuestion: Yup.number().required("El valor por pregunta es requerido").positive("Debe ser positivo"),
  });

  const initialValues = {
    title: selectedExam ? selectedExam.title : "",
    description: selectedExam ? selectedExam.description : "",
    questions: selectedExam ? selectedExam.questions : [{ questionText: '', answers: [{ answerText: '', isCorrect: false }] }],
    duration: selectedExam ? selectedExam.duration : "",
    validityDate: selectedExam ? selectedExam.validityDate : "",
    valuePerQuestion: selectedExam ? selectedExam.valuePerQuestion : "",
  }

  const handleCreateOrUpdateExam = async (values) => {
    try {
      const url = selectedExam ? `http://localhost:3000/api/exams/${selectedExam.id}` : "http://localhost:3000/api/exams";
      const method = selectedExam ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...values,
          courseId: selectedCourse.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Error al guardar el examen");
      }

      fetchExams(selectedCourse.id);
      setIsExamModalOpen(false);
      setSelectedExam(null);
    } catch (error) {
      console.error("Error saving exam: ", error);
    }
  };

  const handleDeleteExam = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/exams/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el examen");
      }

      setExams(exams.filter(exam => exam.id !== id));
    } catch (error) {
      console.error("Error deleting exam: ", error);
    }
  };

  const onClose = () => {
    setIsExamModalOpen(false);
    setSelectedExam(null);
  }

  const createNewExam = (curso) => {
    setIsExamModalOpen(true);
    setSelectedCourse(curso);
  }


  return (
    <DashboardLayout>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-[#006064]">Mis Cursos</h2>

        {role === "admin" && (
          <>
            <button
              className="bg-[#006064] text-white px-4 py-2 rounded-md mt-4"
              onClick={() => {
                setIsModalOpen(true);
                setSelectedCourse(null);
              }}
            >
              Crear Curso
            </button>

            <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 gap-1">
              <h1 className="text-lg font-semibold text-[#006064] col-span-6 mt-5">Mis cursos creados</h1>
              {myCoursesAdmin.map((curso) => (
                <div 
                  key={curso.id} 
                  className="mt-4 grid grid-cols-6 sm:grid-cols-2 lg:grid-cols-1 gap-5 card">
                  <div className="bg-white p-4 shadow-lg rounded-lg hover:bg-gray-50">
                    <h3 className="text-lg font-semibold text-[#006064]">{curso.title}</h3>
                    <p className="text-gray-600 mt-2">{curso.description}</p>
                    <button
                      onClick={() => 
                        window.location.href = `/curso/detail/${curso.id}?id=${curso.id}`
                      }
                      className="bg-blue-500 text-white px-4 py-2 rounded-md m-2"
                    >
                      Detalles
                    </button>
                    <button
                      onClick={() => {
                        setSelectedCourse(curso);
                        setIsModalOpen(true);
                      }}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-md m-2"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteCourse(curso.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md m-1"
                    >
                      Eliminar
                    </button>
                    <button
                      onClick={() => {
                        setSelectedCourse(curso);
                        setIsUploadModalOpen(true); // Abrir modal para subir archivo
                      }}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md m-2"
                    >
                      Subir Material
                    </button>
                    <button 
                      className="bg-[#006064] text-white px-4 py-2 rounded-md mt-4"
                      onClick={() => createNewExam(curso)}>Crear Nuevo Examen</button>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h3
                className="text-lg font-semibold text-[#006064] col-span-6 mt-5"
              >Exámenes</h3>
              <ul>
                {exams.map(exam => (
                  <li 
                    className="bg-white p-4 shadow-lg rounded-lg hover:bg-gray-50"
                  key={exam.id}>
                    <h1>{exam.title}</h1>
                    <button 
                    className="bg-blue-500 text-white px-4 py-2 rounded-md m-2"
                    onClick={() => { setSelectedExam(exam); setIsExamModalOpen(true); }}>Editar</button>
                    <button 
                    className="bg-red-500 text-white px-4 py-2 rounded-md m-2"
                    onClick={() => handleDeleteExam(exam.id)}>Eliminar</button>
                  </li>
                ))}
              </ul>
            </div>

            {isExamModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50 overflow-auto">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
                  <h3 className="text-xl font-bold mb-4">{initialValues ? "Editar Examen" : "Crear Nuevo Examen"}</h3>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchemaExam}
                    onSubmit={async (values) => {
                      try {
                        await onSubmit(values);
                        onClose();
                        Swal.fire({
                          icon: 'success',
                          title: '¡Examen guardado!',
                          text: 'El examen ha sido guardado correctamente.',
                        });
                      } catch (error) {
                        Swal.fire({
                          icon: 'error',
                          title: 'Error',
                          text: 'Hubo un problema al guardar el examen. Inténtalo de nuevo.',
                        });
                      }
                    }}
                  >
                    {({ isSubmitting, values }) => (
                      <Form>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700">Título</label>
                          <Field
                            name="title"
                            type="text"
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                          />
                          <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
                        </div>

                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700">Descripción</label>
                          <Field
                            name="description"
                            as="textarea"
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                          />
                          <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                        </div>

                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700">Duración (minutos)</label>
                          <Field
                            name="duration"
                            type="number"
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                          />
                          <ErrorMessage name="duration" component="div" className="text-red-500 text-sm" />
                        </div>

                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700">Preguntas</label>
                          <FieldArray name="questions">
                            {({ push, remove }) => (
                              <>
                                {values.questions.map((question, index) => (
                                  <div key={index} className="mb-4 border p-4 rounded-md shadow-sm">
                                    <div className="mb-2">
                                      <label className="block text-sm font-medium text-gray-700">Enunciado de la pregunta</label>
                                      <Field
                                        name={`questions.${index}.questionText`}
                                        type="text"
                                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                      />
                                      <ErrorMessage name={`questions.${index}.questionText`} component="div" className="text-red-500 text-sm" />
                                    </div>

                                    <FieldArray name={`questions.${index}.answers`}>
                                      {({ push, remove }) => (
                                        <>
                                          {question.answers.map((answer, answerIndex) => (
                                            <div key={answerIndex} className="mb-2">
                                              <label className="block text-sm font-medium text-gray-700">Respuesta</label>
                                              <Field
                                                name={`questions.${index}.answers.${answerIndex}.answerText`}
                                                type="text"
                                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                              />
                                              <ErrorMessage name={`questions.${index}.answers.${answerIndex}.answerText`} component="div" className="text-red-500 text-sm" />
                                              <div className="flex items-center mt-2">
                                                <Field
                                                  name={`questions.${index}.answers.${answerIndex}.isCorrect`}
                                                  type="checkbox"
                                                  className="mr-2"
                                                />
                                                <label className="text-sm font-medium text-gray-700">Correcta</label>
                                              </div>
                                            </div>
                                          ))}
                                          <button
                                            type="button"
                                            className="bg-green-500 text-white px-4 py-2 rounded-md mt-2"
                                            onClick={() => push({ answerText: "", isCorrect: false })}
                                          >
                                            Añadir Respuesta
                                          </button>
                                        </>
                                      )}
                                    </FieldArray>
                                    <button
                                      type="button"
                                      className="bg-red-500 text-white px-4 py-2 rounded-md mt-2"
                                      onClick={() => remove(index)}
                                    >
                                      Eliminar Pregunta
                                    </button>
                                  </div>
                                ))}
                                <button
                                  type="button"
                                  className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
                                  onClick={() => push({ questionText: "", answers: [] })}
                                >
                                  Añadir Pregunta
                                </button>
                              </>
                            )}
                          </FieldArray>
                        </div>

                        <div className="flex justify-end">
                          <button
                            type="button"
                            className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                            onClick={onClose}
                          >
                            Cancelar
                          </button>
                          <button
                            type="submit"
                            className="bg-[#006064] text-white px-4 py-2 rounded-md"
                            disabled={isSubmitting}
                            onClick={() => handleCreateOrUpdateExam(values)}
                          >
                            {isSubmitting ? "Guardando..." : "Guardar Examen"}
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            )}
          </>
          
        )}

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
              <h3 className="text-xl font-bold mb-4">{selectedCourse ? "Editar Curso" : "Crear Nuevo Curso"}</h3>
              <Formik
                initialValues={{
                  title: selectedCourse ? selectedCourse.title : "",
                  description: selectedCourse ? selectedCourse.description : "",
                  precio: selectedCourse ? selectedCourse.precio : "",
                  temporalidad: selectedCourse ? selectedCourse.temporalidad.slice(0, 10) : "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleCreateOrUpdateCourse}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">Título</label>
                      <Field
                        name="title"
                        type="text"
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      />
                      <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">Descripción</label>
                      <Field
                        name="description"
                        as="textarea"
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      />
                      <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">Precio</label>
                      <Field
                        name="precio"
                        type="number"
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      />
                      <ErrorMessage name="precio" component="div" className="text-red-500 text-sm" />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">Temporalidad</label>
                      <Field
                        name="temporalidad"
                        type="date"
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      />
                      <ErrorMessage name="temporalidad" component="div" className="text-red-500 text-sm" />
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                        onClick={() => setIsModalOpen(false)}
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="bg-[#006064] text-white px-4 py-2 rounded-md"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Guardando..." : "Guardar Curso"}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        )}

        {isUploadModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
              <h3 className="text-xl font-bold mb-4">Subir Material</h3>
              <form onSubmit={handleUploadFile}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Seleccionar archivo</label>
                  <input
                    type="file"
                    accept=".pdf, .jpg, .jpeg, .png, .mp4, .mov"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                    onClick={() => setIsUploadModalOpen(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-[#006064] text-white px-4 py-2 rounded-md"
                  >
                    Subir Archivo
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {cursosComprados.length > 0 && (
          <>
            <h1 className="text-lg font-semibold text-[#006064] mt-5">Mis cursos comprados</h1>
            {cursosComprados.map((curso) => (
              <div key={curso.id} className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 card">
                <div className="bg-white p-4 shadow-lg rounded-lg hover:bg-gray-50">
                  <h3 className="text-lg font-semibold text-[#006064]">{curso.title}</h3>
                  <p className="text-gray-600 mt-2">{curso.description}</p>
                  <button
                      onClick={() => 
                        window.location.href = `/curso/detail/${curso.id}?id=${curso.id}`
                      }
                      className="bg-blue-500 text-white px-4 py-2 rounded-md m-2"
                    >
                      Detalles
                    </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </DashboardLayout>
  );
};
