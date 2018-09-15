import * as React from 'react';
import './css/styles.css';

export const WEATHER_KEY = 'c42209f7f1cc21a210304e6a21d108ae';

interface IState {
  inputText: any,
  location: any,
  weatherDescription: any,
  temperature: any,
  windSpeed: any,
  errorMessage: any
}

class App extends React.Component<{}, IState> {

  constructor(props: any) {
    super(props);

    this.state = {
      inputText: '',
      location: undefined,
      weatherDescription: undefined,
      temperature: undefined,
      windSpeed: undefined,
      errorMessage: undefined
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleTextSubmit = this.handleTextSubmit.bind(this);
  }

  public handleTextChange(event: any) {
    this.setState({inputText: event.target.value});
  }

  public handleTextSubmit(event: any) {
    event.preventDefault();
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.inputText}&appid=${WEATHER_KEY}`, {})
    .then((response : any) => {
      if (!response.ok) {
        this.setState({
          location: undefined,
          weatherDescription: undefined,
          temperature: undefined,
          windSpeed: undefined,
          errorMessage: "Could not find city"
        })
      } else {
        response.json().then((data:any) =>
         this.setState({
           location: data.name + ", " + data.sys.country,
           weatherDescription: data.weather[0].description,
           temperature: data.main.temp,
           windSpeed: data.wind.speed,
           errorMessage: ''
          })
       )}
    })
  }


  public render() {
    return (
      <div className="centreText">
        <div className="titles">
          <h1>Weather App </h1>
          <p> Enter the name of the city you want to find the weather for </p>
        </div>
        <div className="form">
         <form onSubmit={this.handleTextSubmit}>
            <input type="text" value={this.state.inputText} onChange={this.handleTextChange} 
            placeholder="Please enter the name of a city" style={{width: "300px"}} />
            <button>Find Weather</button>
         </form>
        </div>
        <div className="information">
          {this.state.errorMessage && <p> Error: {this.state.errorMessage} </p>}
          {this.state.location && <p> Location: {this.state.location} </p>}
          {this.state.weatherDescription && <p> Weather: {this.state.weatherDescription} </p>}
          {this.state.temperature && <p> Temperature: {Math.round(this.state.temperature - 273.15)} °C </p>}
          {this.state.windSpeed && <p> Wind Speed: {this.state.windSpeed} km/h </p>}
        </div>
      </div>
    );
  }
}

export default App;
