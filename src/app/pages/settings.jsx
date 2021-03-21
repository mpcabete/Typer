import { tickStep } from 'd3-array';
import React, { Component } from 'react';

class Settings extends Component {
  state = {
    solid_color:false,
    ignore_typos:false
  }
  change = (e)=>{
    this.setState({
      [e.target.name]:e.target.checked?'1':'0'
    })
    localStorage.setItem(e.target.name,e.target.checked?'1':'0')
  }
  render() {
    const {solid_color,ignore_typos} = this.state
    return ( <>
      <h1>Settings</h1>
      <h2>Text Color</h2>
      <ul>
        Solid Color
      <label className="switch">
          <input 
          type="checkbox"
          checked={solid_color==='1'} 
          onChange={this.change}
          name='solid_color'
          />
            <span className="slider round"></span>
      </label>
    </ul>
      <h2>Gameplay</h2>
      <ul>
        Ignore Typos
      <label className="switch">
          <input 
          type="checkbox"
          checked={ignore_typos==='1'} 
          onChange={this.change}
          name='ignore_typos'
          />
            <span className="slider round"></span>
      </label>
    </ul>
    </>);
  }

  componentDidMount(){
    this.setState({
      solid_color:localStorage.solid_color,
      ignore_typos:localStorage.ignore_typos
    })
  }
}

export default Settings;