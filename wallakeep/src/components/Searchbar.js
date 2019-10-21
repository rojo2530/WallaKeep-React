import React from 'react';

export default function Searchbar (props) {
  return (
    <form id="register-form">
    <div class="field">
      <label class="label" for="username">Username</label>
      <div class="control has-icons-left">
        <input class="input" type="text" placeholder="Username" name="username"/><span class="icon is-left"><i class="fa">user</i></span>
      </div>
      <label class="label" for="email">Email</label>
      <div class="control has-icons-left">
        <input class="input" type="email" placeholder="Email" name="email"/><span class="icon is-left"><i class="fa">envelope-square</i></span>
      </div>
      <div class="columns row-one">
        <div class="column">
          <label class="label" for="firstName">First Name</label>
          <div class="control">
            <input class="input" type="text" placeholder="First Name" name="firstName"/>
          </div>
        </div>
        <div class="column">
          <label class="label" for="lastName">Last Name</label>
          <div class="control">
            <input class="input" type="text" placeholder="Last Name" name="lastName"/>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <label class="label" for="password">Password</label>
          <div class="control has-icons-left">
            <input class="input" type="password" placeholder="Password" name="password"/><span class="icon is-left"><i class="fa">key</i></span>
          </div>
        </div>
        <div class="column">
          <label class="label" for="retypePassword">Re-Type Password</label>
          <div class="control has-icons-left">
            <input class="input" type="password" placeholder="Confirm Password" name="retypePassword"/><span class="icon is-left"><i class="fa">lock</i></span>
          </div>
        </div>
      </div>
      <div class="field is-grouped">
        <div class="control">
          <button class="button is-medium">Login</button>
        </div>
        <div class="control">
          <button class="button is-primary is-medium" type="submit">Register</button>
        </div>
      </div>
    </div>
  </form>
  )
}
