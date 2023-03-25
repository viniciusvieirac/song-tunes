/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineSearch, AiOutlineUser, AiTwotoneHeart } from 'react-icons/ai';
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
          <h3>Song</h3>
        </div>
        <nav className={ styles.navBar }>

          <div className={ styles.linksContainer }>
            <div>
              <Link className={ styles.links } to="/search">
                <AiOutlineSearch />
                <span>Pesquisar </span>
              </Link>
            </div>
            <div>
              <Link className={ styles.links } to="/favorites">
                <AiTwotoneHeart />
                <span> Favoritos</span>
              </Link>
            </div>
            {loading ? (<Loading />) : (
              <div>
                <Link to="/profile" className={ styles.links }>

                  <AiOutlineUser />
                  <span data-testid="header-user-name" className={ styles.user }>
                    {name}
                  </span>
                </Link>
              </div>

            )}
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;
