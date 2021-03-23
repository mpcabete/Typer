import { tickStep } from 'd3-array';
import React, { Component } from 'react';

const langs = ["ko", "id", "is", "it", "ka", "mk", "ml", "lv", "ms", "nl", "pt_br", "ro", "ru", "sq", "sk", "tr", "uk", "vi", "ze_en", "ze_zh", "zh_cn", "ar", "bg", "bn", "bs", "ca", "el", "et", "eu", "fa", "fr", "gl", "he", "hr", "hu", "no", "lt", "pl", "pt", "sl", "sr", "sv", "th", "zh_tw", "cs", "da", "de", "en", "es", "fi"].sort()

class Settings extends Component {
  state = {
    solid_color: false,
    ignore_typos: false,
    lang: 'en',
    xAxis:'round'
  }

  checkboxChange = (e) => {
    this.setState({
      [e.target.name]: e.target.checked ? '1' : '0'
    })
    localStorage.setItem(e.target.name, e.target.checked ? '1' : '0')
  }

  selectChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })

    localStorage.setItem(e.target.name, e.target.value)
  }

  radioChange = (e) => {
    console.log([e.target.name],' : ', e.target.value)
    this.setState({
      [e.target.name]: e.target.value
      
    })

    localStorage.setItem(e.target.name, e.target.value)
  }


  render() {
    const { solid_color, ignore_typos, language, xAxis } = this.state

    return (<>
      <h1>Settings</h1>

      <form>
        <h2>Text Color</h2>


        <label htmlFor='solid_color'>Solid Color: </label>
        <input
          type="checkbox"
          checked={solid_color === '1'}
          onChange={this.checkboxChange}
          name='solid_color'
          id='solid_color'
        />

        <br />
      </form>
      <form>

        <h2>Gameplay</h2>


        <label htmlFor="ignore_typos">Ignore Typos:</label>
        <input
          type="checkbox"
          checked={ignore_typos === '1'}
          onChange={this.checkboxChange}
          name='ignore_typos'
          id='ignore_typos'
        />

        <br />



        <label htmlFor="language">Random Words Language: </label>
        <select
          name="language"
          id="language"
          value={language}
          onChange={this.selectChange}
        >
          {langs.map(l => (<option key={l} value={l}>{l}</option>))}
        </select>
        <br />
      </form>
      <form>

        <h2>Stats</h2>
        <h3>x Axis:</h3>
        <input type="radio" id="time" name="xAxis" onChange={this.radioChange} checked={xAxis === 'time'} value="time" />
        <label htmlFor="time">Time</label><br />
        <input type="radio" id="round" name="xAxis" onChange={this.radioChange} checked={xAxis === 'round'} value="round" />
        <label htmlFor="round">Round</label>
      </form>


    </>);
  }

  componentDidMount() {
    this.setState({
      solid_color: localStorage.solid_color,
      ignore_typos: localStorage.ignore_typos,
      language: localStorage.language ?? 'en',
      xAxis:localStorage.xAxis ?? 'round'
    })

  }
}

export default Settings;