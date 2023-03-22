import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      nome: '',
      email: '',
      description: '',
      image: '',
      disabledButton: true,
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    const { name, email, description, image } = await getUser();
    const validateUser = name && email && description && image;
    this.setState({
      loading: false,
      nome: name,
      email,
      description,
      image,
      disabledButton: !validateUser,
    });
  };

  handleClick = async () => {
    const { history } = this.props;
    const { nome: name, email, description, image } = this.state;
    updateUser({ name, email, description, image });
    history.push('/profile');
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validateForm);
  };

  validateForm = () => {
    const { nome, email, description, image } = this.state;
    if (nome && email && description && image) {
      this.setState({
        disabledButton: false,
      });
    } else {
      this.setState({
        disabledButton: true,
      });
    }
  };

  render() {
    const { loading, nome, email, description, image, disabledButton } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading ? <Loading /> : (

          <form>
            <label htmlFor="image">
              Envie sua imagem:
              <input
                type="url"
                value={ image }
                name="image"
                onChange={ this.handleChange }
                data-testid="edit-input-image"
              />
            </label>
            <label htmlFor="nome">
              Altere seu nome:
              <input
                type="text"
                value={ nome }
                name="nome"
                data-testid="edit-input-name"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="email">
              Digite seu email:
              <input
                type="email"
                value={ email }
                name="email"
                data-testid="edit-input-email"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="description">
              Descrição:
              <textarea
                name="description"
                value={ description }
                id=""
                cols="30"
                rows="10"
                data-testid="edit-input-description"
                onChange={ this.handleChange }
              />
            </label>
            <button
              type="button"
              data-testid="edit-button-save"
              disabled={ disabledButton }
              onClick={ this.handleClick }
            >
              Editar perfil

            </button>
          </form>

        )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
