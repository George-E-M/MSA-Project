import * as React from 'react';
import './App.css';

export const WEATHER_URL = 'api.openweathermap.org/data/2.5/';
export const WEATHER_KEY = 'c42209f7f1cc21a210304e6a21d108ae';

interface IState {
  inputText: any,
  weatherDescription: any,
  temperature: any,
}

class App extends React.Component<{}, IState> {

  constructor(props: any) {
    super(props);

    this.state = {
      inputText: '',
      weatherDescription: undefined,
      temperature: undefined,
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleTextSubmit = this.handleTextSubmit.bind(this);
  }

  public handleTextChange(event: any) {
    this.setState({inputText: event.target.value});
  }

  public handleTextSubmit(event: any) {
    // alert('A name was submitted: ' + this.state.inputText);
    // event.preventDefault();
    this.query(this.state.inputText);
  }

  public query(cityName: any) {
    fetch('api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=$' + WEATHER_KEY, {

    })
    .then((response: any) => {
      this.setState({
        weatherDescription: response.weather[0].description,
        temperature: response.main.temp
      })
      // if (!response.ok) {
      //   this.setState({apiResults: response.statusText})
      // } else {
      //   response.json().then((data:any) => this.setState({apiResults: data[0].class}))
      // }
      // return response
    })
  }

  public render() {
    return (
      <form onSubmit={this.handleTextSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.inputText} onChange={this.handleTextChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default App;
