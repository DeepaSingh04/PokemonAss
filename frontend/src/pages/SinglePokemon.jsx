// import React, { useState } from 'react';
// import PokemonRow from '../components/PokemonRow';

// const SinglePokemon = () => {
//   const [name, setName] = useState('');
//   const [pokemon, setPokemon] = useState(null);

//   const fetchPokemon = async () => {
//     try {
//       const res = await fetch(`http://localhost:2475/api/pokemon/getOne/${name}`);
//       const data = await res.json();
//       setPokemon(data);
//     } catch (err) {
//       console.error('Error fetching Pokémon:', err);
//     }
//   };

//   return (
//     <div>
//       <h2>Search Pokémon by Name</h2>
//       <input
//         type="text"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         placeholder="e.g. Bulbasaur"
//       />
//       <button onClick={fetchPokemon}>Search</button>

//       {pokemon && (
//         <table border="1">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Types</th>
//               <th>Sprite</th>
//             </tr>
//           </thead>
//           <tbody>
//             <PokemonRow pokemon={pokemon} />
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default SinglePokemon;

// frontend/src/pages/SinglePokemon.jsx
import React, { useState, useEffect } from 'react';
import './SinglePokemon.css';

const SinglePokemon = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState('create'); // Set initial view to create
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [sortOption, setSortOption] = useState('id');
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newPokemon, setNewPokemon] = useState({
    name: '',
    category: '',
    types: '',
    abilities: '',
    sprite: ''
  });

  // Initial Pokemon data
  const initialPokemon = [
    {
      id: 1,
      name: "Arceus",
      category: "Alpha",
      types: ["Normal"],
      abilities: ["MultiType"],
      sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/493.png",
      description: "According to the legends of Sinnoh, this Pokémon emerged from an egg and shaped all there is in this world."
    },
    {
      id: 2,
      name: "Ash-Greninja",
      category: "Ninja",
      types: ["Water", "Dark"],
      abilities: ["Battle Bond"],
      sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/658.png",
      description: "When this Pokémon's bond with Ash is strong, it takes on a special form. Its appearance resembles its Trainer."
    },
    {
      id: 3,
      name: "Blastoise",
      category: "Shellfish",
      types: ["Water"],
      abilities: ["Torrent"],
      sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png",
      description: "It crushes its foe under its heavy body to cause fainting. In a pinch, it will withdraw inside its shell."
    },
    {
      id: 4,
      name: "Bulbasaur",
      category: "Seed",
      types: ["Grass", "Poison"],
      abilities: ["Overgrow"],
      sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
      description: "There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger."
    },
    {
      id: 5,
      name: "Charizard",
      category: "Flame",
      types: ["Fire", "Flying"],
      abilities: ["Blaze"],
      sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
      description: "It spits fire that is hot enough to melt boulders. It may cause forest fires by blowing flames."
    },
    {
      id: 6,
      name: "Charmander",
      category: "Lizard",
      types: ["Fire"],
      abilities: ["Blaze"],
      sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
      description: "The flame on its tail shows the strength of its life force. If it is weak, the flame also burns weakly."
    },
    {
      id: 7,
      name: "Charmeleon",
      category: "Flame",
      types: ["Fire"],
      abilities: ["Blaze"],
      sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png",
      description: "It has a barbaric nature. In battle, it whips its fiery tail around and slashes away with sharp claws."
    },
    {
      id: 8,
      name: "Darkrai",
      category: "Pitch-Black",
      types: ["Dark"],
      abilities: ["Bad Dreams"],
      sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/491.png",
      description: "It can lull people to sleep and make them dream. It is active during nights of the new moon."
    }
  ];

  useEffect(() => {
    setPokemonList(initialPokemon);
    // Load favorites from localStorage if available
    const savedFavorites = localStorage.getItem('pokemonFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('pokemonFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleTypeClick = (type) => {
    setSelectedTypes(prev => {
      if (prev.includes(type)) {
        return prev.filter(t => t !== type);
      }
      return [...prev, type];
    });
  };

  const handleCreatePokemon = (e) => {
    e.preventDefault();
    const newPokemonData = {
      id: pokemonList.length + 1,
      name: newPokemon.name,
      category: newPokemon.category,
      types: newPokemon.types.split(',').map(type => type.trim()),
      abilities: newPokemon.abilities.split(',').map(ability => ability.trim()),
      sprite: newPokemon.sprite || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonList.length + 1}.png`,
      description: "A newly created Pokémon with unique characteristics."
    };

    setPokemonList(prev => [...prev, newPokemonData]);
    setNewPokemon({
      name: '',
      category: '',
      types: '',
      abilities: '',
      sprite: ''
    });
    setView('collection'); // Switch to collection view after creating
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPokemon(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      if (prev.includes(id)) {
        return prev.filter(itemId => itemId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const openPokemonDetails = (pokemon) => {
    setSelectedPokemon(pokemon);
    setShowModal(true);
  };

  const sortPokemon = (pokemonArray) => {
    const sortedArray = [...pokemonArray];
    
    switch(sortOption) {
      case 'name':
        return sortedArray.sort((a, b) => a.name.localeCompare(b.name));
      case 'id':
        return sortedArray.sort((a, b) => a.id - b.id);
      default:
        return sortedArray;
    }
  };

  const filteredPokemon = pokemonList.filter(pokemon => {
    const nameMatch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    const typeMatch = selectedTypes.length === 0 || 
      pokemon.types.some(type => selectedTypes.includes(type.toLowerCase()));
    const favoriteMatch = showOnlyFavorites ? favorites.includes(pokemon.id) : true;
    
    return nameMatch && typeMatch && favoriteMatch;
  });

  const sortedAndFilteredPokemon = sortPokemon(filteredPokemon);

  const renderPokemonCard = (pokemon) => (
    <div key={pokemon.id} className="pokemon-card" onClick={() => openPokemonDetails(pokemon)}>
      <div className="favorite-icon" onClick={(e) => {
        e.stopPropagation(); 
        toggleFavorite(pokemon.id);
      }}>
        {favorites.includes(pokemon.id) ? 
          <span className="favorite-star active">★</span> : 
          <span className="favorite-star">☆</span>
        }
      </div>
      <img 
        src={pokemon.sprite}
        alt={pokemon.name} 
        className="pokemon-image"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png";
        }}
      />
      <h3 className="pokemon-name">{pokemon.name}</h3>
      <p className="pokemon-category">{pokemon.category}</p>
      <div className="pokemon-types">
        {pokemon.types.map((type, index) => (
          <span key={index} className={`type-badge ${type.toLowerCase()}`}>
            {type}
          </span>
        ))}
      </div>
      <div className="pokemon-abilities">
        Abilities: {pokemon.abilities.join(', ')}
      </div>
    </div>
  );

  const renderCreateView = () => (
    <div className="create-view">
      <h2>Create New Pokémon</h2>
      <form className="create-pokemon-form" onSubmit={handleCreatePokemon}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">Pokémon Name</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Enter Pokémon name..."
            value={newPokemon.name}
            onChange={handleInputChange}
            className="search-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category" className="form-label">Category</label>
          <input
            id="category"
            type="text"
            name="category"
            placeholder="e.g., Mouse Pokémon"
            value={newPokemon.category}
            onChange={handleInputChange}
            className="search-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="types" className="form-label">Types (comma separated)</label>
          <input
            id="types"
            type="text"
            name="types"
            placeholder="e.g., Electric, Flying"
            value={newPokemon.types}
            onChange={handleInputChange}
            className="search-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="abilities" className="form-label">Abilities (comma separated)</label>
          <input
            id="abilities"
            type="text"
            name="abilities"
            placeholder="e.g., Static, Lightning Rod"
            value={newPokemon.abilities}
            onChange={handleInputChange}
            className="search-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="sprite" className="form-label">Sprite URL (optional)</label>
          <input
            id="sprite"
            type="text"
            name="sprite"
            placeholder="Enter image URL..."
            value={newPokemon.sprite}
            onChange={handleInputChange}
            className="search-input"
          />
        </div>
        <button type="submit" className="create-button">
          Create Pokémon
        </button>
      </form>
    </div>
  );

  const renderSearchView = () => (
    <div className="search-view">
      <h2>Search Pokémon</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <div className="search-options">
          <div className="filter-option">
            <label className="filter-label">
              <input
                type="checkbox"
                checked={showOnlyFavorites}
                onChange={() => setShowOnlyFavorites(!showOnlyFavorites)}
              />
              Favorites Only
            </label>
          </div>
          <div className="sort-option">
            <select 
              value={sortOption} 
              onChange={(e) => setSortOption(e.target.value)}
              className="sort-select"
            >
              <option value="id">Sort by ID</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>
        </div>
      </div>
      <div className="type-filters">
        {["dark", "dragon", "electric", "fire", "flying", "ghost", "grass", 
          "normal", "poison", "psychic", "steel", "water"].map(type => (
          <span
            key={type}
            className={`type-badge ${type} ${selectedTypes.includes(type) ? 'selected' : ''}`}
            onClick={() => handleTypeClick(type)}
          >
            {type}
          </span>
        ))}
      </div>
      {sortedAndFilteredPokemon.length > 0 ? (
        <div className="pokemon-grid">
          {sortedAndFilteredPokemon.map(renderPokemonCard)}
        </div>
      ) : (
        <div className="no-results">
          <p>No Pokémon found matching your search criteria</p>
        </div>
      )}
    </div>
  );

  const renderCollectionView = () => (
    <div className="collection-section">
      <div className="collection-header">
        <h2>Your Pokémon Collection</h2>
        <span className="pokemon-count">{pokemonList.length} Pokémon</span>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <div className="search-options">
          <div className="filter-option">
            <label className="filter-label">
              <input
                type="checkbox"
                checked={showOnlyFavorites}
                onChange={() => setShowOnlyFavorites(!showOnlyFavorites)}
              />
              Favorites Only
            </label>
          </div>
          <div className="sort-option">
            <select 
              value={sortOption} 
              onChange={(e) => setSortOption(e.target.value)}
              className="sort-select"
            >
              <option value="id">Sort by ID</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>
        </div>
      </div>
      <div className="type-filters">
        {["dark", "dragon", "electric", "fire", "flying", "ghost", "grass", 
          "normal", "poison", "psychic", "steel", "water"].map(type => (
          <span
            key={type}
            className={`type-badge ${type} ${selectedTypes.includes(type) ? 'selected' : ''}`}
            onClick={() => handleTypeClick(type)}
          >
            {type}
          </span>
        ))}
      </div>
      {sortedAndFilteredPokemon.length > 0 ? (
        <div className="pokemon-grid">
          {sortedAndFilteredPokemon.map(renderPokemonCard)}
        </div>
      ) : (
        <div className="no-results">
          <p>No Pokémon found matching your search criteria</p>
        </div>
      )}
    </div>
  );

  const renderPokemonModal = () => {
    if (!selectedPokemon) return null;
    
    return (
      <div className={`pokemon-modal-overlay ${showModal ? 'active' : ''}`} onClick={() => setShowModal(false)}>
        <div className="pokemon-modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close-button" onClick={() => setShowModal(false)}>×</button>
          <div className="modal-header">
            <h2>{selectedPokemon.name}</h2>
            <div className="modal-favorite" onClick={() => toggleFavorite(selectedPokemon.id)}>
              {favorites.includes(selectedPokemon.id) ? 
                <span className="favorite-star active">★</span> : 
                <span className="favorite-star">☆</span>
              }
            </div>
          </div>
          
          <div className="modal-body">
            <div className="modal-image-container">
              <img src={selectedPokemon.sprite} alt={selectedPokemon.name} className="modal-pokemon-image" />
            </div>
            
            <div className="modal-info">
              <div className="modal-detail">
                <span className="detail-label">ID:</span> 
                <span className="detail-value">#{selectedPokemon.id}</span>
              </div>
              
              <div className="modal-detail">
                <span className="detail-label">Category:</span> 
                <span className="detail-value">{selectedPokemon.category}</span>
              </div>
              
              <div className="modal-detail">
                <span className="detail-label">Types:</span> 
                <div className="modal-types">
                  {selectedPokemon.types.map((type, index) => (
                    <span key={index} className={`type-badge ${type.toLowerCase()}`}>
                      {type}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="modal-detail">
                <span className="detail-label">Abilities:</span> 
                <span className="detail-value">{selectedPokemon.abilities.join(', ')}</span>
              </div>
              
              <div className="modal-description">
                <p>{selectedPokemon.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="single-pokemon-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Pokémon Collection</h1>
          <p className="hero-subtitle">Create, collect and search your favorite Pokémon</p>
        </div>
      </div>
      
      <div className="top-buttons">
        <button 
          className={`nav-button ${view === 'search' ? 'active' : ''}`}
          onClick={() => setView('search')}
        >
          Go to Search Page
        </button>
      </div>
      <div className="create-collection-buttons">
        <button 
          className={`create-button ${view === 'create' ? 'active' : ''}`}
          onClick={() => setView('create')}
        >
          Create Pokémon
        </button>
        <button 
          className={`collection-button ${view === 'collection' ? 'active' : ''}`}
          onClick={() => setView('collection')}
        >
          Collection ({pokemonList.length})
        </button>
      </div>
      {view === 'search' && renderSearchView()}
      {view === 'create' && renderCreateView()}
      {view === 'collection' && renderCollectionView()}
      {renderPokemonModal()}
    </div>
  );
};

export default SinglePokemon;
