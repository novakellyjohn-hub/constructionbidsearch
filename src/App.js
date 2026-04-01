import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import SearchBar from './components/SearchBar';
import BidList from './components/BidList';
import BidDetails from './components/BidDetails';
import FilterPanel from './components/FilterPanel';
import Stats from './components/Stats';

// Use HTTPS droplet API directly
const API_URL = 'https://147.182.179.47:3000/api';

function App() {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBid, setSelectedBid] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [location, setLocation] = useState('');
  const [stats, setStats] = useState(null);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch statistics on mount
  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/stats`);
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
    setSelectedBid(null);
    
    if (!query.trim()) {
      setBids([]);
      return;
    }

    setLoading(true);
    try {
      let url = `${API_URL}/search?q=${encodeURIComponent(query)}&limit=50`;
      
      if (specialty) {
        url += `&specialty=${encodeURIComponent(specialty)}`;
      }
      if (location) {
        url += `&location=${encodeURIComponent(location)}`;
      }

      const response = await axios.get(url);
      setBids(response.data.results.bids);
      setTotalResults(response.data.results.total);
    } catch (error) {
      console.error('Error searching:', error);
      setBids([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSpecialtyFilter = async (spec) => {
    setSpecialty(spec);
    setCurrentPage(1);
    setSelectedBid(null);

    if (!spec) {
      setBids([]);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/search/specialty?type=${encodeURIComponent(spec)}&limit=50`);
      setBids(response.data.results.bids);
      setTotalResults(response.data.results.total);
    } catch (error) {
      console.error('Error filtering by specialty:', error);
      setBids([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBidClick = (bid) => {
    setSelectedBid(bid);
  };

  const handleCloseDetails = () => {
    setSelectedBid(null);
  };

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <h1>📋 BidSearch</h1>
          <p>Unified Bid Search Platform for Construction</p>
        </div>
      </header>

      <main className="app-main">
        <div className="search-section">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="content-wrapper">
          <aside className="sidebar">
            <FilterPanel 
              specialty={specialty}
              location={location}
              onSpecialtyChange={handleSpecialtyFilter}
              onLocationChange={setLocation}
            />
            {stats && <Stats stats={stats} />}
          </aside>

          <section className="main-content">
            {loading && (
              <div className="loading">
                <div className="spinner"></div>
                <p>Searching...</p>
              </div>
            )}

            {!loading && bids.length === 0 && searchQuery && (
              <div className="no-results">
                <p>No bids found for "{searchQuery}"</p>
                <small>Try different keywords or filters</small>
              </div>
            )}

            {!loading && bids.length === 0 && !searchQuery && (
              <div className="empty-state">
                <h2>Welcome to BidSearch</h2>
                <p>Search for construction bids by keyword or filter by specialty.</p>
                <div className="empty-state-examples">
                  <p><strong>Try searching for:</strong></p>
                  <ul>
                    <li>roofing repair</li>
                    <li>foundation work</li>
                    <li>electrical installation</li>
                  </ul>
                </div>
              </div>
            )}

            {bids.length > 0 && (
              <div className="results-section">
                <div className="results-header">
                  <h2>Results</h2>
                  <span className="result-count">{bids.length} of {totalResults} bids</span>
                </div>
                <BidList 
                  bids={bids} 
                  onBidClick={handleBidClick}
                  selectedBid={selectedBid}
                />
              </div>
            )}
          </section>
        </div>
      </main>

      {selectedBid && (
        <BidDetails 
          bid={selectedBid} 
          onClose={handleCloseDetails}
        />
      )}
    </div>
  );
}

export default App;
