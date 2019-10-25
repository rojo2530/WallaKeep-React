import React from 'react';
import UserContext from '../contexts/user';
import { restoreUser } from '../utils/storage';
import Loading from './Loading';
import api from '../utils/api';
import Navbar from './Navbar';
import Footer from './Footer';
import { FaCoins, FaShoppingCart, FaTruck } from 'react-icons/fa';

const { getAdvertDetail } = api();

export default class DetailAdvert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      advert: {
        name: '',
        description: '',
        tags: [],
        price: '',
        type: 'sell',
        photo: ''
      },
      loading: true
    }
  }

  componentDidMount() {
    const user = this.updateFilterFromStorage() || this.context.user;
    if (Object.entries(user).length === 0) {
      return this.props.history.push('/register');
    }
    const { id } = this.props.match.params;
    getAdvertDetail(id).then(advert => this.setState({
      advert,
      loading: false,
    })).catch(({ response: { data } }) => {
      console.log('Error en ruta: ', data.success, data.error.status);
      if (!data.success && (data.error.status === 422 || data.error.status === 404)) {
        this.setState({ loading: false });
        this.props.history.push('/notFound');
      }
    })
  }

  updateFilterFromStorage() {
    const user = restoreUser();
    if (user !== null) {
      this.context.updateUser(user);
    }
    return user;
  }

  render() {
    const { advert, loading } = this.state;
    const { user } = this.context;

    if (Object.entries(user).length === 0) {
      return null;
    }
    if (loading) {
      return <Loading text='Fetching detail Advert' />
    }
    return (
      <>
      <Navbar />
        <section className="section detail-container has-spacing section-gray">
          <div className="container">
            <div className="columns">
              <div className="column">
                <div className="image is-5by4">
                  <img src={advert.photo.startsWith('/images') ? `http://localhost:3001${advert.photo}` : `${advert.photo}`} alt="Placeholder" />
                </div>
              </div>
              <div className="column">
                <div className="card">
                  <div className="card-content">
                    <h1 className="title">{advert.name}</h1>
                    <div className="content">
                      <p className="is-size-5">€{advert.price}</p>
                      <h6 className="vc">{advert.type}</h6>
                      <div className="has-spacing-bottom">
                        {advert.tags.map(tag => (
                          <span key={tag} className="tag has-small-spacing-top is-medium">{tag}</span>
                        ))}
                      </div>

                      <p>{advert.description}</p>                            <p className="buttons">
                        <a className="button is-link has-icons-left is-medium" href="/">
                          <span className="icon">
                            <FaShoppingCart />
                          </span>
                          <span>Add to basket</span>
                        </a>
                      </p>
                      <hr />
                      <div className="media">
                        <div className="media-left">
                          <span className="icon">
                            <FaCoins />
                          </span>

                        </div>
                        <div className="media-content">
                          <p className="title is-5"> Money Back Guarantee</p>
                          <p className="subtitle is-5">Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae</p>
                        </div>
                      </div>
                      <hr />
                      <div className="media">
                        <div className="media-left">
                          <span className="icon">
                            <FaTruck />
                          </span>

                        </div>
                        <div className="media-content">
                          <p className="title is-5"> International Delivery</p>
                          <p className="subtitle is-5">Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae</p>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </>
    )
  }
}

DetailAdvert.contextType = UserContext;