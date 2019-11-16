import React, { Component } from "react";
import Map from "./components/map";
import Sidebar from './components/sidebar';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCountryName: ''
    }
  }

  changeCountryNameApp(countryName) {
    console.log('app = ' + countryName);
    this.setState(
      { selectedCountryName: countryName }
    )
  }

  render() {
    return (
      <div class="page-wrapper chiller-theme toggled">

        <Sidebar callbackFromApp={this.changeCountryNameApp.bind(this)} />
        <main class="page-content">
          <Map selectedCountryName={this.state.selectedCountryName} />
        </main>
      </div>
    );
  }
}

export default App;
