import { tickStep } from 'd3-array';
import React, { Component } from 'react';

const langs = ["ko","id","is","it","ka","mk","ml","lv","ms","nl","pt_br","ro","ru","sq","sk","tr","uk","vi","ze_en","ze_zh","zh_cn","ar","bg","bn","bs","ca","el","et","eu","fa","fr","gl","he","hr","hu","no","lt","pl","pt","sl","sr","sv","th","zh_tw","cs","da","de","en","es","fi"].sort()

class Settings extends Component {
  state = {
    solid_color:false,
    ignore_typos:false,
    lang:'en'
  }

  checkboxChange = (e)=>{
    this.setState({
      [e.target.name]:e.target.checked?'1':'0'
    })
    localStorage.setItem(e.target.name,e.target.checked?'1':'0')
  }

  selectChange = (e)=>{
    this.setState({
      [e.target.name]:e.target.value
    })
    
    localStorage.setItem(e.target.name,e.target.value)
  }


  render() {
    const {solid_color,ignore_typos,language} = this.state

    return ( <>
      <h1>Settings</h1>
      <h2>Text Color</h2>
      <ul>
        Solid Color:  
      <label className="switch">
          <input 
          type="checkbox"
          checked={solid_color==='1'} 
          onChange={this.checkboxChange}
          name='solid_color'
          />
            <span className="slider round"></span>
      </label>
    </ul>
      <h2>Gameplay</h2>
      <ul>
        Ignore Typos:  
      <label className="switch">
          <input 
          type="checkbox"
          checked={ignore_typos==='1'} 
          onChange={this.checkboxChange}
          name='ignore_typos'
          />
            <span className="slider round"></span>
      </label>
    
    </ul>
    <ul>
      <label htmlFor="language">Random Words Language: </label>
        <select 
          name="language" 
          id="language" 
          value={language} 
          onChange={this.selectChange}
        >
          {langs.map(l=> (<option key={l} value={l}>{l}</option>))}
        </select>
      
    </ul>
    </>);
  }

  componentDidMount(){
    this.setState({
      solid_color:localStorage.solid_color,
      ignore_typos:localStorage.ignore_typos,
      language:localStorage.language??'en'
    })

  }
}

export default Settings;