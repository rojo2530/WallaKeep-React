import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function FormSearch ({ onChangeText, remaningQueries, text }) {
  return (
    <form id="form-search" action=".">
      <div className="navbar-start width100">
        <div className="navbar-item width100 is-expanded">
          <div className="field search width100">
            <div className="control">
            <input className="input is-primary" value={text} onChange={onChangeText} id="search" type="search" placeholder="Search an Advert.." />
            </div>
          </div>
        </div>
        <div className="navbar-item width100 is-expanded">
          <div className="field search width100">
            <div className="control">
            <input className="input is-primary" value={text} onChange={onChangeText} id="search" type="number" placeholder="Price" />
            </div>
          </div>
        </div>
        <div class="navbar-item">
          <div class="field is-grouped">
            <p class="control">
              <button type="submit" class="button is-primary">
                <span class="icon">
                  <i class="fa fa-search"></i>
                </span>
                <span>Search</span>
              </button>
            </p>
          </div>
        </div>
      </div>
    </form>
 )
}

// FormSearch.propTypes = {
//   onChangeText: PropTypes.func.isRequired,
//   remaningQueries: PropTypes.number.isRequired
// }

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeBurguer: false,
    }
    this.toggleBurguer = this.toggleBurguer.bind(this);
  }
 
  toggleBurguer() {
    this.setState({
      activeBurguer: !this.state.activeBurguer
    })
  }

  render() {
    const { activeBurguer } = this.state;
    const { showSearch } = this.props;
    return (
      <React.Fragment>
      <nav className="navbar">
          <div className="navbar-brand">
            <a className="navbar-item " href="/">
              <span role="img" aria-label="Movies" className="bd-emoji">🛒</span> &nbsp;<span className="title-logo">WallaKeep</span>
            </a>
            <div className={`navbar-burger burger ${activeBurguer === true ? 'is-active' : null}`} onClick={this.toggleBurguer} data-target="navMenubd-example">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div id="navMenubd-example" className={`navbar-menu ${activeBurguer === true ? 'is-active' : null}`}>
            <div className="navbar-start">
              <a className="navbar-item " to='/'><span role="img" aria-label="Home" className="bd-emoji">🏠</span> &nbsp;Home</a>
            </div>
            
              <FormSearch text={this.props.text} onChangeText={this.props.onChangeText} remaningQueries={this.props.remaningQueries} imageBaseURL={this.props.imageBaseURL} text={this.props.text}/>
             
            
          </div>
        </nav>
      </React.Fragment>
    )
  }
}

// Navbar.propTypes = {
//   showSearch: PropTypes.bool.isRequired,
// }