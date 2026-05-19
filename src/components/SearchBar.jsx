function SearchBar({ search, setSearch }) {
  return (
    <div className='search-wrapper'>
      <input
        type='text'
        placeholder='Search notes...'
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
    </div>
  );
}

export default SearchBar;
