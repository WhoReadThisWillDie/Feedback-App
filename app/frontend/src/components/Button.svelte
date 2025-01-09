<script>
  export let className = "";
</script>

<button
        class="px-4 py-1 rounded-lg gradient-before gradient-border text-textColor {className}"
        on:click
>
  <slot />
</button>

<style>
  button {
    transition: color 0.3s ease, background 0.3s ease, border-color 0.3s ease;
    background: #ffffff;
    color: #333333;
    border-color: #cccccc;
  }

  button:hover {
    background: linear-gradient(
            to right,
            #fd61e3 0%,
            #8c62ec 50%,
            #2b63f3 75%,
            #31e1f7 100%
    );
    color: white;
    border-color: transparent; /* Optionally change border color */
  }

  button:hover :global(svg) {
    color: white;
    fill: white;
  }
</style>
