import React, { Component } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";
const PasswordresetSchema = Yup.object().shape({
  password: Yup.string().required("Nova senha é requerida"),
  confirm_password: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Senha e confirmacao devem ser as mesmas"
  )
});

class Passwordreset extends Component {
  constructor(props) {
    super(props);

    this.state = {
      response: {},
      error_message: null,
      avatar: ""
    };
  }

  submitForm = async (values, history, token) => {
    await axios
      .put(process.env.REACT_APP_API_URL +"password/reset?token=" + token, values)
      .then(res => {
        if (res.data.result === "success") {
          swal("Sucesso!", res.data.message, "ok").then(value => {
            history.push("/");
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
            <label htmlFor="password">Senha:</label>
            <input
              name="password"
              onChange={handleChange}
              value={values.password}
              type="password"
              className={
                errors.password && touched.password
                  ? "form-control is-invalid"
                  : "form-control"
              }
              id="password"
              placeholder="Entre com a nova senha"
            />
            {errors.password && touched.password ? (
              <small id="passwordHelp" class="text-danger">
                {errors.password}
              </small>
            ) : null}
          </div>
          <div className="form-group  has-feedback">
            <label htmlFor="password">Confirme a senha:</label>

            <input
              onChange={handleChange}
              value={values.confirm_password}
              type="password"
              className={
                errors.confirm_password && touched.confirm_password
                  ? "form-control is-invalid"
                  : "form-control"
              }
              id="confirm_password"
              name="confirm_password  "
              placeholder="Entre com a senha novamente"
            />
            {errors.confirm_password && touched.confirm_password ? (
              <small id="passwordHelp" class="text-danger">
                {errors.confirm_password}
              </small>
            ) : null}
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <button
              type="submit"
              disabled={isSubmitting}
              class="btn btn-primary btn-block"
            >
              Salvar a nova senha
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
                Recupere sua senha agora
              </p>
              <Formik
                initialValues={{
                  password: ""
                }}
                onSubmit={(values, { setSubmitting }) => {
                  this.submitForm(
                    values,
                    this.props.history,
                    this.props.match.params["token"]
                  );
                  setSubmitting(true);
                }}
                validationSchema={PasswordresetSchema}
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

export default Passwordreset;
