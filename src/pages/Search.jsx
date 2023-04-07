/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import imgAudio from '../images/audio-player.svg';
import style from './Style/Search.module.css';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      artist: '',
      artistName: '',
      disabledButton: true,
      loading: false,
      albuns: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { artist } = this.state;
    this.setState({
      loading: true,
      albuns: [],
      error: '',
    });
    const response = await searchAlbumsAPI(artist);
    if (response.length === 0) {
      this.setState({
        error: 'Nenhum álbum foi encontrado',
        loading: false,
      });
    } else {
      this.setState({
        albuns: response,
        loading: false,
        artist: '',
        artistName: artist,
      });
    }
  };

  handleChange({ target }) {
    const { value } = target;
    this.setState({
      artist: value,
    }, this.validateForm);
  }

  validateForm() {
    const { artist } = this.state;
    const MIN_VALUE = 2;
    if (artist.length >= MIN_VALUE) {
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
    const { artist, disabledButton, loading, albuns, artistName, error } = this.state;
    return (
      <div data-testid="page-search" className={ style.test }>
        <Header />
        <div className={ style.forms }>
          <form onSubmit={ this.handleSubmit }>
            <div className={ style.h2 }>
              <h2>Search your favorite albums</h2>
            </div>
            <div className={ style.singleInput }>
              <input
                value={ artist }
                type="text"
                id="artist"
                required
                onChange={ this.handleChange }
                data-testid="search-artist-input"
              />
              <label htmlFor="artist">Artist name</label>
            </div>

            <button
              className={ style.button }
              type="submit"
              disabled={ disabledButton }
              data-testid="search-artist-button"
            >
              Search
            </button>

          </form>
          {albuns.length <= 0 && !loading && (
            <div className={ style.imageContainer }>

              <img src={ imgAudio } alt="audio player" />

            </div>
          )}
        </div>
        <div className={ style.searchContainer }>
          {loading && <Loading />}
          {Boolean(error) && <p>{error}</p>}
          {albuns.length > 0 && (
            <div className={ style.albunsContainer }>
              <div>
                <h2>
                  Resultado de álbuns de:
                  {' '}
                  {artistName}
                </h2>
              </div>
              <div className={ style.albuns }>
                <ul>
                  {albuns.map((album, index) => (
                    <div key={ index } className={ style.cards }>
                      <li key={ album.collectionName }>
                        <Link
                          to={ `/album/${album.collectionId}` }
                          data-testid={ `link-to-album-${album.collectionId}` }
                          className={ style.link }
                        >
                          <img
                            src={ album.artworkUrl100 }
                            alt={ album.collectionName }
                          />
                          <p>
                            {' '}
                            {album.collectionName}
                          </p>
                        </Link>
                      </li>
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Search;
