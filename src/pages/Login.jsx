import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

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
      <div data-testid="page-login">
        <form onSubmit={ this.handleSubmit }>
          <input
            type="text"
            value={ name }
            onChange={ this.handleChange }
            data-testid="login-name-input"
          />
          <button
            type="submit"
            disabled={ disabledButton }
            data-testid="login-submit-button"
          >
            Entrar

          </button>

          {loading && <Loading />}
        </form>
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
