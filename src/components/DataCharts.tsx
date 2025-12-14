import React from 'react';
import ReactECharts from 'echarts-for-react';
import { useGameStore } from '../store/gameStore';

const DataCharts: React.FC = () => {
  const { history, time } = useGameStore();

  // 生成24小时时间轴
  const generateTimeAxis = () => {
    const times = [];
    for (let i = 0; i < 24; i++) {
      times.push(`${i.toString().padStart(2, '0')}:00`);
    }
    return times;
  };

  // 获取当前时间的索引
  const getCurrentHourIndex = () => {
    return time.getHours();
  };

  // 准备24小时数据
  const prepare24HourData = () => {
    const productionData = new Array(24).fill(0);
    const consumptionData = new Array(24).fill(0);

    // 填充历史数据
    history.powerTrend.forEach(item => {
      const hour = item.time.getHours();
      productionData[hour] = item.production;
      consumptionData[hour] = item.consumption;
    });

    return { productionData, consumptionData };
  };

  const { productionData, consumptionData } = prepare24HourData();
  const currentHour = getCurrentHourIndex();

  // 迷你趋势图配置
  const option = {
    grid: {
      top: 5,
      bottom: 0,
      left: 0,
      right: 0,
      containLabel: false
    },
    xAxis: {
      type: 'category',
      data: generateTimeAxis(),
      show: false
    },
    yAxis: {
      type: 'value',
      show: false,
      min: 0
    },
    series: [
      {
        name: '发电量',
        type: 'line',
        smooth: true,
        data: productionData,
        symbol: 'none',
        lineStyle: {
          width: 2,
          color: '#059669'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(5, 150, 105, 0.3)' },
              { offset: 1, color: 'rgba(5, 150, 105, 0.1)' }
            ]
          }
        },
        markPoint: {
          data: [{
            xAxis: currentHour,
            yAxis: productionData[currentHour],
            symbol: 'circle',
            symbolSize: 6,
            itemStyle: {
              color: '#059669'
            }
          }]
        }
      },
      {
        name: '耗电量',
        type: 'line',
        smooth: true,
        data: consumptionData,
        symbol: 'none',
        lineStyle: {
          width: 2,
          color: '#dc2626'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(220, 38, 38, 0.3)' },
              { offset: 1, color: 'rgba(220, 38, 38, 0.1)' }
            ]
          }
        },
        markPoint: {
          data: [{
            xAxis: currentHour,
            yAxis: consumptionData[currentHour],
            symbol: 'circle',
            symbolSize: 6,
            itemStyle: {
              color: '#dc2626'
            }
          }]
        }
      }
    ]
  };

  return (
    <div className="h-full w-full bg-white/80 backdrop-blur-sm border-b border-gray-300 px-3 py-2">
      <div className="h-full">
        <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
      </div>
    </div>
  );
};

export default DataCharts;