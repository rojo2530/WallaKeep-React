// import Navbar from './Navbar';
import React from 'react';
import UserContext from '../contexts/user';
import { Link } from 'react-router-dom';
import { restoreUser } from '../utils/storage';
import Navbar from './Navbar';
import Loading from './Loading';
import Searchbar from './Searchbar';
import api from '../utils/api';
import Pagination from 'bulma-pagination-react';
import CaptureError from './CaptureError';

const { getAdverts } = api();

function AdvertsGrid({ adverts, onChangePage, currentPage, totalPages }) {
  return (
   <React.Fragment>
     
     {adverts.length === 0
       ? <CaptureError message='No results found!!' />
       : <div className="columns is-multiline cards-group grid-cards-container">
       {adverts.map(advert => (
         <div key={advert._id} className="column is-6-tablet is-3-desktop">
            <div className="card has-equal-height">
						 <div className="image has-spacing image is-3by2">
							 <img src={advert.photo.startsWith('/images') ? `http://localhost:3001${advert.photo}` : `${advert.photo}`} alt="Placeholder" />
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
                     <h6 className="vc">{advert.type}</h6>

								 </div>
						 </div>
						 <footer className="card-footer">
							<Link to={`/advert/detail/${advert._id}`} className="card-footer-item">Detail</Link>
							<Link to={`/advert/edit/${advert._id}`} className="card-footer-item">Edit</Link>
						 </footer>
				 </div>
				 
				 
								 </div>
     ))}
     
     
   </div>
  
  }
  
  
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
      errorMessage: '',
      currentPage: 1,
    }
    this.changeText = this.changeText.bind(this);
    this.handlerSubmit = this.handlerSubmit.bind(this);
    this.changePrice = this.changePrice.bind(this);
    this.handlerPage = this.handlerPage.bind(this);
  }

  handlerSubmit(event) {
    event.preventDefault();
    this.setState({
      loading: true,
      currentPage: 1,
    })
    this.fetchAdverts(this.state.filter);


  }

  handlerPage(currentPage) {
    this.setState({
      currentPage,
      loading: true,
    })

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

  componentDidUpdate (prevProps, prevState)  {
    if (prevState.currentPage !== this.state.currentPage) {
      this.fetchAdverts(this.state.filter, this.state.currentPage)
   }
   
  }

  fetchAdverts(filter, page) {
    getAdverts(filter, page)
      .then(res => this.setState({
        loading: false,
        adverts: res.results,
        
      })).catch(err => {
        console.log("Error caught in catch",err);
        this.setState({
          error: true,
          errorMessage: err.message,
          loading: false,
        })
      });
      
  }

  render () {
    const { loading , adverts, filter, totalPages, currentPage, error, errorMessage } = this.state;
    const { user } = this.context;
    console.log('Mi estado: ', this.state);

    if (Object.entries(user).length === 0) {
      return null;
    }

    if (error) {
      return <CaptureError message="Error fecthing Adverts" error={errorMessage} />
    }

    return (
      <>
        <Navbar  />
        <Searchbar 
          {...filter} 
          onChangeText={this.changeText}
          handlerSubmit={this.handlerSubmit} 
          onChangePrice={this.changePrice}
        /> 
        {loading === true 
          ?  <Loading text='Fetching Adverts' />
          :  <>
             <AdvertsGrid adverts={adverts} text={this.state.text} 
              totalPages={totalPages} currentPage={currentPage} 
              onChangePage={this.handlerPage}/>
              <div className="container-pagination">
                <Pagination
                          
                          currentPage={currentPage}
                          onChange={(page) =>{this.handlerPage(page)}} />
              </div>
              </>
             
            
        }
        
      </>
    )
  } 
}

Adverts.contextType = UserContext;