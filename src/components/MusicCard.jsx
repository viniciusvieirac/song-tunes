import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import style from './style/MusicCard.module.css';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favs: false,
    };
  }

  componentDidMount() {
    this.favoriteSongs();
  }

  favoriteSongs = async () => {
    const { songs } = this.props;
    const data = await getFavoriteSongs();
    const favorite = data.some((song) => song.trackId === songs.trackId);
    if (favorite) {
      this.setState({
        favs: true,
      });
    }
  };

  handleClick = async () => {
    const { favs } = this.state;
    const { songs } = this.props;
    this.setState({
      loading: true,
    });
    if (favs === false) {
      await addSong(songs);
      this.setState({
        loading: false,
        favs: true });
    } if (favs === true) {
      await removeSong(songs);
      this.setState({
        loading: false,
        favs: false,
      });
    }
    window.location.reload();
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, favs } = this.state;
    return (
      <div className="songs">
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        {loading ? (<Loading />) : (
          <label htmlFor="coracao">
            Favoritar
            <input
              type="checkbox"
              id="coracao"
              className={ style.inputCheck }
              data-testid={ `checkbox-music-${trackId}` }
              onClick={ this.handleClick }
              checked={ favs }
              readOnly
            />

          </label>

        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  songs: PropTypes.string.isRequired,
};

export default MusicCard;

// teste
