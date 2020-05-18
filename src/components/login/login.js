import React, { Component } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import swal from "sweetalert";
import Recaptcha from "react-recaptcha";
import { Link } from "react-router-dom";
const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "username muito curto!")
    .max(50, "username muito grande!")
    .required("Username obrigatorio"),
  recaptcha: Yup.string().required(),
  password: Yup.string().required("Senha obrigatoria")
});

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alert: null
    };
  }
  
  initilizeRecaptcha = async => {
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  };
  componentDidMount() {
    this.initilizeRecaptcha();
    if (localStorage.getItem("TOKEN_KEY") != null) {
      return this.props.history.push("/home");
    }

    let token = this.props.match.params["token"];

    if (token !== undefined) {

      async function activeUser (token) {
        await axios
        .put(process.env.REACT_APP_API_URL +"activation?token=" + token)
        .then(res => {
          if (res.data.result === "success") 
            swal("Sucesso!", "Ativacao feita...voce pode entrar !", "ok");
          else if (res.data.result === "error") 
            swal("Erro!", "Ativacao Falhou...tente novamente !", "ok"); 
        })       
        .catch(error => {
          console.log(error);
          swal("Erro!", "Erro inesperado", "ok");
        })
      }
      let notify = activeUser(token); 
    }
  }

  submitForm = (values, history) => {
    axios
      .post(process.env.REACT_APP_API_URL + "login", values)
      .then(res => {
        if (res.data.result === "success") {
          localStorage.setItem("TOKEN_KEY", res.data.token);
          swal("Sucesso!", res.data.message, "ok").then(value => {
            history.push("/home");
          });
        } else if (res.data.result === "error") {
          swal("Erro!", res.data.message, "ok");
        }
      })
      .catch(error => {
        console.log(error);
        return swal("Erro!", error.message, "ok");
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
        <div className="form-group input-group has-feedback">
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
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-user"></span>
            </div>
          </div>
          {errors.username && touched.username ? (
            <small id="passwordHelp" class="text-danger">
              {errors.username}
            </small>
          ) : null}
        </div>
        <div className="form-group input-group mb-3 has-feedback">
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
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-lock"></span>
            </div>
          </div>
          {errors.password && touched.password ? (
            <small id="passwordHelp" class="text-danger">
              {errors.password}
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
        <div class="row">
          <div class="col-8">
            <div class="icheck-primary">
              <input type="checkbox" id="remember" />
              <label for="remember"> Lembrar-me</label>
            </div>
          </div>
          <div class="col-4">
            <button
              type="submit"
              disabled={isSubmitting}
              class="btn btn-primary btn-block"
            >
              Entrar
            </button>
          </div>
        </div>
      </form>
    );
  };

  render() {
    return (
      <div class="login-page">
        <div className="register-box">
          <div className="register-logo">
            <a href="../../index2.html">
              <b>Controle de Livros</b>
            </a>
          </div>
          <div className="card">
            <div className="card-body register-card-body">
              <p className="login-box-msg">Entre com seu login</p>

              <Formik
                initialValues={{
                  username: "",
                  password: "",
                  recaptcha: ""
                }}
                onSubmit={(values, { setSubmitting }) => {
                  this.submitForm(values, this.props.history);
                  setSubmitting(false);
                }}
                validationSchema={LoginSchema}
              >
                {/* {this.showForm()}            */}
                {props => this.showForm(props)}
              </Formik>
              <p class="mb-1">
                <Link to="/password/forgot">Esqueci minha senha</Link>
              </p>
              <p class="mb-0">
                <Link to="/register">Registrar um novo usuario</Link>
              </p>
            </div>
            {/* /.form-box */}
          </div>
          {/* /.card */}
        </div>
      </div>
    );
  }
}

export default Login;
