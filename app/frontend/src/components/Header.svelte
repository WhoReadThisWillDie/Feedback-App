<script>
  import logo from "../assets/logo.svg";
</script>

<header class="relative bg-background">
  <nav
    class="flex items-center justify-between p-4 mx-auto max-w-7xl lg:px-8 gradient-before"
  >
    <a href="/">
      <img src={logo} alt="Scorion Logo" class="h-16" />
    </a>
    <div></div>
  </nav>
</header>

<style>
  .gradient-before::before {
    z-index: -1;
    @apply opacity-40;
    filter: blur(10px);
  }
</style>
