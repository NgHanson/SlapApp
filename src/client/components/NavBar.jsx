import React, { Component } from 'react';
import './navbar.css';

export default class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className='nav-bar'>
        <ul>
          <li>
            <div className='Logo'>
              SLAP.
           </div>
          </li>
          <li>
            <SearchBar></SearchBar>
          </li>
        </ul>
      </div>
    );
  }
}

class SearchBar extends Component {
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