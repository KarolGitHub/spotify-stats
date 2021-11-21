import React from 'react';
import Track from '../Track/Track';
import './Tracks.css';

let tracksMap = <p>No data available...</p>;
const Tracks = (props) => {
  if (typeof props.sortedTracks[0] !== 'undefined') {
    tracksMap = props.sortedTracks[0]
      .map((track) => {
        return <Track track={track} key={track.playsRank}></Track>;
      })
      .splice(0, 50);
  } else {
    tracksMap = <p>{props.dataMessage}</p>;
  }

  return (
    <section className='tracks'>
      <div className='tracksHeader'>
        <h2>Tracks</h2>
      </div>

      <div>{tracksMap}</div>
    </section>
  );
};

export default Tracks;
