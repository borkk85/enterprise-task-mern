import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { getBook, reset } from "../features/bookSlice";
import BookListing from "../component/BookListing";

function SearchBoard() {
  const [noMessage, setNoMessage] = useState(false)
  const [noResult, setNoResult] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState({
    query: "",
    list: [],
  });

  const dispatch = useDispatch();

  const { books, isError, message } = useSelector((state) => state.books);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getBook());

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

  const handleEmpty = (e) => {
    if (search.trim().length === 0) {
      setNoMessage(true);
    }
  }

  const sortedBooks = [...books].sort((a, b) => a.author.localeCompare(b.author));
  
  const sortedSearchBooks = {
    query: searchResults.query,
    list: [...searchResults.list].sort((a, b) => a.author.localeCompare(b.author))
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
    setNoResult(false);
    setNoMessage(false);
  };


  const searchBooks = () => {
    const filteredBooks = books.filter((book) => {
      if (search === "") return books;
      return (
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase()) ||
        book.genre.toLowerCase().includes(search.toLowerCase())
      );     
    });
    return filteredBooks;
  }

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim().length === '') {
      setNoMessage(true)
      return;
    }    
    
    const filteredBooks = searchBooks(search);
    
    setSearchResults({
      query: search,
      list: filteredBooks,
    });
    setNoResult(filteredBooks.length === 0)
  }
  
    const handleCancelSearch = () => {
      setSearch("");
      setSearchResults({
        query: "",
        list: [],
      });
      setNoResult(false);
    };
  

  return (
    <>
      <div className="search-wrapper">
        <div className="title">
          <h1>Boogle</h1>
        </div>
        <form className="search-block" onSubmit={handleSearch}>
          <button type="submit" className="btn">
            <FaSearch />
          </button>
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={handleChange}
            onBlur={handleEmpty}
          />

          <FaTimes
            className={search === "" ? "hidden" : ""}
            onClick={handleCancelSearch}
          />
        </form>
        {noResult && (
          <h2 className="no-result-message">
            No results found for "{search}".
          </h2>
        )}
        {noMessage && (
          <h2 className="no-result-message">
          Please enter your search query.
        </h2>
        )}
      </div>
      <section className="table-wrapper">
        {searchResults.list.length > 0 ? (
          <table className="table-header">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
              </tr>
            </thead>

            <tbody>
              {sortedSearchBooks.list.map((book) => (
                <BookListing
                  key={book._id}
                  book={book}
                  searchResults={searchResults}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <table className="table-header">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
              </tr>
            </thead>

            <tbody>
              {books.length > 0 ? (
                <>
                  {sortedBooks.map((book) => (
                    <BookListing key={book._id} book={book} />
                  ))}
                </>
              ) : null}
            </tbody>
          </table>
        )}
      </section>
    </>
  );
}

export default SearchBoard;
