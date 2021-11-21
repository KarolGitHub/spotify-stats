import React from 'react';
import './Track.css';
import '../Ranking/Ranking.css';

const Track = (props) => {
  return (
    <div className='track'>
      <div className='trackPhotoContainer'>
        <a href={props.track.trackURL} target='_blank' rel='noreferrer'>
          <img
            className='trackPhoto'
            src={props.track.images[0].url}
            alt={'Album cover for ' + props.track.name}
          ></img>
        </a>
      </div>
      <div className='trackInfo'>
        <div className='trackHeaderContainer'>
          <h3>
            <a href={props.track.trackURL} target='_blank' rel='noreferrer'>
              {props.track.name}
            </a>{' '}
            - &nbsp;
            <a href={props.track.artistURL} target='_blank' rel='noreferrer'>
              {props.track.artists[0].name}
            </a>
          </h3>
        </div>
        <div>
          <p>
            Album:{' '}
            <a href={props.track.albumURL} target='_blank' rel='noreferrer'>
              {props.track.albumName}
            </a>
          </p>
          <p>Released: {props.track.releaseYear}</p>
          <p>Play Rank : {props.track.playsRank}</p>
          <p>Spotify Popularity Rating: {props.track.popularity}</p>
        </div>
      </div>
    </div>
  );
};

export default Track;
