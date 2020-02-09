import React, { Component } from 'react';

import './navbar.css';

import SearchBar from './SearchBar';


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