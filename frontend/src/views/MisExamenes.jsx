import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import Swal from 'sweetalert2';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import useAuthStore from '../store/useAuthStore';

// Validación para las respuestas del examen
const validationSchema = Yup.object().shape({
  answers: Yup.array().of(
    Yup.object().shape({
      questionId: Yup.string().required('ID de la pregunta es requerido'),
      selectedAnswerId: Yup.string().required('Debe seleccionar una respuesta'),
    })
  ),
});

export const MisExamenes = () => {
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [isExamModalOpen, setIsExamModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);

  const { token } = useAuthStore();

  useEffect(() => {
    // Cargar la lista de exámenes
    const fetchExams = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/exams', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setExams(response.data);
      } catch (error) {
        console.error('Error fetching exams:', error);
      }
    };
    fetchExams();
  }, [token]);

  const handleExamClick = async (examId) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/exams/${examId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      const questions = await JSON.parse(data.questions);
      setSelectedExam(data);
      setQuestions(questions);
      setIsExamModalOpen(true);
    } catch (error) {
      console.error('Error fetching exam details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setIsExamModalOpen(false);
    setSelectedExam(null);
  };

  const handleSubmit = async (values) => {
    try {
      await axios.post('http://localhost:3000/api/answers', {
        examId: selectedExam.id,
        answers: values.answers,
      });
      Swal.fire({
        icon: 'success',
        title: '¡Respuestas enviadas!',
        text: 'Las respuestas han sido guardadas correctamente.',
      });
      handleModalClose();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al enviar las respuestas. Inténtalo de nuevo.',
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-[#006064]">Mis Exámenes</h2>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {exams.length > 0 && exams.map((exam) => (
            <div
              key={exam.id}
              className="bg-white p-4 shadow-lg rounded-lg hover:bg-gray-50 cursor-pointer"
              onClick={() => handleExamClick(exam.id)}
            >
              <h3 className="text-lg font-semibold text-[#006064]">{exam.title}</h3>
              <p className="text-gray-600 mt-2">{exam.description}</p>
            </div>
          ))}
        </div>

        {isExamModalOpen && selectedExam && !loading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50 overflow-y-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
              <h3 className="text-xl font-bold mb-4">Responder Examen: {selectedExam.title}</h3>
              <Formik
                initialValues={{
                  answers: questions.map((q, index) => ({
                    questionIndex: index,  // Usamos el índice del array como identificador
                    selectedAnswerIndex: '',  // Inicializar con valor vacío
                  })),
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, values }) => (
                  <Form>
                    <FieldArray name="answers">
                      {({ push, remove }) => (
                        <>
                          {questions.map((question, index) => (
                            <div key={index} className="mb-4">
                              <h4 className="text-lg font-semibold">
                                {question.questionText || 'Pregunta no disponible'}
                              </h4>
                              <div className="grid grid-cols-1 gap-2 mt-2">
                                {question.answers?.map((answer, i) => (
                                  <label key={i} className="flex items-center">
                                    <Field
                                      type="radio"
                                      name={`answers.${index}.selectedAnswerIndex`}
                                      value={i}
                                      checked={values.answers[index].selectedAnswerIndex === i.toString()} // Asegúrate de que el valor de `checked` esté correctamente controlado
                                    />
                                    <span className="ml-2">{answer.answerText}</span>
                                  </label>
                                ))}
                              </div>
                              <ErrorMessage name={`answers.${index}.selectedAnswerIndex`} component="div" className="text-red-500" />
                            </div>
                          ))}
                          <button
                            type="submit"
                            className="bg-[#006064] text-white px-4 py-2 rounded-md"
                            disabled={isSubmitting}
                            onClick={() => handleSubmit(values)}
                          >
                            {isSubmitting ? 'Enviando...' : 'Enviar Respuestas'}
                          </button>
                        </>
                      )}
                    </FieldArray>
                    <button
                      type="button"
                      className="bg-gray-500 text-white px-4 py-2 rounded-md mt-4"
                      onClick={handleModalClose}
                    >
                      Cancelar
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
