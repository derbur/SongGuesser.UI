<script>
  export let track = '';
  
  let audio;
  let time;
  $: if(time >= 10) {
    audio.pause();
  }
  $: count = track && 3;
  $: if(track) {
    countdown();
  }

  function repeatSong() {
    time = 0;
    audio.play();
  }

  function countdown () {
    if (count > 0) {
      // TODO: clear timeout if song is guessed or skipped
      setTimeout(() => {
        count--;
        countdown();
      }, 1000);
    } else {
      // TODO: have a "Play Game" to initiate gameplay (SongGame component)
      // to circumvent user not interacting with document that causes play() failure
      audio.play();
    }
  }
</script>

{#if count > 0}
  <div>{count}</div>
{:else}
  <button on:click={repeatSong}>Repeat</button>
{/if}
<audio bind:this={audio} bind:currentTime={time} src={track} />