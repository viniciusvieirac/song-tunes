import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favoriteSong: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = async () => {
    const { trackId } = this.props;
    this.setState({
      loading: true,
    });
    await addSong({ trackId });
    this.setState({
      loading: false,
      favoriteSong: true });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, favoriteSong } = this.state;
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
              checked={ favoriteSong }
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

};

export default MusicCard;
