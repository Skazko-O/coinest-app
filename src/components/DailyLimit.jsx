import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import ProgressBar from 'react-bootstrap/ProgressBar';

function DailyLimit() {
    const [daily, setDaily] = useState(null);
    useEffect(() => {
        fetch('data/dailyLimit.json')
            .then((res) => res.json())
            .then((data) => setDaily(data))
            .catch((err) => console.error('Failed to load daily limit:', err));
    }, []);

    if (!daily) return null;
    const percent = daily.limit > 0 ? (daily.spent / daily.limit) * 100 : 0;
    return (
        <Card>
            <Card.Body>

                <div className="statisticHead">
                    <h3 className='headingSec'>Daily Limit</h3>
                    <button className="dots">
                        <svg className="icon">
                            <use xlinkHref="assets/images/icon/sprite_card.svg#DotsThreeVertical" />
                        </svg>
                    </button>
                </div>
                <div className="dailyLimit mb-4">
                    <div className='spent'>${daily.spent} </div>
                    <div className='limit'>spent of ${daily.limit}</div>
                    <div className='percent'>
                        {percent.toFixed(1)}%
                    </div>
                </div>
                <ProgressBar
                    now={percent}
                    label={`${percent.toFixed(1)}%`}
                    variant={percent < 70 ? 'success' : percent < 90 ? 'warning' : 'danger'}
                />
            </Card.Body>
        </Card>
    )
}

export default DailyLimit;