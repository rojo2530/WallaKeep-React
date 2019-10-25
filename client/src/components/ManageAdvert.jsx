import React from 'react';
import UserContext from '../contexts/user';
import { restoreUser } from '../utils/storage';
import SelectMultiple from './SelectMultiple';
import Navbar from './Navbar';
import Footer from './Footer';
import { notification } from 'antd';
import api from '../utils/api';
import { FaAdversal, FaUser, FaRegFileWord, FaEuroSign, FaImage } from 'react-icons/fa';

const { createAdvert, getAdvertDetail, updateAdvert } = api();

const openNotification = (message, description) => {
  notification.open({
    message,
    description,
    type: 'success',
    style: { backgroundColor: 'green' }
  });
}

export default class ManageAdvert extends React.Component {
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
      loading: true,
      edit: false,
      error: false,
    };
    this.onChangeField = this.onChangeField.bind(this);
    this.onChangeTag = this.onChangeTag.bind(this);
    this.isInvalidForm = this.isInvalidForm.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  updateFilterFromStorage() {
    const user = restoreUser();
    if (user !== null) {
      this.context.updateUser(user);
    }
    return user;
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.state.edit) {
      return updateAdvert(this.state.advert._id, this.state.advert)
        .then((res) => {
          openNotification('Advert update with sucess', `The advert was updated correctly`)
        })

    }
    createAdvert(this.state.advert).then(res => {
      openNotification('Advert created with success', `The advert was created correctly`);
      this.setState({   //Una vez creamos el anuncio dejamos el formulario en blanco
        advert: {
          name: '',
          description: '',
          tags: [],
          price: '',
          type: 'sell',
          photo: ''
        },
      })
    });
  }

  componentDidMount() {
    const user = this.updateFilterFromStorage() || this.context.user;
    if (Object.entries(user).length === 0) {
      return this.props.history.push('/register');
    }
    if (this.props.history.location.pathname.includes('/advert/edit')) {
      const { id } = this.props.match.params;
      return getAdvertDetail(id).then(advert => this.setState({
        advert,
        loading: false,
        edit: true,
      })).catch(({ response: { data } }) => {
        if (!data.success && data.error.status === 422) {
          this.props.history.push('/rutanoencontrada');
        } else {

        }
      });
    }
    this.setState({
      loading: false,
    })
  }

  onChangeField(event) {
    const { name, value } = event.target;
    this.setState({
      advert: {
        ...this.state.advert,
        [name]: value
      }
    });
  }

  onChangeTag(value) {
    this.setState({
      advert: {
        ...this.state.advert,
        tags: [...value]
      }
    })
  }

  isInvalidForm() {
    const { advert } = this.state;
    return advert.name.trim().length <= 3 ||
      advert.description.trim().length <= 3 ||
      advert.price < 1 ||
      advert.photo.trim().length <= 3 ||
      advert.type.trim().length < 3 ||
      advert.tags.length < 1
  }

  render() {
    const { advert, loading, edit } = this.state;
    const { user } = this.context;

    if (Object.entries(user).length === 0) {
      return null;
    }
    if (loading) {
      return null;
    }
    return (
      <>
        <Navbar />
        <section className="hero" style={{ marginTop: '50px' }}>
          <div className="hero-body">
            <div className="container">
              <div className="column is-4 is-offset-4 box">
                <h1 className="avatar has-text-centered section"><FaAdversal size={52} /></h1>
                <div className="login-form">
                  <form onSubmit={this.onSubmit}>
                    <div className="field">
                      <label className="label">Name</label>
                      <div className="control has-icons-left">
                        <input name="name" className="input" value={advert.name} onChange={this.onChangeField} type="text" placeholder="Name..." />
                        <span className="icon is-small is-left"><FaUser /></span>
                      </div>
                      <p className="help">The name is invalid, is too short</p>
                    </div>
                    <div className="field">
                      <label className="label">Description</label>
                      <div className="control has-icons-left">
                        <input name="description" className="input" type="text" value={advert.description} onChange={this.onChangeField} placeholder="Description  .." />
                        <span className="icon is-small is-left"><FaRegFileWord /></span>
                      </div>
                      <p className="help">The description is invalid, is too short</p>

                    </div>

                    <div className="field">
                      <label className="label">Price</label>
                      <div className="control has-icons-left">
                        <input name="price" className="input" type="number" value={advert.price} onChange={this.onChangeField} placeholder="Price.." />
                        <span className="icon is-small is-left"><FaEuroSign /></span>
                      </div>
                      <p className="help">The price is invalid, is too short</p>

                    </div>

                    <div className="field">
                      <label className="label">Photo</label>
                      <div className="control has-icons-left">
                        <input name="photo" className="input" type="text" value={advert.photo} onChange={this.onChangeField} placeholder="Photo..." />
                        <span className="icon is-small is-left"><FaImage /></span>
                      </div>
                      <p className="help">The description is invalid, is too short</p>

                    </div>

                    <div className="field">
                      <label className="label">Tags</label>
                      <div className="control has-icons-left">
                        <SelectMultiple name='tags' value={advert.tags} onChange={this.onChangeTag} />
                      </div>
                    </div>

                    <div className="field">
                      <label className="label">Type</label>
                      <div className="control has-icons-left">
                        <div className="select is-fullwidth">
                          <select name='type' value={advert.type} onChange={this.onChangeField}>
                            <option value='buy'>buy</option>
                            <option value='sell'>sell</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="field">
                      <p className="control">
                        <button className="button is-dark is-medium is-fullwidth is-disabled" disabled={this.isInvalidForm()}>{edit === true ? 'Update' : 'Create'}</button>
                      </p>
                    </div>
                  </form>
                </div>
                <hr />
                <div className="forgot-password">
                  <p className="has-text-centered">Remember, the fields can not be empty</p>
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

ManageAdvert.contextType = UserContext;