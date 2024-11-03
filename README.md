# Todo List - Cache normalization

This application demonstrates how to integrate **React Query** with **Redux Toolkit** to create a normalized caching layer in a React application.

- **React Query**: Manages data fetching and caching. Separate collections (`todos` and `bookmarkedTodos`) are retrieved and cached independently at the API level.
- **Redux Toolkit**: Provides a normalized cache layer that serves as the single source of truth for the view.

It leverages `createEntityAdapter` from Redux Toolkit to facilitate the normalization logic.

Important to notice that components consume data exclusively from the Redux store and not from React-Query collections.

## Getting Started

### Installation & Running

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Start the mock server**:

   ```bash
   npx json-server --watch db.json --port 3000 --routes json-server.json
   ```

3. **Run the Next.js app**:

   ```bash
   npm run dev
   ```

4. **Open the app**: Go to [http://localhost:3000](http://localhost:3000).
