import { useFormik } from "formik";
import * as Yup from "yup";

//Did not use typescript galibog ko unsaon pag pass sa parameters in TS

function FormikLogin() {

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .label("Username")
        .min(2, "Must be at least 2 characters")
        .max(100, "Must be at most 100 characters")
        .matches(/^[A-Za-z\s]*$/, "Must contain letters and spaces only.")
        .required("Username is required"),
      password: Yup.string()
        .label("Password")
        .min(2, "Must be at least 2 characters")
        .max(100, "Must be at most 100 characters")
        .matches(/^[A-Za-z\s]*$/, "Must contain letters and spaces only.")
        .required("Password is required"),
    }),

    onSubmit: async (values) => {
      try {
        // Your submit logic here
      } catch (errors) {
        // Handle errors if needed
      }
    },
  });

  return null; // Replace with your JSX or return statement
}

export default FormikLogin;