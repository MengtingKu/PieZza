import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import EChartBasic from '@components/common/EChartBasic';

const PerformanceChart = ({ incomeData, pieData }) => {
    const salesData = {
        xAxis: incomeData
            .map(data => (data.date === 'Invalid Date' ? '面交' : data.date))
            .reverse(),
        series: [
            {
                data: incomeData.map(data => data.income).reverse(),
                type: 'line',
            },
        ],
    };
    const productsOption = {
        tooltip: {
            trigger: 'item',
        },
        xAxis: null,
        yAxis: null,
        legend: {
            top: '0%',
            left: 'center',
        },
        series: [
            {
                type: 'pie',
                radius: '50%',
                data: pieData,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                    },
                },
            },
        ],
    };

    return (
        <div className="row g-3">
            <div className="col-md-6">
                <div className="card h-100">
                    <div className="card-header">銷售業績</div>
                    <div className="card-body">
                        <EChartBasic data={salesData} />
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <div className="card h-100">
                    <div className="card-header">商品種類分布</div>
                    <div className="card-body">
                        <div className="text-end">
                            <Link
                                to="product-list"
                                className="btn btn-outline-secondary btn-sm mb-3"
                                type="button"
                            >
                                產品管理
                            </Link>
                        </div>
                        <EChartBasic customOption={productsOption} />
                    </div>
                </div>
            </div>
        </div>
    );
};

PerformanceChart.propTypes = {
    incomeData: PropTypes.object.isRequired,
    pieData: PropTypes.array.isRequired,
};

export default PerformanceChart;
