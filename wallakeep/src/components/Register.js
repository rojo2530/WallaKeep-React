import React from 'react';
import SelectTag from './SelectTag';

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: '',
        lastname: '',
        tag: '',
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
    console.log('Entra');
    return this.state.user.name.trim().length <= 3 ||
      this.state.user.lastname.trim().length <= 3 || 
      this.state.user.tag.trim().length < 1; 
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.isInvalidValidForm()) {
      return false;
    }

    this.props.history.push('/');

    // saveUser(this.state.user);
    return true;
  }

  render () {
    return (
      <section className="hero is-fullheight">
  <div className="hero-body">{console.log(this.state)}
    <div className="container">
      <div className="column is-4 is-offset-4 box">
        <h1 className="avatar has-text-centered section"><i className="fas fa-address-book fa-5x"></i></h1>
        <div className="login-form">
          <form role="form" onSubmit={this.onSubmit}>
            <div className="field">
              <label className="label">Name</label>
              <div className="control has-icons-left">
                <input name="name" className="input" value={this.state.user.name} onChange={this.onChangeField} type="text" placeholder="e.g Alex Smith" /><span className="icon is-small is-left"><i className="fas fa-user"></i></span>
              </div>
              <p className="help">The name is invalid, is too short</p>
            </div>
            <div className="field">
              <label className="label">Last name</label>
              <div className="control has-icons-left">
                <input name="lastname" className="input" type="text" value={this.state.user.surname} onChange={this.onChangeField}  placeholder="e.g. alex.smith" /><span className="icon is-small is-left"><i className="fas fa-user"></i></span>
              </div>
              <p className="help">The last name is invalid, is too short</p>

            </div>
            <div className="field">
              <label className="label">Tag</label>
              <div className="control has-icons-left">
              <SelectTag  value={this.state.user.tag} onChange={this.onChangeField}/><span className="icon is-small is-left"><i className="fas fa-tag"></i></span>
              </div>
            </div>
           
           
            <div className="field">
              <p className="control">
                <button className="button is-primary is-medium is-fullwidth is-disabled"  disabled={this.isInvalidValidForm()}>Sign Up</button>
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
