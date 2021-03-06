import React from "react";
import { useTranslation } from "react-i18next";
// import config from "../../config";
// import Language from "../../component/Language";
import RestLogin from "./RestLogin";

const Login = () => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <div className="signup-content">
        <div className="progress">
          <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <div className="container">
          <div className="steps step-one active">
            <div className="row gx-md-5">
              <div className="col-md-6 mb-md-0 mb-4">
                <h1>
                  {t("Try Beauti")}
                  <br />
                  <b>{t("for free")}</b>
                </h1>
                <p className="">{t("Beauti is everything you need to run and grow your business: Appointment scheduling, client & staff management, product inventory, marketing and more Try it now for free.")}</p>
                <ul>
                  <li>{t("14 day free trial")}</li>
                  <li>{t("No contracts")}</li>
                  <li>{t("No credit card required")}</li>
                </ul>
              </div>
              <div className="col-md-6">
                <div className="signup-form">
                  <h3 className="form-title">{t("Sign In")}</h3>
                  <RestLogin />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="row d-flex justify-content-center align-items-center">
          <div className="col-md-12 text-center mt-5">
            <Language />
          </div>
        </div> */}
      </div>
    </React.Fragment>
  );
};
// const Login = (props) => {
//   const [loading, setLoading] = useState(false);

//   const { isLoggedIn } = useSelector((state) => state.auth);
//   const { message } = useSelector((state) => state.message);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { t } = useTranslation();

//   useEffect(() => {
//     dispatch(clearMessage());
//   }, [dispatch]);

//   const initialValues = {
//     email: "",
//     password: "",
//     remember_me: "",
//   };

//   const validationSchema = Yup.object().shape({
//     email: Yup.string().label("Email").email().required(),
//     password: Yup.string().min(6).max(16).label("Password").required(),
//     remember_me: Yup.bool(),
//   });

//   const handleLogin = (formValue) => {
//     const { email, password, remember_me } = formValue;
//     setLoading(true);

//     dispatch(login({ email, password, remember_me }))
//       .unwrap()
//       .then(() => {
//         navigate("/dashboard");
//         // window.location.reload();
//       })
//       .catch(() => {
//         setLoading(false);
//       });
//   };

//   if (isLoggedIn) {
//     return navigate("/dashboard");
//   }
//   return (
//     <>
//     <React.Fragment>
//       <section className="vh-100">
//         <div className="container py-5 h-custom">
//           <div className="row d-flex justify-content-center align-items-center h-100">
//             <div className="col-md-9 col-lg-6 col-xl-5 text-center">
//               <img
//                 src={config.logopath}
//                 className="img-fluid"
//                 alt="Sample image"
//               />
//             </div>
//             <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
//               <Formik
//                 initialValues={initialValues}
//                 validationSchema={validationSchema}
//                 onSubmit={handleLogin}
//               >
//                 {(formik) => (
//                   <WithTranslateFormErrors
//                     errors={formik.errors}
//                     touched={formik.touched}
//                     setFieldTouched={formik.setFieldTouched}
//                   >
//                     <Form>
//                       <div className="d-flex flex-row align-items-center justify-content-center mb-5">
//                         <h1 className="fw-normal mb-0 me-3">{t("Sign In")}</h1>
//                       </div>
//                       <FloatLabelInputField
//                         name="email"
//                         type="text"
//                         placeholder=""
//                         className={
//                           formik.touched.email && formik.errors.email
//                             ? "form-control is-invalid"
//                             : "form-control"
//                         }
//                         id="login-email"
//                         label={t("Email Address")}
//                       />
//                       <FloatLabelInputField
//                         name="password"
//                         type="password"
//                         placeholder=""
//                         className={
//                           formik.touched.password && formik.errors.password
//                             ? "form-control is-invalid"
//                             : "form-control"
//                         }
//                         id="login-password"
//                         autoComplete="off"
//                         label={t("Password")}
//                       />
//                       <div className="d-flex justify-content-between align-items-center mb-3">
//                         <div className="form-check mb-0">
//                           <input
//                             className="form-check-input me-2"
//                             type="checkbox"
//                             value=""
//                             id="form2Example3"
//                           />
//                           <label
//                             className="form-check-label"
//                             htmlFor="form2Example3"
//                           >
//                             {t("Remember me")}
//                           </label>
//                         </div>
//                         <Link to="#!" className="text-body">
//                           {t("Forgot password?")}
//                         </Link>
//                       </div>
//                       <div className="text-center text-lg-start mt-4 pt-2">
//                         <button
//                           type="submit"
//                           className="btn btn-primary btn-lg"
//                           disabled={loading}
//                         >
//                           {loading && (
//                             <span className="spinner-border spinner-border-sm"></span>
//                           )}
//                           {t("Login")}
//                         </button>
//                       </div>
//                     </Form>
//                   </WithTranslateFormErrors>
//                 )}
//               </Formik>
//               {message && (
//                 <div className="form-group">
//                   <div className="alert alert-danger" role="alert">
//                     {message}
//                   </div>
//                 </div>
//               )}
//             </div>

//             <div className="">
//               <div className="col-12 text-center">
//                 <Language />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       </React.Fragment>
//     </>
//   );
// };

export default Login;
