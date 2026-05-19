function Header({ darkMode, toggleDarkMode }) {
  return (
    <header className='header'>
      <div>
        <h1>Thami's Notes</h1>
        <p>Modern animated notes app.</p>
      </div>

      <button
        className='theme-btn'
        onClick={toggleDarkMode}
      >
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </header>
  );
}

export default Header;
