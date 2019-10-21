import React from 'react';
import { Dropdown } from "react-bulma-components";
import api from '../utils/api';

const { getTags } = api();

export default class SelectTag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: '',
      loading: true,
    }
  }

  componentDidMount() {
    getTags().then(tags => this.setState({
      tags: ['all', ...tags],
      loading: false
    })).catch(err => console.error(err));
  }

  render () {
    const { tags, loading } = this.state;
    if (loading) {
      return null;
    }
    const { tag , onChange } = this.props;
    return (
      <div className="select is-primary"  style={{ width: '100%'}} >
        {console.log('Select tag: ', this.props)}
        <select name='tag' style={{ width: '100%'}} value={tag} onChange={onChange}  >
          {tags.map(tagName => {
            return  <option key={tagName} value={tagName}>{tagName}</option>
          })}
        </select>
    </div>
    ) 
    
  }

}