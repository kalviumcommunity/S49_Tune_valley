import React, { useState } from 'react';
import './Year.css'; // Import CSS file

function Year({ data }) {
  const [selectedYear, setSelectedYear] = useState(null);

  // Extract unique years and sort them
  const uniqueYears = [...new Set(data.map(item => item.year))].sort((a, b) => a - b);

  const handleClick = (year) => {
    setSelectedYear(year === selectedYear ? null : year);
  };

  return (
    <div className="year-container">
      <div className="year-box">
        {uniqueYears.map((year) => (
          <div
            key={year}
            className={`year-item ${selectedYear === year ? 'active' : ''}`}
            onClick={() => handleClick(year)}
          >
            <span>{year}</span>
          </div>
        ))}
      </div>
      <div className="year-data">
        {selectedYear &&
          data
            .filter((item) => item.year === selectedYear)
            .map((item) => (
              <div key={item._id}>
                <h2 id="year">Year: {item.year}</h2>
                <p>Song: {item.song}</p>
                <p>Artist: {item.artist}</p>
                <hr />
              </div>
            ))}
      </div>
    </div>
  );
}

export default Year;
