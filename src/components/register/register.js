import React, { Component } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import swal from "sweetalert";
import Recaptcha from "react-recaptcha";
const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "username muito curto!")
    .max(50, "username muito longo!")
    .required("username requerido"),
  recaptcha: Yup.string().required(),
  email: Yup.string()
    .email("Invalid email")
    .required("Email requerido"),
  password: Yup.string().required("Senha requerida"),
  confirm_password: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Senha e confirmacao devem ser iguais"
  )
});

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alert: null
    };
  }

  submitForm = (values, history) => {
    axios
      .post(process.env.REACT_APP_API_URL + "register", values)
      .then(res => {
        console.log(res.data.result);
        if (res.data.result === "success") {
          swal("Sucesso!", res.data.message, "ok").then(value => {
            history.push("/login");
          });
        } else if (res.data.result === "error") {
          swal("Erro!", res.data.message, "ok");
        }
      })
      .catch(error => {
        console.log(error);
        swal("Erro!", "Erro inesperado", "ok");
      });
  };
  showForm = ({
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting
  }) => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group has-feedback">
          <input
            type="text"
            name="username"
            onChange={handleChange}
            value={values.username}
            placeholder="Username"
            className={
              errors.username && touched.username
                ? "form-control is-invalid"
                : "form-control"
            }
          />
          {errors.fullname && touched.fullname ? (
            <small id="passwordHelp" class="text-danger">
              {errors.username}
            </small>
          ) : null}
        </div>
        <div className="form-group has-feedback">
          <input
            type="text"
            name="email"
            onChange={handleChange}
            value={values.email}
            className={
              errors.email && touched.email
                ? "form-control is-invalid"
                : "form-control"
            }
            placeholder="Email"
          />
          {errors.email && touched.email ? (
            <small id="passwordHelp" class="text-danger">
              {errors.email}
            </small>
          ) : null}
        </div>
        <div className="form-group has-feedback">
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={values.password}
            placeholder="Password"
            className={
              errors.password && touched.password
                ? "form-control is-invalid"
                : "form-control"
            }
          />
          {errors.password && touched.password ? (
            <small id="passwordHelp" class="text-danger">
              {errors.password}
            </small>
          ) : null}
        </div>
        <div className="form-group has-feedback">
          <input
            type="password"
            name="confirm_password"
            onChange={handleChange}
            className={
              errors.confirm_password && touched.confirm_password
                ? "form-control is-invalid"
                : "form-control"
            }
            placeholder="Confirm Password"
          />
          {errors.confirm_password && touched.confirm_password ? (
            <small id="passwordHelp" class="text-danger">
              {errors.confirm_password}
            </small>
          ) : null}
        </div>
        <div className="form-group">
          <label>Recaptcha Validation</label>
          <Recaptcha
            sitekey={process.env.REACT_APP_RECAPCHA_KEY}
            render="explicit"
            theme="light"
            verifyCallback={response => {
              setFieldValue("recaptcha", response);
            }}
            onloadCallback={() => {
              console.log("done loading!");
            }}
          />
          {errors.recaptcha && touched.recaptcha && <p>{errors.recaptcha}</p>}
        </div>

        <div className="row">
          <div className="col-md-12">
            <button
              disabled={isSubmitting}
              type="submit"
              className="btn btn-primary btn-block btn-flat"
            >
              Confirma
            </button>
            <button
              type="button"
              onClick={() => {
                this.props.history.push("/login");
              }}
              className="btn btn-default btn-block btn-flat"
            >
              ainda tem seu login?
            </button>
          </div>
          {/* /.col */}
        </div>
      </form>
    );
  };

  render() {
    return (
      <div className="register-page">
        <div className="register-box">
          <div className="register-logo">
            <a href="../../index2.html">
              <b>Controle de Livros</b>
            </a>
          </div>
          <div className="card">
            <div className="card-body register-card-body">
              <p className="login-box-msg">Registrar um novo usuario</p>

              <Formik
                initialValues={{
                  fullname: "",
                  email: "",
                  password: "",
                  confirm_password: "",
                  recaptcha: ""
                }}
                onSubmit={(values, { setSubmitting }) => {
                  this.submitForm(values, this.props.history);
                  setSubmitting(false);
                }}
                validationSchema={SignupSchema}
              >
                {props => this.showForm(props)}
              </Formik>
            </div>
            {/* /.form-box */}
          </div>
          {/* /.card */}
        </div>
      </div>
    );
  }
}

export default Register;
