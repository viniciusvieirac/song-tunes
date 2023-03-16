import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      songs: [],
      album: {},
      loading: false,
    };
    this.fetchAlbum = this.fetchAlbum.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    this.fetchAlbum();
  }

  fetchAlbum = async () => {
    this.setState({
      loading: true,
    });
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const response = await getMusics(id);
    const [album, ...songs] = response;
    this.setState({
      songs,
      album,
      loading: false,
    });
  };

  render() {
    const { album, loading, songs } = this.state;
    if (loading === true) return <Loading />;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <img
            src={ album.artworkUrl100 }
            alt={ album.collectionName }
          />
          <h1 data-testid="album-name">{album.collectionName}</h1>
          <h2 data-testid="artist-name">{album.artistName}</h2>
        </div>
        <div>
          {songs.map((song) => (
            <MusicCard
              key={ song.trackName }
              trackName={ song.trackName }
              previewUrl={ song.previewUrl }
              trackId={ song.trackId }
              songs={ song }
            />
          ))}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default Album;
