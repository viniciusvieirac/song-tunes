import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import styles from './style/header.module.css';
import logo from '../images/icons8-music-192.svg';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loading: false,
    };
    this.fetchName = this.fetchName.bind(this);
  }

  componentDidMount() {
    this.fetchName();
  }

  fetchName = async () => {
    this.setState({
      loading: true,
    });
    const response = await getUser();
    this.setState({
      name: response.name,
      loading: false,
    });
  };

  render() {
    const { name, loading } = this.state;
    return (
      <header data-testid="header-component" className={ styles.headerComp }>
        <div className={ styles.divLogo }>
          <img src={ logo } alt="logo" className={ styles.logo } />
        </div>
        <nav className={ styles.navBar }>
          <ul>
            <li>
              <Link
                className={ styles.links }
                to="/search"
                data-testid="link-to-search"
              >
                Pesquisar

              </Link>
            </li>
            <li>
              <Link
                className={ styles.links }
                to="/favorites"
                data-testid="link-to-favorites"
              >
                Favoritos

              </Link>
            </li>
            <li>
              <Link
                className={ styles.links }
                to="/profile"
                data-testid="link-to-profile"
              >
                Perfil

              </Link>
            </li>
          </ul>
        </nav>
        {loading ? (<Loading />) : (
          <div className={ styles.userContainer }>
            <Link to="/profile" className={ styles.links }>
              <span data-testid="header-user-name" className={ styles.user }>{name}</span>
            </Link>
          </div>
        )}
      </header>
    );
  }
}

export default Header;
