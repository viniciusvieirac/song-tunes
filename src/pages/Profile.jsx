import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      description: '',
      image: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    const { name, email, description, image } = await getUser();
    this.setState({
      loading: false,
      name,
      email,
      description,
      image,

    });
  };

  render() {
    const { loading, name, email, description, image } = this.state;
    return (
      <div data-testid="page-profile">
        {loading && <Loading />}
        <Header />
        <div>
          <p>

            {name}
          </p>
        </div>
        <div>
          <p>

            {email}
          </p>
        </div>
        <div>
          <p>

            {description}
          </p>
        </div>
        <div>
          <img src={ image } alt={ name } data-testid="profile-image" />
        </div>
        <Link to="/profile/edit">Editar perfil</Link>
      </div>
    );
  }
}

export default Profile;
