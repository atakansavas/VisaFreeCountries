import React from 'react';
import Map from "./components/map";
import Sidebar from './components/sidebar';
import './App.css';

function App() {
  return (


    <div class="page-wrapper chiller-theme toggled">

      <Sidebar />
      <main class="page-content">
        <Map />
      </main>
    </div>
  );
}

export default App;
