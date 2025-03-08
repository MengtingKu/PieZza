import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const useECharts = (options, events) => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        if (!chartRef.current) return;

        const myChart = echarts.init(chartRef.current);
        chartInstanceRef.current = myChart;

        myChart.setOption(options);

        if (events) {
            Object.keys(events).forEach(eventName => {
                myChart.on(eventName, events[eventName]);
            });
        }

        const handleResize = () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.resize();
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (chartInstanceRef.current) {
                chartInstanceRef.current.dispose();
            }
        };
    }, [options, events]);

    return chartRef;
};

export default useECharts;
