import React from 'react';
import { Dropdown } from "react-bulma-components";
import api from '../utils/api';

const { getTags } = api();

export default class SelectTag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: 'Select tag',
      loading: true,
    }
  }

  componentDidMount() {
    getTags().then(tags => this.setState({
      tags: [this.state.tags, ...tags],
      loading: false
    })).catch(err => console.error(err));
  }

  render () {
    const { tags, loading } = this.state;
    const { tag , onChange } = this.props;
    if (loading) return null;
    return (
      <div className="select is-primary" style={{ width: '100%'}}>
        <select name='tag' style={{ width: '100%'}} value={tag} defaultValue='Select tag' onChange={onChange}  >
          {tags.map(tagName => {
            if (tagName === 'Select tag') {
              return <option disabled key={tagName} value={tagName}>{tagName}</option>
            }
            return  <option key={tagName} value={tagName}>{tagName}</option>
          })}
        </select>
    </div>
    ) 
    
  }

}