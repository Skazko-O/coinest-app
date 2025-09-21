import clsx from 'clsx';

import dashboardStyles from './Dashboard.module.scss';
import layoutStyles from '../../layouts/MainLayout.module.scss';

function Dashboard() {
  return <> 
      <div className={layoutStyles.gridContainer}>
        <div className={layoutStyles.leftGridSection}>
          <div className={dashboardStyles.widgetCard}>
            <div className={dashboardStyles.cardHeader}>
              <img className={dashboardStyles.symbol} src="assets/images/icon/symbol.svg" />
              <img className={dashboardStyles.union} src="assets/images/icon/union.svg" />
            </div>
            <div className={dashboardStyles.cardName}>Andrew Forbist</div>
            <div className={dashboardStyles.cardFooter}>
              <div className={dashboardStyles.balanceGroup}>
                <div className={dashboardStyles.cardText}>Balance Amount</div>
                <div className={dashboardStyles.cardBalance}>$562,000</div>
              </div>
              <div className={dashboardStyles.secUnit}>
                <div>
                  <div className={dashboardStyles.cardText}>EXP</div>
                  <div className={dashboardStyles.cardSecurValue}>11/29</div>
                </div>
                <div>
                  <div className={dashboardStyles.cardText}>CVV</div>
                  <div className={dashboardStyles.cardSecurValue}>323</div>
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
        {/*left-grid-section*/}
        <div className={layoutStyles.centerGridSection}>
          <div className={dashboardStyles.sectionStatistic}>
            <div className={clsx(dashboardStyles.cardStatistic, dashboardStyles.borderSection)}>
              <div className={dashboardStyles.statisticHead}>
                <button className={dashboardStyles.circleBtn}>
                  <svg className={dashboardStyles.icon}>
                    <use xlinkHref="assets/images/icon/sprite_card.svg#CoinIn" />
                  </svg>
                </button>
                <button className={dashboardStyles.dots}>
                  <svg className={dashboardStyles.icon}>
                    <use xlinkHref="assets/images/icon/sprite_card.svg#DotsThreeVertical" />
                  </svg>
                </button>
              </div>
              <div className={dashboardStyles.statisticMain}>
                <div className={dashboardStyles.badge}>
                  <div>
                    <img src="assets/images/icon/TrendUp.svg" alt="TrendUp" />
                  </div>
                  <div>+178%</div>
                </div>
                <div className={dashboardStyles.statisticAmount}>$78,000</div>
                <div className={dashboardStyles.totalIncome}>Total income</div>
              </div>
            </div>
            <div className={clsx(dashboardStyles.cardStatistic, dashboardStyles.borderSection)}>
              <div className={dashboardStyles.statisticHead}>
                <button className={dashboardStyles.circleBtn}>
                  <svg className={dashboardStyles.icon}>
                    <use xlinkHref="assets/images/icon/sprite_card.svg#CoinOut" />
                  </svg>
                </button>
                <button className={dashboardStyles.dots}>
                  <svg className={dashboardStyles.icon}>
                    <use xlinkHref="assets/images/icon/sprite_card.svg#DotsThreeVertical" />
                  </svg>
                </button>
              </div>
              <div className={dashboardStyles.statisticMain}>
                <div className={dashboardStyles.badge}>
                  <div>
                    <img
                      src="assets/images/icon/TrendDown.svg"
                      alt="TrendDown"
                    />
                  </div>
                  <div>-178%</div>
                </div>
                <div className={dashboardStyles.statisticAmount}>$43,000</div>
                <div className={dashboardStyles.totalIncome}>Total Expense</div>
              </div>
            </div>
            <div className={clsx(dashboardStyles.cardStatistic, dashboardStyles.borderSection)}>
              <div className={dashboardStyles.statisticHead}>
                <button className={dashboardStyles.circleBtn}>
                  <svg className={dashboardStyles.icon}>
                    <use xlinkHref="assets/images/icon/sprite_card.svg#Wallet" />
                  </svg>
                </button>
                <button className={dashboardStyles.dots}>
                  <svg className={dashboardStyles.icon}>
                    <use xlinkHref="assets/images/icon/sprite_card.svg#DotsThreeVertical" />
                  </svg>
                </button>
              </div>
              <div className={dashboardStyles.statisticMain}>
                <div className={dashboardStyles.badge}>
                  <div className={dashboardStyles.graphWrap}>
                    <img src="assets/images/icon/TrendUp.svg" alt="TrendUp" />
                  </div>
                  <div>+124%</div>
                </div>
                <div className={dashboardStyles.statisticAmount}>$56,000</div>
                <div className={dashboardStyles.totalIncome}>Total Savings</div>
              </div>
            </div>
          </div>
        </div>{" "}
        {/*center-grid-section*/}
        <div className={layoutStyles.rightGridSection}></div> {/*right-grid-section*/}
      </div>     
</>      
}

export default Dashboard;
