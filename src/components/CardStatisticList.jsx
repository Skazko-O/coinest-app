import { useEffect, useState } from 'react';
import CardStatistic from './CardStatistic';

function CardStatisticList() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    fetch('/data/statistics.json')
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error('Failed to load statistics:', err));
  }, []);

  return (
    <div className="statisticGrid">
      {stats.map((stat) => (
        <CardStatistic key={stat.id} data={stat} />
      ))}
    </div>
  );
}

export default CardStatisticList;