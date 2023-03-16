import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

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
    const { songs } = this.props;
    this.setState({
      loading: true,
    });
    await addSong(songs);
    this.setState({
      loading: false,
      favs: true });
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
          <label>
            Favorita
            <input
              type="checkbox"
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
