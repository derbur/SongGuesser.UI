<script>
  import { onMount } from 'svelte';
  import axios from 'axios';
  import TrackPlayer from './TrackPlayer.svelte';

  // const NewGameUrl = 'https://localhost:5001/game/new';
  const NewGameUrl = '/data/songs.json';
  
  let correctAnswers = 0;
  let complete = false;
  let currentQuestion = 0;
  let tracks = [];
  
  $: currentTrack = tracks[currentQuestion];
  $: choices = genChoices(currentTrack);

  function genChoices(ct) {
    if(!ct) return [];
    let newChoices = [];
    newChoices.push(ct.title_short); // add the correct answer
    let rand = 0;

    // get a couple of random track names from the list of songs in the game
    // the entire list needs to be populated with more randomization on the back-end eventually 🔙🔚
    while(newChoices.length < 4) {
      rand = Math.floor(Math.random() * Math.floor(tracks.length - 1));
      let c = tracks[rand].title_short;
      if(!newChoices.includes(c))
        newChoices.push(c);
    }
    return newChoices;
  }

  function nextSong () {
    genChoices();
    if (currentQuestion < tracks.length - 1) {
      currentQuestion++;
    } else {
      complete = true;
    }
  }

  function submitAnswer(e) {
    if (e.target.innerText.toLowerCase() === currentTrack.title_short.toLowerCase()) {
      console.info('Correct!');
      correctAnswers++;
    }
    nextSong();
  }

  function resetGame () {
    correctAnswers = 0;
    currentQuestion = 0;
    complete = false;
  }

  onMount (async () => {
    let response = await axios.get(NewGameUrl).catch((err) => { console.error('Could not spawn new game.') });
    tracks = response.data;
  });
</script>

<style>
  .choice-container {
    display: flex;
    flex-direction: column;
    max-width: 600px;
    margin: auto;
  }
</style>

<h2>This is the song game!</h2>

<div class="choice-container">
  {#each choices as choice, i (i)}
      <button on:click={submitAnswer}>{choice}</button>
  {/each}
</div>

{#if currentTrack && !complete}
  <div>
    <TrackPlayer track={currentTrack.preview} />
  </div>
  <button on:click={nextSong}>Next Song</button>
{/if}

{#if complete}
  <div>
    You got {correctAnswers}/{tracks.length} correct!
  </div>
  <button on:click={resetGame}>Play Again</button>
{/if}