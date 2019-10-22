import React from 'react';
import ReactDOM from 'react-dom';
import { Select } from 'antd';
import api from '../utils/api';

const { Option } = Select;
const { getTags } = api();


const tags = ['work', 'mobile', 'work', 'lifestyle'];



function handleChange(value) {
  console.log(`selected ${value[0]}`);
}

export default class SelectMultiple extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: '',
      loading: true,
    
    }
  }

  componentDidMount() {
    getTags().then(tags => this.setState({
      tags: [...tags],
      loading: false
    })).catch(err => console.error(err));
  }


  render () {
    const { tags, loading } = this.state;

    if (loading) {
      return null;
    }
    return (
      <Select
        mode="multiple"
        style={{ width: '100%' }}
        placeholder="Please select"
        value={this.props.value}
        onChange={this.props.onChange}
      >
      {tags.map(tag => (
      <Option key={tag}>{tag}</Option>  

      ))}  

      </Select>

    )
  }

}
