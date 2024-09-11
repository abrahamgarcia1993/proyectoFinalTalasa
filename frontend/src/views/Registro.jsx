import { Formik, Form, Field, ErrorMessage } from "formik";
import Header from "../components/Header";
import * as Yup from "yup";

const SingupSchema = Yup.object().shape({
  name: Yup.string().required("Nombre es requerido"),
  email: Yup.string().email("Correo invalido").required("Correo es requerido"),
  password: Yup.string()
    .min(6, "Contraseña debe tener al menos 6 caracteres")
    .required("Contraseña es requerida"),
});
const Registro = () => {
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Registro exitoso:", data);

        window.location.href = "/login";
        
      } else {
        console.error("Error en el registro:", data.message);
      }
    } catch (error) {
      console.error("Error de red:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      validationSchema={SingupSchema}
      onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <div>

        <Header/>
        <div className="flex flex-col justify-center items-center h-screen">
        <Form className="w-[80%] h-[80%]  flex flex-col items-center justify-evenly gap-6 bg-slate-200">
            <div>
            <h1 className="font-bold text-3xl p-6 text-blue-400">Registrate</h1>
            <p className="text-blue-400 pl-6">Registrese para poder acceder a nuestros cursos</p>
            </div>
            <div className="flex flex-col items-center w-full gap-4 ">

          <div className= "rounded-lg border-2 flex  w-full justify-center flex-col  items-center gap-1  p-1">
            <Field className="rounded-md p-1 w-[70%]" type="text" name="name" id="name" placeholder="Nombre" />
            <ErrorMessage className="text-red-700" name="name" component="div" />
          </div>
          <div className=" rounded-lg border-2 flex  w-full justify-center flex-col  items-center  gap-1  p-1">
            <Field className="rounded-md p-1 w-[70%]" type="email" name="email" id="email" placeholder="Correo" />
            <ErrorMessage className="text-red-700" name="email" component="div" />
          </div>
          <div className=" rounded-lg border-2 flex  w-full justify-center flex-col items-center  gap-1  p-1">
            <Field className="rounded-md p-1 w-[70%]"
              type="password"
              name="password"
              id="password"
              placeholder="Contraseña"
            />
            <ErrorMessage className="text-red-700" name="password" component="div" />
          </div>
          <button className="p-2 text-white bg-blue-400 rounded-md" type="submit" disabled={isSubmitting}>
            Registrarse
          </button>
            </div>
        </Form>
        </div>
        </div>
      )}
    </Formik>
  );
};

export default Registro;
