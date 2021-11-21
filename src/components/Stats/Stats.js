import React, { useState } from 'react';
import './Stats.css';

import GenreChart from '../GenreChart/GenreChart';
import TracksChart from '../TracksChart/TracksChart';
import ControlPanel from '../ControlPanel/ControlPanel';
import ArtistsChart from '../ArtistsChart/ArtistsChart';

const Stats = (props) => {
  const [chartDataType, setChartDataType] = useState('genre');

  const chartDataTypeArray = {
    genre: (
      <GenreChart
        sortedGenres={props.sortedGenres}
        chartDataType={chartDataType}
        animate={props.animate}
        dataMessage={props.dataMessage}
      />
    ),
    tracks: (
      <TracksChart
        sortedTracks={props.sortedTracks}
        chartDataType={chartDataType}
        animate={props.animate}
        dataMessage={props.dataMessage}
      />
    ),
    artists: (
      <ArtistsChart
        sortedArtists={props.sortedArtists}
        chartDataType={chartDataType}
        animate={props.animate}
        dataMessage={props.dataMessage}
      />
    ),
  };

  return (
    <section className='statsContainer'>
      <ControlPanel
        getSpotifyData={props.getSpotifyData}
        getExampleData={props.getExampleData}
        cancelAccessToken={props.cancelAccessToken}
        switchedChartDataType={(type) => setChartDataType(type)}
      />
      {chartDataTypeArray[chartDataType]}
    </section>
  );
};

export default Stats;
