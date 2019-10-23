// import Navbar from './Navbar';
import React from 'react';
import UserContext from '../contexts/user';
import { Link } from 'react-router-dom';
import { restoreUser } from '../utils/storage';
import Navbar from './Navbar';
import Loading from './Loading';
import Searchbar from './Searchbar';
import api from '../utils/api';

const { getAdverts } = api();




function NoResults ({ message, error }) {
	return (
		<div className="notification is-danger" id="no-results">
			<p>{message}</p>
			<p>{error}</p>
		</div>
	)
}

function AdvertsGrid({ adverts }) {
  return (
   <React.Fragment>
     {adverts.length === 0
       ? <NoResults message='No results found!!' />
       : <div className="columns is-multiline cards-group grid-cards-container">
       {adverts.map(advert => (
         <div key={advert._id} className="column is-6-tablet is-3-desktop">
            <div className="card has-equal-height">
						 <div className="image has-spacing image is-3by2">
							 <img src={advert.photo ? `http://localhost:3001${advert.photo}` : 'https://bulma.io/images/placeholders/1280x960.png'} alt="Placeholder" />
						 </div>
						 <div className="card-content has-equal-height">
								 <div className="content">
												 <h4 className="title has-small-spacing-bottom">{advert.name}</h4>
														 <div className="has-spacing-bottom">
												 {advert.tags.map(tag => (
													 	<span key={tag} className="tag has-small-spacing-top is-medium">{tag}</span>
												 ))}	
												 
												 
								 </div>
																		 
										 <p className="buttons">
												 <a className="button is-link has-icons-left" href="/products/tattoo/">
														 <span className="icon">
																 <i className="fas fa-shopping-cart"></i>
														 </span>
														 <span>{advert.price}€</span>
                             
												 </a>
										 </p>
                     <h6 class="vc">{advert.type}</h6>

								 </div>
						 </div>
						 <footer className="card-footer">
							<Link to={`/advert/detail/${advert._id}`} className="card-footer-item">Detail</Link>
							<Link to={`/advert/edit/${advert._id}`} className="card-footer-item">Edit</Link>
						 </footer>
				 </div>
				 
				 
								 </div>
     ))}
     
   </div>}
  
 </React.Fragment>
 )
}

export default class Adverts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      adverts: [],
      filter: {
        name: '',
        type: '',
        tag: '',
        priceMin: '',
        priceMax: '',
      },
      error: false,
      currentPage: 1,
      totalPages: 50
    }
    this.changeText = this.changeText.bind(this);
    this.handlerSubmit = this.handlerSubmit.bind(this);
    this.changePrice = this.changePrice.bind(this);
  }

  handlerSubmit(event) {
    event.preventDefault();
    const { name } = this.state.filter;
    this.setState({
      loading: true,
    })
    this.fetchAdverts(name);


  }

  changePrice(value) {
    this.setState({
      filter: {
        ...this.state.filter,
        minPrice: value 
      }
    });
  }

  changeText({ target }) {
    this.setState({
      filter: {
        ...this.state.filter,
        [target.name]: target.value,
      }
    });
  }

  updateFilterFromStorage () {
    const user = restoreUser();
    if (user !== null) {
      this.context.updateUser(user);
    }
    return user;
  }
  

  componentDidMount() {
    const user = this.updateFilterFromStorage() || this.context.user;
    if (Object.entries(user).length === 0) {
      return this.props.history.push('/register');
    }
    this.setState({
      filter: {
        ...this.state.filter,
        tag: user.tag,
      }
      }, () => this.fetchAdverts(this.state.filter)
    );
  }

  fetchAdverts() {
    getAdverts(this.state.filter)
      .then(res => this.setState({
        loading: false,
        adverts: res.results
      }))
      .catch(err => console.error('Error in fetching Adverts: ', err));
  }

  render () {
    const { loading , adverts, filter } = this.state;
    const { user } = this.context;

    if (Object.entries(user).length === 0) {
      return null;
    }

    return (
      <React.Fragment>
        {console.log('Estado : ', this.state)}
        <Navbar  />
        <Searchbar 
          {...filter} 
          onChangeText={this.changeText}
          handlerSubmit={this.handlerSubmit} 
          onChangePrice={this.changePrice}
        /> 
        {loading === true 
          ?  <Loading text='Fetching Adverts' />
          :  <AdvertsGrid adverts={adverts} text={this.state.text}/>
        }
      </React.Fragment>
    )
  } 
}

Adverts.contextType = UserContext;