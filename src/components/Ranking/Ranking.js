import React from 'react';
import Tracks from '../Tracks/Tracks';
import './Ranking.css';

const Ranking = (props) => {
  return (
    <div className='rankingsContainer'>
      <hr></hr>
      <section className='rankings'>
        <Tracks
          sortedTracks={props.sortedTracks}
          dataMessage={props.dataMessage}
        />
      </section>
    </div>
  );
};

export default Ranking;
