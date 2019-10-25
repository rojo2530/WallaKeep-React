import React from 'react';
import SelectTag from './SelectTag';
import UserContext from '../contexts/user';
import { restoreUser } from '../utils/storage';
import { saveUser } from '../utils/storage';
import { FaUser, FaTag } from 'react-icons/fa';

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: '',
        lastname: '',
        tag: 'all',
      }
    };
    this.onChangeField = this.onChangeField.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeField(event) {
    const { name, value } = event.target;
    this.setState(({ user }) => ({
      user: {
        ...user,
        [name]: value
      }
    }));
  }

  isInvalidValidForm() {
    return this.state.user.name.trim().length <= 3 ||
      this.state.user.lastname.trim().length <= 3 
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.isInvalidValidForm()) {
      return false;
    }
    this.context.updateUser(this.state.user);
    this.props.history.push('/');

    saveUser(this.state.user);
    return true;
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
    if (Object.entries(user).length !== 0) {
      return this.props.history.push('/');
    }
  }

  render () {
    const { user } = this.state;
    if (Object.entries(this.context.user).length !== 0) {
      return null;
    }
    return (
      <section className="hero is-fullheight is-dark">
        <div className="hero-body">
          <div className="container">
            <div className="column is-4 is-offset-4 box">
              <h1 className="avatar has-text-centered section"><span aria-label="logo" role="img" style={{fontSize: '5rem'}}>🛒</span></h1>
              <div className="login-form">
                <form onSubmit={this.onSubmit}>
                  
                  <div className="field">
                    <label className="label">Name</label>
                    <div className="control has-icons-left">
                      <input name="name" className="input" value={user.name} onChange={this.onChangeField} type="text" placeholder="e.g Alex Smith" />
                      <span className="icon is-small is-left"><FaUser /></span>
                    </div>
                    <p className="help">The name is invalid, is too short</p>
                  </div>
                  
                  <div className="field">
                    <label className="label">Last name</label>
                    <div className="control has-icons-left">
                      <input name="lastname" className="input" type="text" value={user.surname} onChange={this.onChangeField}  placeholder="e.g. alex.smith" />
                      <span className="icon is-small is-left"><FaUser /></span>
                    </div>
                    <p className="help">The last name is invalid, is too short</p>
                  </div>

                  <div className="field">
                    <label className="label">Tag</label>
                    <div className="control has-icons-left">
                    <SelectTag  tag={user.tag} onChange={this.onChangeField}/>
                    <span className="icon is-small is-left"><FaTag /></span>
                    </div>
                  </div>
                
                  <div className="field">
                    <p className="control">
                      <button className="button is-dark is-medium is-fullwidth is-disabled"  disabled={this.isInvalidValidForm()}>Sign Up</button>
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
    )
  }
}

Register.contextType = UserContext;
