import React from 'react';
import './ControlPanel.css';

const ControlPanel = (props) => {
  return (
    <section className='btnContainer'>
      <button
        className='dataBtn'
        id='loadSpotifyDataBtn'
        onClick={props.getSpotifyData}
      >
        Fetch Spotify Data
      </button>

      <button
        className='dataBtn'
        id='loadExampleDataBtn'
        onClick={props.getExampleData}
      >
        Load Example Data
      </button>

      <button
        className='dataBtn'
        id='loadExampleDataBtn'
        onClick={() => props.switchedChartDataType('genre')}
      >
        Show Genre Chart
      </button>

      <button
        className='dataBtn'
        id='loadExampleDataBtn'
        onClick={() => props.switchedChartDataType('tracks')}
      >
        Show Tracks Chart
      </button>

      <button
        className='dataBtn'
        id='loadExampleDataBtn'
        onClick={() => props.switchedChartDataType('artists')}
      >
        Show Artists Chart
      </button>
    </section>
  );
};

export default ControlPanel;
