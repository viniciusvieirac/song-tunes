import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import styles from './Style/Profile.module.css';
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
      <div data-testid="page-profile" className={ styles.profilePage }>
        <Header />

        <div className={ styles.profileContainer }>
          {loading && <Loading />}
          <img src={ image } alt="seu nome" data-testid="profile-image" />
          <div className={ styles.infos }>
            <p>
              {name}
            </p>

            <p>
              {email}
            </p>

            <p>
              {description}
            </p>

          </div>

          <Link className={ styles.button } to="/profile/edit">Editar perfil</Link>
        </div>

      </div>
    );
  }
}

export default Profile;
