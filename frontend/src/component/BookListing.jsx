

function BookListing({ book }) {
  return (
    <tr>
      <td>{book.title}</td>
      <td>{book.author}</td>
      <td>{book.genre}</td>
    </tr>
  );
}

export default BookListing;
