import { useEffect, useState } from 'react';
import CardStatistic from './CardStatistic';

function CardStatisticList({ totals, trends }) {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    fetch('data/statistics.json')
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error('Failed to load statistics:', err));
  }, []);

  return (
    <div className="statisticGrid">
      {stats.map((stat) => (
        <CardStatistic
          key={stat.id}
          data={stat}
          totals={totals}
          trend={trends?.[stat.key] ?? '0%'}
        />
      ))}
    </div>
  );
}

export default CardStatisticList;
