import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { splitText, formatTimestamp } from '@helper/stringAndDataHelpers';
import EChartBasic from '@components/common/EChartBasic';
import DynamicTable from '@components/common/DynamicTable';

const LatestOrder = ({ incomeData, allOrdersData }) => {
    const orderOption = {
        legend: { top: '3%' },
        grid: {
            left: '15%',
            right: '10%',
            top: '23%',
            bottom: '15%',
        },
        xAxis: {
            boundaryGap: true,
            data: incomeData
                .map(data =>
                    data.date === 'Invalid Date' ? '面交' : data.date
                )
                .reverse(),
        },
        series: [
            {
                data: incomeData.map(data => data.paymentNo).reverse(),
                type: 'bar',
            },
        ],
    };
    const orderFields = [
        {
            key: 'create_at',
            name: '訂購日期',
            class: 'text-start align-middle',
            type: 'custom',
            render: order => {
                return (
                    <small>
                        {formatTimestamp(order.create_at, 'YYYY-MM-DD')}
                    </small>
                );
            },
        },
        {
            key: 'name',
            name: '訂購人',
            class: 'text-start align-middle',
            type: 'custom',
            render: order => {
                return <small>{order.user.name}</small>;
            },
        },
        {
            key: 'products',
            name: '內容',
            class: 'text-start align-middle',
            type: 'custom',
            render: order => {
                const { products } = order;

                const items = Object.values(products).map(product => ({
                    title: product.product.title,
                    qty: product.qty,
                    subTotal: product.final_total,
                }));

                return (
                    <>
                        {items.map(item => {
                            return (
                                <div key={item.title}>
                                    <small>
                                        {splitText(item.title).chineseText} x{' '}
                                        {item.qty} = {item.subTotal}
                                    </small>
                                </div>
                            );
                        })}
                    </>
                );
            },
        },
        {
            key: 'is_paid',
            name: '狀態',
            class: 'text-center align-middle',
            type: 'custom',
            render: order => {
                return (
                    <small
                        className={`${
                            order.is_paid ? 'text-success' : 'text-danger'
                        }`}
                    >
                        {order.is_paid ? '已付款' : '未付款'}
                    </small>
                );
            },
        },
        {
            key: 'total',
            name: '總計',
            class: 'text-end align-middle',
            type: 'number',
        },
    ];

    const filterOrders = allOrdersData => {
        const today = dayjs().format('YYYY-MM-DD');
        const todayOrders = allOrdersData.filter(
            order => formatTimestamp(order.create_at, 'YYYY-MM-DD') === today
        );

        return todayOrders.length ? todayOrders : allOrdersData.slice(0, 6);
    };

    return (
        <div className="card h-100">
            <div className="card-header">近期訂單量</div>
            <div className="card-body">
                <div className="weekly border-bottom mb-3">
                    <h6>回推過去成交訂單單量表現</h6>
                    <EChartBasic customOption={orderOption} />
                </div>
                <div className="weekly">
                    <div className="title_group mb-3 d-flex justify-content-between align-items-center">
                        <h6>
                            今日訂單{' '}
                            <small className="text-secondary">
                                若無單會以近6筆顯示
                            </small>
                        </h6>
                        <Link
                            to="order-list"
                            className="d-block btn btn-outline-secondary btn-sm"
                            type="button"
                        >
                            訂單管理
                        </Link>
                    </div>

                    <div className="container">
                        <DynamicTable
                            data={filterOrders(allOrdersData) || []}
                            fields={orderFields}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

LatestOrder.propTypes = {
    incomeData: PropTypes.array.isRequired,
    allOrdersData: PropTypes.array.isRequired,
};

export default LatestOrder;
