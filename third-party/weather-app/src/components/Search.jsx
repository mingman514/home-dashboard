import React from 'react'

function Search({ handleWeatherSearch, location, handleLocationChange }) {

  return (
    <form className='search' onSubmit={handleWeatherSearch}>
      <div className='search_inner'>
        <input 
          type="search"
          value={location}
          placeholder='위치 검색'
          required
          onChange={handleLocationChange}
          className='search-input'
        />
        <button 
          className='search-btn' 
          type='summit'
        >검색</button>
      </div>
    </form>
  )
}

export default Search