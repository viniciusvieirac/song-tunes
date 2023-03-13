import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      disabledButton: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  handleChange({ target }) {
    const { value } = target;
    this.setState({
      name: value,
    }, this.validateForm);
  }

  validateForm() {
    const { name } = this.state;
    const MIN_VALUE = 2;
    if (name.length >= MIN_VALUE) {
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
    const { name, disabledButton } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            value={ name }
            type="text"
            onChange={ this.handleChange }
            data-testid="search-artist-input"
          />
          <button
            type="submit"
            disabled={ disabledButton }
            data-testid="search-artist-button"
          >
            Pesquisar

          </button>
        </form>
      </div>
    );
  }
}

export default Search;
