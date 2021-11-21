/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from 'react';

import Spotify from '../../util/spotify';
import Ranking from '../Ranking/Ranking';
import Stats from '../Stats/Stats';
import {
  exampleSortedArtists,
  exampleSortedTracks,
} from '../../util/exampleData';

import '../../normalize.css';
import './app.css';

const App = () => {
  const [sortedArtists, setSortedArtists] = useState([]);
  const [sortedTracks, setSortedTracks] = useState([]);
  const [sortedGenres, setSortedGenres] = useState([]);
  const [ArtistItemOrder, setArtistItemOrder] = useState('descending');
  const [TrackItemOrder, setTrackItemOrder] = useState('descending');
  const [animate, setAnimate] = useState(true);
  const [dataMessage] = useState('No data found...');

  const memoTracks = useMemo(() => sortedTracks.length);

  const sortOrder = (e) => {
    setAnimate(false);
    let sort = [];

    if (e.target.classList.contains('artistsSortBtn')) {
      sort.push([...sortedArtists]);

      ArtistItemOrder === 'descending'
        ? setArtistItemOrder('ascending')
        : setArtistItemOrder('descending');
    } else if (e.target.id === 'sortTracksOrderBtn') {
      sort.push([...sortedTracks]);

      TrackItemOrder === 'descending'
        ? setTrackItemOrder('ascending')
        : setTrackItemOrder('descending');
    } else if (e.target.id === 'loadExampleDataBtn' || 'loadSpotifyDataBtn') {
      if (ArtistItemOrder === 'ascending') {
        sort.push([...sortedArtists]);
        setArtistItemOrder('descending');
      }
      if (TrackItemOrder === 'ascending') {
        sort.push([...sortedTracks]);
        setTrackItemOrder('descending');
      }
    }

    sort.forEach((itemList) => itemList.forEach((arr) => arr.reverse()));
  };

  const getFavouriteGenres = () => {
    let returnedGenres = [];
    let favGenres = [];
    let artistsPopularity = [];
    let tracksPopularity = [];

    if (sortedTracks.length === 0) {
      return;
    }

    for (let i = 0; i < sortedArtists.length; i++) {
      returnedGenres.push([[], []]);
      if (favGenres[i] === undefined) {
        favGenres[i] = {};
      }
      if (artistsPopularity[i] === undefined) {
        artistsPopularity[i] = [];
      }
      if (tracksPopularity[i] === undefined) {
        tracksPopularity[i] = [];
      }

      for (let j = 0; j < sortedArtists[i].length; j++) {
        for (let k = 0; k < sortedArtists[i][j].genresRaw.length; k++) {
          favGenres[i][sortedArtists[i][j].genresRaw[k]] =
            (favGenres[i][sortedArtists[i][j].genresRaw[k]] || 0) + 1;
        }
        artistsPopularity[i].push(sortedArtists[i][j].popularity);
        tracksPopularity[i].push(sortedTracks[i][j].popularity);
      }

      let sort = Object.fromEntries(
        Object.entries(favGenres[i]).sort(([, a], [, b]) => b - a)
      );
      for (const [key, value] of Object.entries(sort)) {
        returnedGenres[i][0].push(key);
        returnedGenres[i][1].push(value);
      }
      favGenres[i] = sort;
    }

    let sort = [...sortedArtists];
    sort.forEach((arr) => arr.sort((a, b) => b.popularity - a.popularity));
    setSortedArtists(sort);

    sort = [...sortedTracks];
    sort.forEach((arr) => arr.sort((a, b) => b.popularity - a.popularity));
    setSortedTracks(sort);

    setSortedGenres(returnedGenres);
  };

  const getSpotifyData = (e) => {
    let artistData = [];
    let trackData = [];
    setAnimate(true);

    Spotify.getSpotifyTracksData().then((spotifyResponse) => {
      for (let a = 0; a < spotifyResponse.length; a++) {
        for (let b = 0; b < spotifyResponse[a].length; b++) {
          spotifyResponse[a][b].playsRank = b + 1;
        }
      }

      for (let i = 0; i < spotifyResponse.length; i++) {
        if (spotifyResponse[i][0].type === 'artist') {
          artistData.push(spotifyResponse[i]);
        } else if (spotifyResponse[i][0].type === 'track') {
          trackData.push(spotifyResponse[i]);
        }
      }
      sortOrder(e);
      setArtistItemOrder('descending');
      setSortedArtists(artistData);
      setSortedTracks(trackData);
    });
  };

  const getExampleData = (e) => {
    setAnimate(true);
    setSortedArtists(exampleSortedArtists);
    setSortedTracks(exampleSortedTracks);
    setArtistItemOrder('descending');
    setTrackItemOrder('descending');
    sortOrder(e);
  };

  useEffect(() => {
    getFavouriteGenres();
  }, [memoTracks]);

  return (
    <div className='app'>
      <Stats
        sortedGenres={sortedGenres}
        sortedTracks={sortedTracks}
        sortedArtists={sortedArtists}
        getSpotifyData={getSpotifyData}
        getExampleData={getExampleData}
        animate={animate}
        dataMessage={dataMessage}
      />
      <Ranking sortedTracks={sortedTracks} dataMessage={dataMessage} />
    </div>
  );
};

export default App;
