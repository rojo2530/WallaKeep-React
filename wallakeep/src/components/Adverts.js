// import Navbar from './Navbar';
import React from 'react';
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
       : <div className="columns is-multiline cards-group">
       {adverts.map(advert => (
         <div key={advert._id} className="column is-one-quarter-desktop is-half-tablet">
           <div className="card">
             <div className="card-image">
               <figure className="image is-4by3">
                 <img src={advert.photo ? `http://localhost:3001${advert.photo}` : 'https://bulma.io/images/placeholders/1280x960.png'} alt="Placeholder" />
               </figure>
             </div>
             <div className="card-content">
               <div className="media">
                 
             <div className="media-content">
               <p className="title is-4">{advert.name}</p>
             </div>
           </div>
           <div className="content">
             {advert.description.substring(0,150)}
             <br />
             <br />
             <time>{`Tags: ${advert.tags} `}</time>
             <p>Precio: <b>{advert.price}</b></p>
           </div>
         </div>
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
    // const { getFilms } = api(this.context.user.apikey);
      // console.log(target.name);
      
      
      this.setState({
        filter: {
          ...this.state.filter,
          [target.name]: target.value,
        }
  });
    
 
  }

  componentDidMount() {
    this.fetchAdverts();
    
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

    return (
      <React.Fragment>
        {console.log('Estado : ', this.state)}
        <Navbar onChangeText={this.changeText} handlerSubmit={this.handlerSubmit} 
        onChangePrice={this.changePrice} {...filter}/>

        {loading === true 
          ?  <Loading text='Fetching Adverts' />
          :  <AdvertsGrid adverts={adverts} text={this.state.text}/>
        }
      </React.Fragment>
    )
  } 
}