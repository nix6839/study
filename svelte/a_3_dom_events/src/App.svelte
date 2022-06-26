<script lang="ts">
  const m = { x: 0, y: 0 };

  function onMouseMove(event: MouseEvent) {
    m.x = event.clientX;
    m.y = event.clientY;
  }
</script>

<div on:mousemove={onMouseMove}>
  The mouse position is {m.x} x {m.y}
</div>

<style>
  :global(body) {
    margin: 0;
  }
  :global(#app) {
    height: 100vh;
  }
  div {
    width: 100%;
    height: 100%;
  }
</style>
