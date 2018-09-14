import * as React from 'react';
import './App.css';

export const WEATHER_KEY = 'c42209f7f1cc21a210304e6a21d108ae';

interface IState {
  inputText: any,
  weatherDescription: any,
  errorMessage: any,
  temperature: any
}

class App extends React.Component<{}, IState> {

  constructor(props: any) {
    super(props);

    this.state = {
      inputText: '',
      weatherDescription: undefined,
      errorMessage: undefined,
      temperature: undefined,
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleTextSubmit = this.handleTextSubmit.bind(this);
  }

  public handleTextChange(event: any) {
    this.setState({inputText: event.target.value});
  }

  public handleTextSubmit(event: any) {
    this.query(this.state.inputText);
  }

  public query(cityName: any) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${WEATHER_KEY}`, {})
    .then((response: any) => {
      if (!response.ok) {
        this.setState({errorMessage: 'no response'})
      } else {
        response.json().then((data:any) =>
         this.setState({
           weatherDescription: data.weather[0].description,
           temperature: data.main.temp,
           errorMessage: ''
          })
       )}
    })
  }

  public render() {
    return (
      <div>
        <div>
          <h1>Weather App </h1>
          <p> Enter the name of the city you want to find the weather for </p>
        </div>
        <div>
         <form onSubmit={this.handleTextSubmit}>
          <label>
            City:
            <input type="text" value={this.state.inputText} onChange={this.handleTextChange} placeholder="Please enter the name of a city" />
          </label>
          <input type="submit" value="Find Weather" />
         </form>
        </div>
        <div>
          <p> Weather: {this.state.weatherDescription} </p>
          <p> Temperature: {this.state.temperature} </p>
          <p> Error: {this.state.errorMessage} </p>
        </div>
      </div>
    );
  }
}

export default App;
