<script>
  import Nested from './lib/Nested.svelte';

  const name = 'Nix';
  const src = '/tutorial/image.gif';
  const string = 'this string contains some <strong>HTML!!!</strong>';

  let count = 0;
  $: doubled = count * 2;
  function incrementCount() {
    count += 1;
  }
</script>

<h1>Hello, {name.toUpperCase()}!</h1>
<img {src} alt="{name} dances." />
<p>This is a paragraph.</p>
<Nested />
<p>{@html string}</p>

<button on:click={incrementCount}>
  Clicked {count}
  {count === 1 ? 'time' : 'times'}
</button>
<p>{count} is doubled is {doubled}</p>

<style>
  p {
    color: purple;
    font-family: 'Pretendard', cursive;
    font-size: 2em;
  }
</style>
