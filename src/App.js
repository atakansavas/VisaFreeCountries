import React, { Component } from "react";
import Map from "./components/map";
import Sidebar from './components/sidebar';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCountryName: '',
      isSidebarOpen: true
    }
  }

  changeCountryNameApp(countryName) {
    console.log('app = ' + countryName);
    this.setState(
      { selectedCountryName: countryName }
    )
  }


  toggleSidebar(isOpen) {
    if (isOpen) {
      this.setState({ isSidebarOpen: false });
    }
    else {
      this.setState({ isSidebarOpen: true });
    }
  }

  render() {
    var wrapperStyle = "page-wrapper chiller-theme";
    if (this.state.isSidebarOpen) {
      wrapperStyle += " toggled";
    }

    return (
      <div class={wrapperStyle}>

        <Sidebar changeSidebarStatus={this.toggleSidebar.bind(this)} callbackFromApp={this.changeCountryNameApp.bind(this)} />
        <main class="page-content">
          <Map selectedCountryName={this.state.selectedCountryName} />
        </main>
      </div>
    );
  }
}

export default App;
