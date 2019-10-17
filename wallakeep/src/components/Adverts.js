// import Navbar from './Navbar';
import React from 'react';
import Navbar from './Navbar';
import Loading from './Loading';
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
                 <div className="media-left">
                   <figure className="image is-48x48">
                     <img src='https://bulma.io/images/placeholders/96x96.png' alt="Placeholder" />
                   </figure>
                 </div>
             <div className="media-content">
               <p className="title is-4">{advert.name}</p>
             </div>
           </div>
           <div className="content">
             {advert.description.substring(0,150)}
             <br />
             <br />
             <time>{`Release Date: `}</time>
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
      textSearch: '',
      error: false,
      currentPage: 1,
      totalPages: 50
    }
    this.changeText = this.changeText.bind(this);
   
  }

  changeText({ target }) {
    // const { getFilms } = api(this.context.user.apikey);
    
    if (target.value.trim().length > 0 ) {
      this.setState({
        textSearch: target.value,
      });
    }
    //Cuando nos metemos en el buscador y tecleamos nos vamos al home
    // this.goPage();
  
    // if (event.target.value.trim().length > 0 ) {
    //   return this.fetchFilms(event.target.value, this.context.user.birthDate, this.state.currentPage)
    // } 
    
    // this.discoverFilms(this.context.user);
  }

  componentDidMount() {
    this.fetchAdverts()
  }

  fetchAdverts() {
    getAdverts()
      .then(res => this.setState({
        loading: false,
        adverts: res.results
      }))
      .catch(err => console.error('Error in fetching Adverts: ', err));
  }




  
  render () {
    const { loading , adverts } = this.state;

    return (
      <React.Fragment>
        <Navbar onChangeText={this.changeText} />
        {loading === true 
          ?  <Loading text='Fetching Adverts' />
          :  <AdvertsGrid adverts={adverts} text={this.state.text}/>
        }
      </React.Fragment>
    )
  } 
}