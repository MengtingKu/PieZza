import PropTypes from 'prop-types';
import Icon from '@helper/FontAwesomeIcon';

const OperationSummary = ({ incomeData, allOrders }) => {
    const summary = [
        {
            name: 'income',
            cards: [
                {
                    title: '累積營收',
                    icon: 'moneyBill',
                    value:
                        incomeData &&
                        incomeData
                            .reduce((acc, data) => acc + data.income, 0)
                            .toLocaleString(),
                },
            ],
        },
        {
            name: 'order',
            cards: [
                {
                    title: '訂單總量',
                    icon: 'listCheck',
                    value:
                        Object.keys(allOrders).length &&
                        Object.values(allOrders).reduce(
                            (acc, type) => acc + type.length,
                            0
                        ),
                },
                {
                    title: '成立訂單量',
                    icon: 'circleCheck',
                    value:
                        Object.keys(allOrders).length &&
                        allOrders?.payment.length,
                },
            ],
        },
    ];

    return (
        <div className="row g-3">
            {summary.map((block, index) => {
                return (
                    <div className="col-12 col-md-6" key={index}>
                        <div
                            className={
                                block.name === 'order' ? 'row g-3' : 'h-100'
                            }
                        >
                            {block.cards.map(card => {
                                return (
                                    <div
                                        className={
                                            block.name === 'order'
                                                ? 'col-12 col-md-6'
                                                : 'h-100'
                                        }
                                        key={card.title}
                                    >
                                        <div className="card h-100">
                                            <div className="card-body d-flex align-items-center position-relative">
                                                <div className="card_icon">
                                                    <Icon
                                                        icon={card.icon}
                                                        size="2xl"
                                                        color="white"
                                                    />
                                                </div>
                                                <div className="flex-grow-1 ms-3 justify-content-between align-items-center text-center">
                                                    <p className="h5">
                                                        {card.title}
                                                    </p>
                                                    <p className="h1">
                                                        {card.value}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

OperationSummary.propTypes = {
    incomeData: PropTypes.object.isRequired,
    allOrders: PropTypes.array.isRequired,
};

export default OperationSummary;
