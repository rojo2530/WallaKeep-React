import React from 'react';

export default function Searchbar (props) {
  return (
    <>
    <section class="hero is-dark">
    <div class="hero-body">
        <div class="container">
            <div class="column is-two-thirds-tablet is-paddingless">
                <h1 class="title">Get the merch</h1>
                    <h2 class="subtitle"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis ipsum eget dui bibendum condimentum et eget velit.</p></h2>
            </div>
        </div>
    </div>
    </section>

    <div className="container" style={{maxWidth: '1140px'}}>
        <div id="flow">
            <span className="flow-1"></span>
            <span className="flow-2"></span>
            <span className="flow-3"></span>
        </div>
        <div className="section">
            <div className="box">
                <div className="field has-addons">
                  <div className="control is-expanded">
                    <input className="input has-text-centered" type="search" placeholder="Search Advert..." />
                  </div>
                 
                </div>
                <div className="field has-addons">
                    <div className="control is-expanded mr20">
                     <label className="label">Type</label>
                      <div className="select is-dark width100">
                        <select name='type' className="width100" >
                          <option value='all'>all</option>
                          <option value='buy'>buy</option>
                          <option value='sell'>sell</option>
                        </select>
                      </div>
                    </div>
                    <div className="control is-expanded ml20">
                     <label className="label">Tag</label>
                      <div className="select is-dark width100">
                        <select name='type' className="width100">
                          <option value='all'>all</option>
                          <option value='buy'>buy</option>
                          <option value='sell'>sell</option>
                        </select>
                      </div>
                    </div>
                </div>
                <div className="field has-addons ">
                  <div className="control is-expanded">
                    <label className="label">Minimal Price</label>
                    <input className="input is-dark has-text-centered" type="input" placeholder="Min Price..." />
                  </div>
                  <div className="control is-expanded ">
                    <label className="label">Maximal Price</label>
                    <input className="input is-dark has-text-centered is-fullwidth" type="input" placeholder="Max Price..." />
                  </div>
                 
                </div>
                <div className="field has-addons ">
                  <div className="control is-expanded">
                    <button className="button is-dark is-fullwidth">Search</button>
                  </div>
                </div>


                

              </div>
    </div>
    </div>
    </>
  )
}
