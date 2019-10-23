import React from 'react';
import PropTypes from 'prop-types';
import SelectTag from './SelectTag';
import { Link } from 'react-router-dom';





// function FormSearch ({ onChangeText, handlerSubmit, name, priceMin, priceMax, tag, type }) {
//   return (
    
//     <form id="form-search" action="." onSubmit={handlerSubmit}>
//       {console.log('Filtros: ', name, tag, priceMin, priceMax)}
//       <div className="navbar-start width100">
//         <div className="navbar-item width100 is-expanded">
//           <div className="field search width100">
//             <div className="control">
//             <input className="input is-primary" value={name} name='name' onChange={onChangeText} id="search" type="search" placeholder="Search Advert.." />
//             </div>
//           </div>
//         </div>
//         <div className="navbar-item width100 is-expanded">
//           <div className="field search width100">
//           <div className="select is-primary">
//             <select name='type' value={type}  onChange={onChangeText}>
//               <option value='all'>all</option>
//               <option value='buy'>buy</option>
//               <option value='sell'>sell</option>
//             </select>
//     </div>
//             </div>
//         </div>

//         <div className="navbar-item width100 is-expanded">
//           <div className="field search width100">
//             <div className="control">
//             <input className="input is-primary" 
//             value={priceMin} name='priceMin' onChange={onChangeText} id="search" type="number" placeholder="Price min.." />

            
//             </div>
//           </div>
//         </div>
//         <div className="navbar-item width100 is-expanded">
//           <div className="field search width100">
//             <div className="control">
//             <input className="input is-primary" 
//             value={priceMax} name='priceMax' onChange={onChangeText} id="search" type="number" placeholder="Price max.." />

            
//             </div>
//           </div>
//         </div>
        
//         <div className="navbar-item width100 is-expanded">
//           <div className="field search width100">
//             <div className="control">
//             <SelectTag tag={tag} onChange={onChangeText}/>
    
//             </div>
            
//           </div>
//         </div>

//         <div className="navbar-item">
//           <div className="field is-grouped">
//             <p className="control">
//               <button type="submit" className="button is-primary">
//                 <span className="icon">
//                   <i className="fa fa-search"></i>
//                 </span>
//                 <span>Search</span>
//               </button>
//             </p>
//           </div>
//         </div>
//       </div>
//     </form>
//  )
// }

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
            
              
              {/* <FormSearch  {...this.props}/> */}
            
          </div>
        </nav>
      </React.Fragment>
    )
  }
}

// Navbar.propTypes = {
//   showSearch: PropTypes.bool.isRequired,
// }