import Card from 'react-bootstrap/Card';

function CardStatistic({ data, totals, trend }) {
    const isPositive = data.trend.startsWith('+');
    const trendIcon = isPositive ? 'TrendUp' : 'TrendDown';

    let amount = 0;
    if (totals && data.key) {
        const keyMap = {
            income: totals.totalIncome,
            expense: totals.totalExpense,
            balance: totals.totalBalance,
        };
        amount = keyMap[data.key] ?? 0;
    }

    return (
        <Card>
            <Card.Body>
                <div className="statisticHead">
                    <button className="circleBtn">
                        <svg className="icon">
                            <use xlinkHref={`assets/images/icon/sprite_card.svg#${data.icon}`} />
                        </svg>
                    </button>
                    {/* <button className="dots">
                        <svg className="icon">
                            <use xlinkHref="assets/images/icon/sprite_card.svg#DotsThreeVertical" />
                        </svg>
                    </button> */}
                </div>
                <div className="statisticMain">
                    <div className={`badge ${isPositive ? 'badgeUp' : 'badgeDown'}`}>
                        <div>
                            <img src={`assets/images/icon/${trendIcon}.svg`} alt={data.trendIcon} />
                        </div>
                        <div>{trend}</div>
                    </div>
                    <div className="amount">
                        ${typeof amount === 'number' ? amount.toLocaleString() : '0'}
                    </div>
                    <div className="totalItem">{data.label}</div>
                </div>
            </Card.Body>
        </Card>
    )
}

export default CardStatistic;         