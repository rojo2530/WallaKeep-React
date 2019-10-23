import React from 'react';
import SelectTag from './SelectTag';


export default function Searchbar ({ onChangeText, handlerSubmit, name, priceMin, priceMax, tag, type }) {
  return (
    <>
    <section className="hero is-dark">
    <div className="hero-body">
        <div className="container">
            <div className="column is-two-thirds-tablet is-paddingless">
                <h1 className="title">Get the merch</h1>
                    <h2 className="subtitle"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis ipsum eget dui bibendum condimentum et eget velit.</p></h2>
            </div>
        </div>
    </div>
    </section>

    <div className="container" style={{maxWidth: '1140px'}}>
    <form id="form-search" action="." onSubmit={handlerSubmit}>

        <div className="section">
            <div className="box box-search">
                <div className="field has-addons">
                  <div className="control is-expanded">
                    <input className="input is-dark has-text-centered" placeholder="Search Advert.."
                      value={name} name='name' onChange={onChangeText} id="search" type="search" 
                    />
                  </div>
                 
                </div>
                <div className="field has-addons">
                    <div className="control is-expanded" style={{width: '50%'}}>
                     <label className="label">Type</label>
                      <div className="select is-dark width100">
                        <select name='type' className="width100" 
                          value={type}  onChange={onChangeText}
                        >
                          <option value='all'>all</option>
                          <option value='buy'>buy</option>
                          <option value='sell'>sell</option>
                        </select>
                      </div>
                    </div>
                    <div className="control is-expanded" style={{width: '50%'}}>
                     <label className="label">Tag</label>
                     <SelectTag tag={tag} onChange={onChangeText}/>
                    </div>
                </div>
                <div className="field has-addons ">
                  <div className="control is-expanded">
                    <label className="label">Minimal Price</label>
                    <input className="input is-dark has-text-centered" id="search" type="number"
                      value={priceMin} name='priceMin' onChange={onChangeText}  placeholder="Price min.." 
                    />
                  </div>
                  <div className="control is-expanded ">
                    <label className="label">Maximal Price</label>
                    <input className="input is-dark has-text-centered is-fullwidth" 
                      value={priceMax} name='priceMax' onChange={onChangeText} id="search" type="number" placeholder="Price max.."
                    />
                  </div>
                 
                </div>
                <div className="field has-addons ">
                  <div className="control is-expanded">
                    <button className="button is-dark is-fullwidth">Search</button>
                  </div>
                </div>


                

              </div>
            
    </div>
    </form>
    </div>
    </>
  )
}
