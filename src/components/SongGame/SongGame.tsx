import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Button } from 'antd';

interface Artist {
  id: number,
  name: string
}

interface Track {
  id: number,
  preview: string,
  title: string,
  titleShort: string
  artist: Artist,
}

function SongGame() {
  let [ tracks, setTracks ] = useState<Track[]>([]);
  let [ currentTrack, setCurrentTrack ] = useState(0);

  const loadTracks = async () => {
    let response = await axios.get<Track[]>('https://localhost:5001/game/new');
    console.log(response.data);
    setTracks(response.data);
  }

  const playTrack = () => {
    console.log('playing:', tracks[currentTrack].preview)
  }

  const nextTrack = () => {
    setCurrentTrack(currentTrack++);
  }

  useEffect(() => {
    const fetchData = async () => {
      await loadTracks();
    }
    fetchData();
  }, []);

  return (
    <>
      <p>This is the game page.</p>
      <section>
        <Button onClick={playTrack}>Play</Button>
      </section>
      <Button onClick={nextTrack}>Next Song</Button>
    </>
  )
}

export default SongGame
