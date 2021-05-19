import React, { useState, useRef, useCallback } from "react";
import useBookSearch from "./components/useBookSearch";

function App() {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const { loading, error, books, hasMore } = useBookSearch(query, pageNumber);

  const observer = useRef();
  const lastBookElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore)
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setPageNumber(1);
  };

  return (
    <>
      <input type="text" value={query} onChange={handleSearch}></input>
      {books.map((b, index) => {
        if (books.length === index + 1)
          return (
            <div ref={lastBookElementRef} key={b}>
              {b}
            </div>
          );
        return <div key={b}>{b}</div>;
      })}
      {loading ? <div>Loading...</div> : ""}
      {error ? <div>Error</div> : ""}
    </>
  );
}

export default App;
