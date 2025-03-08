import PropTypes from 'prop-types';
import useECharts from '@hook/useECharts';

const EChartBasic = ({ customOption, data, event = null }) => {
    const options = {
        tooltip: {
            trigger: 'axis',
        },
        legend: {},
        grid: {
            left: '5%',
            right: '10%',
            top: '10%',
            bottom: '10%',
            containLabel: true,
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: data?.xAxis ?? [],
        },
        yAxis: {
            type: 'value',
        },
        series: data?.series ?? [],
        ...customOption,
    };

    const chartRef = useECharts(options, event);

    return <div ref={chartRef} style={{ width: '100%', height: '300px' }} />;
};

EChartBasic.propTypes = {
    data: PropTypes.object,
    customOption: PropTypes.object,
    event: PropTypes.func,
};

export default EChartBasic;
