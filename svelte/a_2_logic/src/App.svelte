<script lang="ts">
  import Thing from './lib/Thing.svelte';

  const user = { loggedIn: false };

  function toggle() {
    user.loggedIn = !user.loggedIn;
  }

  let x = 7;
  function incrementX() {
    x += 1;
  }
  function decrementX() {
    x -= 1;
  }

  interface Cat {
    id: string;
    name: string;
  }

  const cats: Cat[] = [
    { id: 'J---aiyznGQ', name: 'Keyboard Cat' },
    { id: 'z_AbfPXTKms', name: 'Maru' },
    { id: 'OUtn3pvWmpg', name: 'Henri The Existential Cat' },
  ];

  interface Thing {
    id: number;
    name: string;
  }

  let things: Thing[] = [
    { id: 1, name: 'apple' },
    { id: 2, name: 'banana' },
    { id: 3, name: 'carrot' },
    { id: 4, name: 'doughnut' },
    { id: 5, name: 'egg' },
  ];

  function handleClick() {
    things = things.slice(1);
  }

  async function getRandomNumber() {
    const res = await fetch(`https://svelte.dev/tutorial/random-number`);
    const text = await res.text();

    if (!res.ok) {
      throw new Error(text);
    }
    return text;
  }

  let promise = getRandomNumber();

  function onGetRandomNumberClick() {
    promise = getRandomNumber();
  }
</script>

<div>
  {#if user.loggedIn}
    <button type="button" on:click={toggle}>Log out</button>
  {:else}
    <button type="button" on:click={toggle}>Log in</button>
  {/if}
</div>

{#if x > 10}
  <p>{x} is greater than 10</p>
{:else if x < 5}
  <p>{x} is less than 5</p>
{:else}
  <p>{x} is between 5 and 10</p>
{/if}

<div>
  <button type="button" on:click={incrementX}>Increment X</button>
  <button type="button" on:click={decrementX}>Decrement X</button>
</div>

<ul>
  {#each cats as { id, name }, i}
    <li>
      <a target="_blank" href="https://www.youtube.com/watch?v={id}">
        {i + 1}: {name}
      </a>
    </li>
  {/each}
</ul>

<button on:click={handleClick}>Remove first thing </button>

{#each things as { id, name } (id)}
  <Thing {name} />
{/each}

<button on:click={onGetRandomNumberClick}>Generate random number</button>

{#await promise}
  <p>loading...</p>
{:then number}
  <p>The number is {number}</p>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}

{#await promise then number}
  <p>The number is {number}</p>
{/await}
