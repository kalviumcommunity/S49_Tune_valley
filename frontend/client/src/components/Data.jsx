import React from 'react';

const Data = () => {
  const data = [
    {
      "_id": {
        "$oid": "65d4d6da4afeeefb6955b006"
      },
      "Year": 2013,
      "Songs": [
        { "Song": "Top 1: Blurred Lines", "Artist": "Artist: Robin Thicke" },
        { "Song": "Top 2: Mirrors", "Artist": "Artist: Justin Timberlake" },
        { "Song": "Top 3: Stay", "Artist": "Artist: Rihanna" },
        { "Song": "Top 4: When I Was Your Man", "Artist": "Artist: Bruno Mars" },
        { "Song": "Top 5: Locked Out of Heaven", "Artist": "Artist: Bruno Mars" },
        { "Song": "Top 6: Ho Hey", "Artist": "Artist: Lumineers" },
        { "Song": "Top 7: Radioactive", "Artist": "Artist: Imagine Dragons" },
        { "Song": "Top 8: Give Me a Reason", "Artist": "Artist: Pink feat. Nate Ruess" },
        { "Song": "Top 9: Can't Hold Us", "Artist": "Artist: Macklemore & Ryan Lewis feat. Ray Dalton" },
        { "Song": "Top 10: Suit & Tie", "Artist": "Artist: Justin Timberlake feat. Jay Z" }
      ]
    },
    {
      "_id": {
        "$oid": "65d4d7d74afeeefb6955b008"
      },
      "Year": 2014,
      "Songs": [
        { "Song": "Top 1: Rather Be", "Artist": "Artist: Clean Bandit ft. Jess Glynne" },
        { "Song": "Top 2: Happy", "Artist": "Artist: Pharrell Williams" },
        { "Song": "Top 3: All of Me", "Artist": "Artist: John Legend" },
        { "Song": "Top 4: Waves", "Artist": "Artist: Mr Probz" },
        { "Song": "Top 5: Stay with Me", "Artist": "Artist: Sam Smith" },
        { "Song": "Top 6: Thinking Out Loud", "Artist": "Artist: Ed Sheeran" },
        { "Song": "Top 7: Budapest", "Artist": "Artist: George Ezra" },
        { "Song": "Top 8: Sing", "Artist": "Artist: Ed Sheeran" },
        { "Song": "Top 9: Timber", "Artist": "Artist: Pitbull ft. Kesha" },
        { "Song": "Top 10: Rude", "Artist": "Artist: Magic" }
      ]
    }
  ];

  return (
    <div className="data-container">
      {data.map((entry) => (
        <div key={entry._id.$oid} className="data-card">
          <h2>Year: {entry.Year}</h2>
          <ul className="song-list">
            {entry.Songs.map((song, index) => (
              <li key={index}>
                <strong>{song.Song}</strong>
                <p>{song.Artist}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Data;
