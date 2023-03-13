import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

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
      <header data-testid="header-component">
        <nav>
          <ul>
            <li>
              <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
            </li>
            <li>
              <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
            </li>
            <li>
              <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
            </li>
          </ul>
        </nav>
        {loading ? (<Loading />) : (<span data-testid="header-user-name">{name}</span>)}
      </header>
    );
  }
}

export default Header;
