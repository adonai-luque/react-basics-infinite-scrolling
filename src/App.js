import React, { useState, useRef } from "react";
import useBookSearch from "./components/useBookSearch";

function App() {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setPageNumber(1);
  };

  const { loading, error, books, hasMore } = useBookSearch(query, pageNumber);

  return (
    <>
      <input type="text" value={query} onChange={handleSearch}></input>
      {books.map((b) => {
        return <div key={b}>{b}</div>;
      })}
      {loading ? <div>Loading...</div> : ""}
      {error ? <div>Error</div> : ""}
    </>
  );
}

export default App;
