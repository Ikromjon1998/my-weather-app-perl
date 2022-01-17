import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Header from './components/Header/index'
import TabularData from './components/TabularData';
import MainData from './components/MainData';
import { geocoding_Api_key } from './config';

//Class component

class App extends Component {
  newState={} ;// a newState variable used to update state 
  activeCoords={};

  constructor(props) {
    super(props);
    // the state will be initialised to empty values
    this.state = {
      latitude: "",
      longitude: "",
      // ref: "",
      searchTerm: "",
    }
    //This method call is used to get the coordinates of the current location of user
    navigator.geolocation.getCurrentPosition(position => {
      const coords = position.coords;
      this.newState = {
        latitude: coords.latitude,
        longitude: coords.longitude,
      }
      this.setState(this.newState);
    });
  }

  //The getCoordinates function will be used if the user enters a different search location, to get the corresponding coordinates
  //Function which converts given address or city name to latitude and longitude 
    getCoordinates = (city) => {
    if (city === "Current location") {
      this.setState(this.newState);
    } else {
      let locality = city,
        countryRegion = 'IN';
      axios.get(`http://dev.virtualearth.net/REST/v1/Locations?&countryRegion=${countryRegion}&locality=${locality}&key=${geocoding_Api_key}`).then((response) => {
    console.log(response);
        response.data.resourceSets.map((data) => {
          return ( data.resources.map((resourceData) => {
            if (resourceData.confidence === "High") {
              this.activeCoords={
                    latitude: resourceData.point.coordinates[0],
                   longitude: resourceData.point.coordinates[1]
                  };
                  console.log(this.activeCoords);
                  return this.activeCoords;
              // this.setState({
              //   ...this.state, //Changing the state with search term coordinates
              //   latitude: resourceData.point.coordinates[0],
              //   longitude: resourceData.point.coordinates[1]
              // }, () => console.log(this.state.latitude, this.state.longitude));
              // return(this.state);
            } else {
              console.log('no data');
              return null;
            }
          })
          )
        })
      })
    }
  }
  // getCoord = _.debounce(this.getCoordinates,500,false);
  //Method which handle the change of input and set it to state
  handleChange=(e) => {
    const newSearch= e.target.value;
    this.setState({
      // ref: e.target.value
      searchTerm: newSearch
    });
    console.log(newSearch);
    this.getCoordinates(newSearch);
  }
  //Method which updates the coordinates in the state so that the child components are rerendered for new coordinates 
  handleSearch=(e) => {
    // let newVal= this.state.ref;
    // this.setState({
    //   searchTerm: newVal
    // })
    console.log(this.state.searchTerm);
    // this.getCoordinates(this.state.searchTerm);
    let  coords= this.activeCoords;
      this.setState({
                ...this.state, //Changing the state with search term coordinates
                ...coords
              }, () => console.log(this.state));
              // return(this.state);
  }

  //render method
  render() {
    if (this.state !== null) {
      return (
        <div className="App">
            <Header handleSearch={(e) => this.handleSearch(e)} //Header Component 
             handleChange={(e) => { this.handleChange(e) }}
             />
            <div className="container">
               <MainData coords={this.state}/>    {/* Main Component which consists cards,Summary weather table,Weather Chart*/ }
            </div>                                   
             <TabularData coords={this.state}/> {/* which consists Uv index tabular data for 8days ahead*/}
            </div>
        );
    }
    else
      return <div></div>
  }
}


export default App;

