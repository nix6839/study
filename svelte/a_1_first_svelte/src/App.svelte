<script>
  import Info from './lib/Info.svelte';
  import Nested from './lib/Nested.svelte';

  const name = 'Nix';
  const src = '/tutorial/image.gif';
  const string = 'this string contains some <strong>HTML!!!</strong>';

  let count = 0;
  $: doubled = count * 2;
  function incrementCount() {
    count += 1;
  }
  $: {
    console.log('the count is ' + count);
    // alert('I SAID THE COUNT IS ' + count);
  }
  $: if (count >= 10) {
    // alert('count is dangerously high!');
    count = 9;
  }

  const numbers = [1, 2, 3, 4];
  function addNumber() {
    numbers[numbers.length] = numbers.length + 1;
  }
  $: sum = numbers.reduce((sum, number) => sum + number);

  const pkg = {
    name: 'svelte',
    version: 3,
    speed: 'blazing',
    website: 'https://svelte.dev',
  };
</script>

<h1>Hello, {name.toUpperCase()}!</h1>
<img {src} alt="{name} dances." />
<p>This is a paragraph.</p>
<Nested answer="42" />
<Nested />
<p>{@html string}</p>

<button on:click={incrementCount}>
  Clicked {count}
  {count === 1 ? 'time' : 'times'}
</button>
<p>{count} is doubled is {doubled}</p>

<p>{numbers.join(' + ')} = {sum}</p>

<button on:click={addNumber}>Add a number</button>

<Info {...pkg} />

<style>
  p {
    color: purple;
    font-family: 'Pretendard', cursive;
    font-size: 2em;
  }
</style>
