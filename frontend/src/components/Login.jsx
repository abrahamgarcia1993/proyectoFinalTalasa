import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useAuthStore from "../store/useAuthStore";
import Header from "./Header";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Correo inválido").required("Correo es requerido"),
  password: Yup.string().required("Contraseña es requerida"),
});

const Login = () => {

  const { login } = useAuthStore();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Inicio de sesión exitoso:", data);
        // Manejo del token recibido
        localStorage.setItem("token", data.token); // Guardar token en localStorage
        localStorage.setItem("user", data.id); // Guardar usuario en localStorage

        await login(data, data.token);
        window.location.href = "/dashboard"; // Redirigir a la página principal
      } else {
        console.error("Error en el inicio de sesión:", data.message);
      }
    } catch (error) {
      console.error("Error de red:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={LoginSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <div>
          <Header/>
        <div className="flex justify-center items-center h-screen">
          <Form className="w-[80%] h-[80%] flex flex-col items-center justify-evenly gap-6 bg-slate-200">
            <div>
              <h1 className="font-bold text-3xl p-6 text-blue-400">Inicia sesión</h1>
            </div>
            <div className="flex flex-col items-center w-full gap-4">
              <div className="rounded-lg border-2 flex w-full justify-center flex-col items-center gap-1 p-1">
                <Field className="rounded-md p-1 w-[70%]" type="email" name="email" placeholder="Correo" />
                <ErrorMessage className="text-red-700" name="email" component="div" />
              </div>
              <div className="rounded-lg border-2 flex w-full justify-center flex-col items-center gap-1 p-1">
                <Field className="rounded-md p-1 w-[70%]" type="password" name="password" placeholder="Contraseña" />
                <ErrorMessage className="text-red-700" name="password" component="div" />
              </div>
              <button className="p-2 text-white bg-blue-400 rounded-md" type="submit" disabled={isSubmitting}>
                Iniciar sesión
              </button>
            </div>
          </Form>
        </div>
        </div>
      )}
    </Formik>
  );
};

export default Login;
