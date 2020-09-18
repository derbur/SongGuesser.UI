<script>
  export let track = '';
  
  let audio;
  let time;
  let x;
  
  $: if(time >= 10) {
    audio.pause();
  }
  $: count = track && 3;
  $: if(track) {
    countdownV2();
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
      // to fix user not interacting with document that causes play() failure
      audio.play();
    }
  }  

  // this shit is blocking rendering for some reason 😢
  function countdownV2 () {
    const d = new Date();

    let times = [ 
      d.setSeconds(d.getSeconds() + 1),
      d.setSeconds(d.getSeconds() + 1),
      d.setSeconds(d.getSeconds() + 1)
    ];

    x = times.length;
    console.log(x);

    while(times.length > 0) {
      if(times[0] <= Date.now()) {
        times.shift();
        x = times.length;
        console.log(x);
      }
    }
    
    audio.play();
  }
</script>

{#if x > 0}
  <div>{x}</div>
{:else}
  <button on:click={repeatSong}>Repeat</button>
{/if}
<audio bind:this={audio} bind:currentTime={time} src={track}>
  <track kind="captions" />
</audio>