import Card from 'react-bootstrap/Card';

function CardStatistic({ data }) {
    const isPositive = data.trend.startsWith('+');
    const trendIcon = isPositive ? 'TrendUp' : 'TrendDown';
    return (
        <Card>
            <Card.Body>
                <div className="statisticHead">
                    <button className="circleBtn">
                        <svg className="icon">
                            <use xlinkHref={`src/assets/images/icon/sprite_card.svg#${data.icon}`} />
                        </svg>
                    </button>
                    <button className="dots">
                        <svg className="icon">
                            <use xlinkHref="src/assets/images/icon/sprite_card.svg#DotsThreeVertical" />
                        </svg>
                    </button>
                </div>
                <div className="statisticMain">
                    <div className={`badge ${isPositive ? 'badgeUp' : 'badgeDown'}`}>
                        <div>
                            <img src={`/src/assets/images/icon/${trendIcon}.svg`} alt={data.trendIcon} />
                        </div>
                        <div>{data.trend}</div>
                    </div>
                    <div className="amount">${data.amount.toLocaleString()}</div>
                    <div className="totalItem">{data.label}</div>
                </div>
            </Card.Body>
        </Card>
    )
}

export default CardStatistic;         