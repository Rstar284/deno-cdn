import {
  Application,
  Context,
  Router,
  RouterContext,
  Status,
} from "https://deno.land/x/oak@v10.2.0/mod.ts";

const app = new Application();

const router = new Router();
router
  .get("/", (ctx: Context) => {
    ctx.response.redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  })
  .get("/:id", (ctx: RouterContext<"/:id">) => {
    ctx.params
      ? ctx.params.id
        ? ctx.response.redirect(
            `https://cdn.upload.systems/uploads/${ctx.params.id}.png`
          )
        : ctx.throw(Status.BadRequest, "param id was not found")
      : ctx.throw(Status.BadRequest, "params were not given");
  });

app.addEventListener("listen", ({ hostname, port }) => {
  console.log(`Listening on: ${hostname}:${port}`);
});

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8080 });
