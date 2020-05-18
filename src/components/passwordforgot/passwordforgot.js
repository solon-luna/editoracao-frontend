import React, { Component } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import Recaptcha from "react-recaptcha";
const PasswordForgotSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email invalido")
    .required("Email obrigatorio"),
  recaptcha: Yup.string().required()
});

class Passwordforgot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      response: {},
      error_message: null,
      avatar: ""
    };
  }

  submitForm = async formData => {
    await axios
      .post(process.env.REACT_APP_API_URL + "password/reset/", formData)
      .then(res => {
        console.log(res.data.result);
        if (res.data.result === "success") {
          swal("Sucesso!", res.data.message, "ok").then(value => {
            //s window.location.reload();
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
    onSubmit,
    isSubmitting,
    setFieldValue
  }) => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="card-body">
          <div className="form-group  has-feedback">
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              value={values.email}
              type="email"
              className={
                errors.email && touched.email
                  ? "form-control is-invalid"
                  : "form-control"
              }
              id="email"
              placeholder="Entre com o email"
            />
            {errors.email && touched.email ? (
              <small id="passwordHelp" class="text-danger">
                {errors.email}
              </small>
            ) : null}
          </div>
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

        <div class="row">
          <div class="col-12">
            <button
              type="submit"
              disable={isSubmitting}
              class="btn btn-primary btn-block"
            >
              Pedir uma nova senha
            </button>
          </div>
        </div>
      </form>
    );
  };

  render() {
    return (
      <div className="login-page">
        <div className="login-box">
          <div className="login-logo">
            <a href="# ">
              <b>Controle de Livros</b>
            </a>
          </div>
          {/* /.login-logo */}
          <div className="card">
            <div className="card-body login-card-body">
              <p className="login-box-msg">
                Esqueceu sua senha? Aqui voce pode pedir uma nova.
              </p>
              <Formik
                initialValues={{
                  email: "",
                  recaptcha: ""
                }}
                onSubmit={(values, { setSubmitting }) => {
                  this.submitForm(values, this.props.history);
                  setSubmitting(false);
                }}
                validationSchema={PasswordForgotSchema}
              >
                {/* {this.showForm()}            */}
                {props => this.showForm(props)}
              </Formik>
              <p className="mb-0">
                <Link to="/login">Entrar</Link>
              </p>

              <p className="mb-0">
                <Link to="/register">Registrar um novo usuario</Link>
              </p>
            </div>
            {/* /.login-card-body */}
          </div>
        </div>
      </div>
    );
  }
}

export default Passwordforgot;
