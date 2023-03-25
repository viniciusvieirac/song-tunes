import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import style from './Style/Favorites.module.css';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      arrayofSongs: [],
      loading: false,
      favs: true,
    };
  }

  componentDidMount() {
    this.fetchSongsFavorites();
  }

  fetchSongsFavorites = async () => {
    this.setState({
      loading: true,
    });
    const response = await getFavoriteSongs();
    console.log(response);
    this.setState({
      arrayofSongs: response,
      loading: false,
    });
  };

  render() {
    const { arrayofSongs, loading, favs } = this.state;
    return (
      <div data-testid="page-favorites" className={ style.pageFavorites }>
        <Header />
        <div>
          {loading ? <Loading /> : (
            <div className={ style.musics }>
              {arrayofSongs.map((song) => (
                <MusicCard
                  key={ song.trackName }
                  trackName={ song.trackName }
                  previewUrl={ song.previewUrl }
                  trackId={ song.trackId }
                  favs={ favs }
                  songs={ song }
                />
              ))}

            </div>

          ) }
        </div>
      </div>
    );
  }
}

export default Favorites;
