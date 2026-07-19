import CoinCard from "./CoinCard";

export default function CryptoList({
  coins,
  selectedCoin,
  setSelectedCoin,
}) {
  if (coins.length === 0) {
    return (
      <div className="empty-state">
        <h3>No Cryptocurrency Found</h3>

        <p>
          Try searching with another coin name or symbol.
        </p>
      </div>
    );
  }

  return (
    <div className="crypto-list">
      {coins.map((coin) => (
        <CoinCard
          key={coin.id}
          coin={coin}
          selectedCoin={selectedCoin}
          setSelectedCoin={setSelectedCoin}
        />
      ))}
    </div>
  );
}