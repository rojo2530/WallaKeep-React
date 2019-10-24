import React from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../contexts/user';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeBurguer: false,
    }
    this.toggleBurguer = this.toggleBurguer.bind(this);
    this.logout = this.logout.bind(this);
  }
 
  toggleBurguer() {
    this.setState({
      activeBurguer: !this.state.activeBurguer
    })
  }

  logout() {

  }



  render() {
    const { activeBurguer } = this.state;
    return (
      <React.Fragment>
      <nav className="navbar is-fixed-top">
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
              <Link className="navbar-item " to='/'><span role="img" aria-label="Home" className="bd-emoji">🏠</span> &nbsp;Home</Link>
              <Link className="navbar-item " to='/advert/create'><span role="img" aria-label="Profile" className="bd-emoji">📦</span> &nbsp;Create Advert</Link>
            </div>
          </div>
          <div class="navbar-item">
                    <div class="buttons">
                            <button onSubmit={this.logout} className="is-dark has-text-weight-bold is-normal button" href="/">
                               LogOut
                            </button>
                            
                    </div>
                </div>
        </nav>
      </React.Fragment>
    )
  }
}

Navbar.contextType = UserContext;
