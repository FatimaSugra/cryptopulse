import { useState, useEffect } from "react";
import "./App.css";

import Header from "./components/Header";
import Loader from "./components/Loader";
import SearchBar from "./components/SearchBar";
import CryptoList from "./components/CryptoList";
import ChartPanel from "./components/ChartPanel";
import StatsPanel from "./components/StatsPanel";

const API_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true";

export default function App() {
  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [lastUpdated, setLastUpdated] = useState("");

  const fetchCryptoData = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Unable to fetch market data.");
      }

      const data = await response.json();

      const formatted = data.map((coin) => ({
        id: coin.symbol.toUpperCase(),
        name: coin.name,
        image: coin.image,
        price: coin.current_price,
        change: coin.price_change_percentage_24h,
        volume: coin.total_volume.toLocaleString(),
        sparkline: coin.sparkline_in_7d.price.map((price) => ({
          price,
        })),
      }));

     setCoins(formatted);
setFilteredCoins(formatted);

if (selectedCoin) {
  const updatedCoin = formatted.find(
    (coin) => coin.id === selectedCoin.id
  );

  setSelectedCoin(updatedCoin || formatted[0]);
} else {
  setSelectedCoin(formatted[0]);
}

setLastUpdated(
  new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  })
);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoData();
  }, [fetchCryptoData]);

  useEffect(() => {
    const timer = setInterval(() => {
      fetchCryptoData();
    }, 60000);

    return () => clearInterval(timer);
  }, [fetchCryptoData]);

  useEffect(() => {
    const filtered = coins.filter((coin) => {
      return (
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.id.toLowerCase().includes(search.toLowerCase())
      );
    });

    setFilteredCoins(filtered);
  }, [search, coins]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="error-screen">
        <h2>Unable to load crypto market.</h2>

        <p>{error}</p>

        <button onClick={fetchCryptoData}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="app">

      <Header
  refresh={fetchCryptoData}
  loading={loading}
  lastUpdated={lastUpdated}
/>

      <div className="dashboard">

        <div className="left-panel">

          <SearchBar
            search={search}
            setSearch={setSearch}
          />

          <CryptoList
            coins={filteredCoins}
            selectedCoin={selectedCoin}
            setSelectedCoin={setSelectedCoin}
          />

        </div>

        <div className="right-panel">

          <ChartPanel coin={selectedCoin} />

          <StatsPanel coin={selectedCoin} />

        </div>

      </div>

    </div>
  );
}