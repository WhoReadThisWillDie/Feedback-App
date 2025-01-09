<script>
  import page from "page";

  import Header from "./components/Header.svelte";

  import Assignment from "./pages/FeedbackForm.svelte";

  let pageComponent;
  let params = {};

  page("/", (ctx) => {
    pageComponent = Assignment;
    params = ctx.params;
  });

  page.start();
</script>

<div>
  <Header />

  <main class="p-4 mx-auto max-w-7xl lg:px-8">
    <svelte:component this={pageComponent} {params} />
  </main>
</div>
