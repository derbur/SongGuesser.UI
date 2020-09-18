<script>
  import { onMount } from 'svelte';
  import axios from 'axios';
  import TrackPlayer from './TrackPlayer.svelte';

  // const NewGameUrl = 'https://localhost:5001/game/new';
  const NewGameUrl = '/data/songs.json';
  
  let answer = '';
  let correctAnswers = 0;
  let complete = false;
  let currentQuestion = 0;
  $: currentTrack = tracks[currentQuestion];
  let tracks = [];

  function nextSong () {
    if (currentQuestion < tracks.length - 1) {
      currentQuestion++;
    } else {
      complete = true;
    }
  }

  function submitAnswer() {
    if (answer.toLowerCase() === currentTrack.title_short.toLowerCase()) {
      console.info('you got it right!');
      correctAnswers++;
    }
    answer = '';
    nextSong();
  }

  function resetGame () {
    correctAnswers = 0;
    answer = '';
    currentQuestion = 0;
    complete = false;
  }

  onMount (async () => {
    console.log('song game mounted!');
    let response = await axios.get(NewGameUrl).catch((err) => { console.error('Could not spawn new game.')});
    tracks = response.data;
  });
</script>

{#if currentTrack && !complete}
  <div>
    <TrackPlayer track={currentTrack.preview} />
    <input placeholder="Enter a song name" bind:value={answer} />
  </div>
  <button on:click={submitAnswer}>Guess!</button>
  <button on:click={nextSong}>Next Song</button>
{/if}

{#if complete}
  <div>
    You got {correctAnswers}/{tracks.length} correct!
  </div>
  <button on:click={resetGame}>Reset Game</button>
{/if}