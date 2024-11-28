<script>
  import page from "page";

  import Header from "./components/Header.svelte";

  import Home from "./pages/Home.svelte";
  import Assignment from "./pages/Assignment.svelte";

  let currentRoute = "/";
  let pageComponent;
  let params = {};

  page("/", (ctx) => {
    pageComponent = Home;
    params = ctx.params;
    currentRoute = ctx.pathname;
  });

  page("/assignments/:id", (ctx) => {
    pageComponent = Assignment;
    params = ctx.params;
    currentRoute = ctx.pathname;
  });

  page.start();
</script>

<div>
  <Header />

  <main class="p-4 mx-auto max-w-7xl lg:px-8">
    <svelte:component this={pageComponent} {params} />
  </main>
</div>

<style>
</style>
