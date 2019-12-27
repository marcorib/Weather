import React from "react";

import Titles from "./component/Titles";
import Form from "./component/Form";
import Weather from "./component/Weather.js";

const API_KEY = "3fe0d4ab3a059bb7aec5ee8a20051081";

class App extends React.Component{

  state = {
    temperature:undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined

  }

  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`); 
    const data = await api_call.json();
    
    if(city && country){
      console.log(data); 

      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      }); 

    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter the values"
      }); 

    }
  }
  render() {
    return(
      <div>
        <Titles />

        <Form getWeather={this.getWeather}/>
        
        <Weather 
        
        temperature={this.state.temperature}
        city={this.state.city}
        country={this.state.country}
        humidity={this.state.humidity}
        description={this.state.description}
        error={this.state.error}/>
      
      </div>
    );
  }
};

export default App;