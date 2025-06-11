import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [favorites, setFavorites] = useState([]);
  const [formData, setFormData] = useState({ title: "", type: "" });

  useEffect(() => {
    axios.get("http://localhost:5000/favorites")
      .then((res) => setFavorites(res.data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/favorites", formData)
      .then((res) => setFavorites([...favorites, res.data]))
      .catch((err) => console.error("Post error:", err));
    setFormData({ title: "", type: "" });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/favorites/${id}`)
      .then(() => setFavorites(favorites.filter((item) => item.id !== id)))
      .catch((err) => console.error("Delete error:", err));
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🎯 My Favorite Things</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Favorite title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="type"
          placeholder="Type (e.g. song, movie)"
          value={formData.type}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Favorite</button>
      </form>

      <ul>
        {favorites.map((fav) => (
          <li key={fav.id}>
            {fav.title} ({fav.type}){" "}
            <button onClick={() => handleDelete(fav.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
