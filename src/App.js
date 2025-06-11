import React, { useEffect, useState } from "react";

function App() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/favorites")
      .then((res) => res.json())
      .then((data) => setFavorites(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>My Favorite Things</h1>
      {favorites.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {favorites.map((fav) => (
            <li key={fav.id}>
              <strong>{fav.title}</strong> ({fav.type})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
