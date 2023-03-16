import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      arrayofSongs: [],
      loading: false,
    };
    this.fetchSongsFavorites = this.fetchSongsFavorites.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
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
    return (
      <div data-testid="page-favorites">
        <Header />
        <div />
      </div>
    );
  }
}

export default Favorites;
