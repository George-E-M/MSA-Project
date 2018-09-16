import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import HelpIcon from '@material-ui/icons/Help';
import * as React from 'react';
import './css/styles.css';

export const WEATHER_KEY = 'c42209f7f1cc21a210304e6a21d108ae';

interface IState {
  cityText: any,
  countryText: any,
  location: any,
  weatherDescription: any,
  temperature: any,
  windSpeed: any,
  humidity: any,
  errorMessage: any,
  isLoading: boolean
}

class App extends React.Component<{}, IState> {

  constructor(props: any) {
    super(props);

    this.state = {
      cityText: '',
      countryText: '',
      location: undefined,
      weatherDescription: undefined,
      temperature: undefined,
      windSpeed: undefined,
      humidity: undefined,
      errorMessage: undefined,
      isLoading: false
    };

    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleTextSubmit = this.handleTextSubmit.bind(this);
  }


  public handleCityChange(event: any) {
    this.setState({cityText: event.target.value});
    
  }

  public handleCountryChange(event: any) {
    this.setState({countryText: event.target.value})
  }

  public handleTextSubmit(event: any) {
    this.setState({
      location: undefined,
      weatherDescription: undefined,
      temperature: undefined,
      windSpeed: undefined,
      humidity: undefined,
      errorMessage: undefined,
      isLoading: true
    })
    event.preventDefault(); // Stops the browser from interfering
    if (this.state.countryText.length === 2 && this.state.cityText.length > 0) {
      // If the input is valid and includes a city
      const request=`https://api.openweathermap.org/data/2.5/weather?q=${this.state.cityText},${this.state.countryText}&appid=${WEATHER_KEY}`
      this.getWeather(request)
    } else if (this.state.countryText.length === 0 && this.state.cityText.length > 0) {
      // If the input is valid but doesn't include a city
      const request=`https://api.openweathermap.org/data/2.5/weather?q=${this.state.cityText}&appid=${WEATHER_KEY}`
      this.getWeather(request)
    } else {
      // If the input is invalid
      this.setState({
        location: undefined,
        weatherDescription: undefined,
        temperature: undefined,
        windSpeed: undefined,
        humidity: undefined,
        isLoading: false,
        errorMessage: "Please ensure that you give a 2 digit code for the country name\n"
        + "and that your input for the city is not empty"
      })
    }
  }

  public getWeather(request: any) {
    fetch(request, {}).then((response : any) => {
      if (!response.ok) {
        // If the API couldn't find the city
        this.setState({
          location: undefined,
          weatherDescription: undefined,
          temperature: undefined,
          windSpeed: undefined,
          humidity: undefined,
          isLoading: false,
          errorMessage: "Could not find the city"
        })
      } else {
        response.json().then((data:any) =>
         this.setState({
           location: data.name + ", " + data.sys.country,
           weatherDescription: data.weather[0].description,
           temperature: data.main.temp,
           windSpeed: data.wind.speed,
           humidity: data.main.humidity,
           isLoading: false,
           errorMessage: undefined
          })
       )}
    })
  }

  public render() {
    return (
      <div className="centreText">
        <div className="circle">
         <div className="titles">
           <h1>MSA Weather App </h1>
           <p>Enter the name of the location you want to find the weather for</p>
         </div>
          <div>
           <form onSubmit={this.handleTextSubmit}>
            <TextField
             label="City Name"
             value={this.state.cityText}
             onChange={this.handleCityChange}
             margin="normal"
            />
            {"  "}
            <TextField
             label="Country Name (Optional)"
             value={this.state.countryText}
             onChange={this.handleCountryChange}
             margin="normal"
             helperText="Use the 2-letter ISO Code names"
            />
            {"  "}
            <Button variant="contained" size="small" type="submit">
              Find Weather
            </Button>
            {"  "}
            {<Tooltip title="Two letter ISO code names can be found at: www.nationsonline.org/oneworld/country_code_list.htm" className="tip">
              <Icon aria-label="Help">
                <HelpIcon />
              </Icon>
            </Tooltip>}
           </form>
          </div>
          <div className="information">
              {this.state.isLoading === true && <CircularProgress/>}
              {this.state.errorMessage && <p> {this.state.errorMessage} </p>}
              {this.state.location && <p> <h3>{this.state.location}</h3> </p>}
              {this.state.weatherDescription && <p> <h2>Weather</h2> {this.state.weatherDescription} </p>}
              {this.state.temperature && <p> <h2>Temperature</h2> {Math.round(this.state.temperature - 273.15)} °C </p>}
              {this.state.windSpeed && <p> <h2>Wind Speed</h2> {Math.round(this.state.windSpeed * 3.6)} km/h </p>}
              {this.state.humidity && <p> <h2>Humidity</h2> {this.state.humidity} % </p>}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
