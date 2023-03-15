import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

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
      <div data-testid="page-search">
        <Header />
        <form onSubmit={ this.handleSubmit }>
          <label>
            Buscar albuns de:
            <input
              value={ artist }
              type="text"
              onChange={ this.handleChange }
              data-testid="search-artist-input"
              placeholder="Digite o nome do artista"
            />
          </label>
          <button
            type="submit"
            disabled={ disabledButton }
            data-testid="search-artist-button"
          >
            Pesquisar

          </button>
          {loading && <Loading />}
          {Boolean(error) && <p>{error}</p>}
          {albuns.length > 0 && (
            <div>
              <p>
                Resultado de álbuns de:
                {' '}
                {artistName}
              </p>
              <ul>
                {albuns.map((album, index) => (
                  <div key={ index }>

                    <li
                      className="album"
                      key={ album.collectionName }
                    >
                      <Link
                        to={ `/album/${album.collectionId}` }
                        data-testid={ `link-to-album-${album.collectionId}` }
                      >
                        <img src={ album.artworkUrl100 } alt={ album.collectionName } />
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
          )}
        </form>
      </div>
    );
  }
}

export default Search;
