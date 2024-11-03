// server.js
// eslint-disable-next-line @typescript-eslint/no-require-imports
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// Use default middlewares
server.use(middlewares);

// Custom route to get bookmarks with items
server.get("/server/bookmarks", (req, res) => {
  const db = router.db; // Lowdb instance
  const bookmarks = db.get("bookmarks").value();

  const bookmarksWithItems = bookmarks.map((bookmark) => {
    const item =
      bookmark.itemType === "todo"
        ? db.get("todos").find({ id: bookmark.id }).value()
        : db.get("recipes").find({ id: bookmark.id }).value();

    return {
      ...bookmark,
      item,
    };
  });

  // Add pagination
  const page = parseInt(req.query._page) || 1;
  const limit = parseInt(req.query._limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  // Slice the array for pagination
  const paginatedBookmarks = bookmarksWithItems.slice(startIndex, endIndex);

  // Add X-Total-Count header for total number of items
  res.header("X-Total-Count", bookmarksWithItems.length.toString());
  res.jsonp(paginatedBookmarks);
});

// Custom route to get todos with bookmark state

server.get("/server/todos", (req, res) => {
  const db = router.db; // Lowdb instance
  const bookmarks = db.get("bookmarks").value();
  const todos = db.get("todos").value();

  const todoWithIsBookmarked = todos.map((todo) => {
    if (bookmarks.some((item) => item.id === todo.id)) {
      return { ...todo, isBookmarked: true };
    }
    return { ...todo, isBookmarked: false };
  });

  res.jsonp(todoWithIsBookmarked);
});

// Custom route to get a single todo with bookmark state
server.get("/server/todos/:id", (req, res) => {
  const db = router.db; // Lowdb instance
  const bookmarks = db.get("bookmarks").value();
  const todo = db
    .get("todos")
    .find({ id: parseInt(req.params.id) })
    .value();

  if (!todo) {
    return res.status(404).jsonp({ error: "Todo not found" });
  }

  const isBookmarked = bookmarks.some((item) => item.id === todo.id);
  const todoWithBookmarkState = { ...todo, isBookmarked };

  res.jsonp(todoWithBookmarkState);
});

// Use default router
server.use(router);

// Start server
server.listen(3001, () => {
  console.log("JSON Server is running on port 3001");
});
