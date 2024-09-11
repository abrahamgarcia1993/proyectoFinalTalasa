import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export const Checkout = () => {
  const [clientSecretSTRIPE, setClientSecretSTRIPE] = useState("");
  const [detailsCourse, setDetailsCourse] = useState({});
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  const fetchClientSecret = async () => {
    const token = localStorage.getItem("token");
    const courseId = new URLSearchParams(window.location.search).get("courseId");

    // fetch del curso
    const responseCourse = await fetch(`http://localhost:3000/api/courses/courses/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const dataCourse = await responseCourse.json();
    setDetailsCourse(dataCourse);

    const response = await fetch("http://localhost:3000/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ courseId }),
    });
    const data = await response.json();
    setClientSecretSTRIPE(data.clientSecret);
  };

  useEffect(() => {
    fetchClientSecret();
  }, []);

  // Esquema de validación con Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("El nombre es obligatorio"),
    email: Yup.string().email("Correo electrónico inválido").required("El correo es obligatorio"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    setSubmitting(true);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecretSTRIPE, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: values.name,
          email: values.email,
        },
      },
    });

    if (error) {
      setErrorMessage(`El pago no pudo ser procesado. ${ error.message }`);
    } else if (paymentIntent.status === "succeeded") {
      
      // enviar datos a la API
      const token = localStorage.getItem("token");
      const courseId = new URLSearchParams(window.location.search).get("courseId");
      const userId = localStorage.getItem("user");
      const paymentIntentId = paymentIntent.id;

      const response = await fetch("http://localhost:3000/api/confirm-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, courseId, paymentIntentId }),
      });
      const data = await response.json();
      setPaymentSuccess(true);
      setPaymentDetails(data.purchase);
    }else {
      setErrorMessage("El pago no pudo ser procesado.");
    }

    setLoading(false);
    setSubmitting(false);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-md rounded-md p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-700 mb-6">Checkout</h2>

        {errorMessage && (
          <div className="text-red-600 text-center mb-4">
            <p>{errorMessage}</p>
          </div>
        )}

        {paymentSuccess ? (
          <div className="text-green-600 text-center">
            <h3 className="text-xl">¡Pago exitoso!</h3>
            <p>Tu compra ha sido completada.</p>
            <div className="bg-gray-100 p-4 rounded-md mt-4">
              <h4 className="text-lg font-semibold">Detalles de la Compra</h4>
              <p className="text-gray-800">Monto: {paymentDetails.amount}€</p>
              <p className="text-gray-800">Fecha de Compra: {new Date(paymentDetails.purchaseDate).toLocaleDateString()}</p>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Detalles del Curso</h3>
              <div className="bg-gray-100 p-4 rounded-md">
                <p className="text-lg font-bold">{detailsCourse.title}</p>
                <p className="text-gray-600">{detailsCourse.description}</p>
                <p className="text-gray-800 font-bold mt-2">Precio: {detailsCourse.precio}€</p>
                <p className="text-gray-600">Fecha de Inicio: {detailsCourse.temporalidad}</p>
              </div>
            </div>

            <Formik
              initialValues={{ name: "", email: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 mb-2">Nombre completo</label>
                    <Field
                      name="name"
                      type="text"
                      className="border p-3 rounded-md w-full"
                      placeholder="Nombre"
                    />
                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 mb-2">Correo electrónico</label>
                    <Field
                      name="email"
                      type="email"
                      className="border p-3 rounded-md w-full"
                      placeholder="Correo electrónico"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="card" className="block text-gray-700 mb-2">Detalles de la tarjeta</label>
                    <div className="border p-3 rounded-md">
                      <CardElement id="card" className="w-full" options={{ hidePostalCode: true }} />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className={`w-full bg-blue-500 text-white p-3 rounded-md font-bold ${
                      isSubmitting || loading ? "opacity-50" : ""
                    }`}
                    disabled={isSubmitting || loading}
                  >
                    {loading ? "Procesando..." : "Pagar"}
                  </button>
                </Form>
              )}
            </Formik>
          </>
        )}
      </div>
    </div>
  );
};
