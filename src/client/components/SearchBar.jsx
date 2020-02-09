import React, { Component } from 'react';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className='search-bar'>
        <input type="text" placeholder="Search.."></input>
        <button>Submit</button>
      </div>
    );
  }
}