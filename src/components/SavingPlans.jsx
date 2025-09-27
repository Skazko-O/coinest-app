import { useEffect, useState } from 'react';
import { ProgressBar } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';


function SavingPlans() {
    const [plan, setPlans] = useState([]);
    useEffect(() => {
        fetch('/data/plans.json')
            .then((res) => res.json())
            .then((data) => setPlans(data))
            .catch((err) => console.error('Failed to load saving plans:', err));
    }, []);
    return (
        <Card>
            <Card.Body>
                <div className="statisticHead">

                    <h3 className='headingSec'>Saving Plans</h3>

                    <a href="#" className='addPlan'>+ Add Plan</a>
                </div>
                {plan.length > 0 && (
                    <div className="fs-10 mb-2">
                        Total savings: ${plan.reduce((sum, plan) => sum + plan.amount, 0).toLocaleString()}
                    </div>
                )}

                {plan.map((plan) => {
                    const percent = plan.target > 0 ? (plan.amount / plan.target) * 100 : 0;
                    return (
                        <Card key={plan.id} className='p-3'>
                            <div className="statisticHead">
                                <div className="leftGroup">
                                <button className="circleBtn">
                                    <svg className="icon">
                                        <use xlinkHref={`./assets/images/icon/sprite_card.svg#${plan.icon}`} />
                                    </svg>
                                </button>
                                <div className="totalItem">{plan.label}</div>
                                </div>
                                <button className="dots">
                                    <svg className="icon">
                                        <use xlinkHref="./assets/images/icon/sprite_card.svg#DotsThreeVertical" />
                                    </svg>
                                </button>
                            </div>
                            <ProgressBar now={percent} label={`${percent}%`} className='mb-2' />
                            <div className="dailyLimit">
                                <div className="fs-10">${plan.amount.toLocaleString()}</div>
                                <div className='limit'>
                                    {percent.toFixed(1)}%
                                </div>
                                <div className='percent'>Target: ${plan.target.toLocaleString()}</div>
                            </div>
                        </Card>
                    );
                })}
            </Card.Body>
        </Card>
    )
}
export default SavingPlans;







