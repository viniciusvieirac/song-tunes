import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import logo from '../images/icons8-music-192.svg';
import './Style/Login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      disabledButton: true,
      loading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = async (event) => {
    const { history } = this.props;
    const { name } = this.state;
    this.setState({
      loading: true,
    });
    event.preventDefault();
    await createUser({ name });
    history.push('/search');
    this.setState({
      loading: false,
    });
  };

  handleChange({ target }) {
    const { value } = target;
    this.setState({
      name: value,
    }, this.validateForm);
  }

  validateForm() {
    const { name } = this.state;
    const MIN_VALUE = 3;
    if (name.length >= MIN_VALUE) {
      this.setState({
        disabledButton: false,
      });
    } else {
      this.setState({
        disabledButton: true,
      });
    }
  }

  render() {
    const { name, disabledButton, loading } = this.state;
    return (
      <div data-testid="page-login" className="area-login">
        <div className="login">
          <div>
            <img src={ logo } alt="imagem musicas" className="logo-image" />
          </div>
          <form className="form" onSubmit={ this.handleSubmit }>
            <h1>Wellcome!</h1>
            {loading ? (<Loading />) : (
              <div>
                <label>
                  <input
                    type="text"
                    value={ name }
                    onChange={ this.handleChange }
                    placeholder="insira seu nome"
                    data-testid="login-name-input"
                  />
                </label>
                <button
                  type="submit"
                  disabled={ disabledButton }
                  data-testid="login-submit-button"
                  className="submit-login"
                >
                  Login

                </button>
              </div>
            )}

          </form>

        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
