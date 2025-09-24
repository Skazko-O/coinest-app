import Card from 'react-bootstrap/Card';

function CardStatistic({ data }) {
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
                        <div className="badge">
                            <div>
                                <img src={`/src/assets/images/icon/${data.trendIcon}.svg`} alt={data.trendIcon} />
                            </div>
                            <div>{data.trend}</div>
                        </div>
                        <div className="statisticAmount">${data.amount}</div>
                        <div className="totalIncome">{data.label}</div>
                    </div>
                </Card.Body>
            </Card>        
    )
}

export default CardStatistic;         