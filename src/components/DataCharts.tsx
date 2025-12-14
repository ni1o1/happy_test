import React from 'react';
import ReactECharts from 'echarts-for-react';
import { useGameStore } from '../store/gameStore';

const DataCharts: React.FC = () => {
  const { history } = useGameStore();

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  // 能源趋势图配置
  const powerOption = {
    title: {
      text: '能源趋势',
      left: 'center',
      textStyle: {
        color: '#374151',
        fontSize: 16,
        fontWeight: 'bold'
      }
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#d1d5db',
      borderWidth: 1,
      textStyle: {
        color: '#374151'
      },
      formatter: function (params: any) {
        let result = params[0].axisValue + '<br/>';
        params.forEach((param: any) => {
          result += param.marker + param.seriesName + ': ' + param.value + ' kW<br/>';
        });
        return result;
      }
    },
    legend: {
      data: ['发电量', '耗电量'],
      bottom: 10,
      textStyle: {
        color: '#6b7280'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: history.powerTrend.map(item => formatTime(item.time)),
      axisLine: {
        lineStyle: {
          color: '#d1d5db'
        }
      },
      axisLabel: {
        color: '#6b7280',
        fontSize: 12
      }
    },
    yAxis: {
      type: 'value',
      name: '功率 (kW)',
      nameTextStyle: {
        color: '#6b7280'
      },
      axisLine: {
        lineStyle: {
          color: '#d1d5db'
        }
      },
      axisLabel: {
        color: '#6b7280'
      },
      splitLine: {
        lineStyle: {
          color: '#e5e7eb',
          type: 'dashed'
        }
      }
    },
    series: [
      {
        name: '发电量',
        type: 'line',
        smooth: true,
        data: history.powerTrend.map(item => item.production.toFixed(1)),
        itemStyle: {
          color: '#059669'
        },
        lineStyle: {
          width: 3
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
        }
      },
      {
        name: '耗电量',
        type: 'line',
        smooth: true,
        data: history.powerTrend.map(item => item.consumption.toFixed(1)),
        itemStyle: {
          color: '#dc2626'
        },
        lineStyle: {
          width: 3
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
        }
      }
    ]
  };

  // 资金趋势图配置
  const moneyOption = {
    title: {
      text: '资金趋势',
      left: 'center',
      textStyle: {
        color: '#374151',
        fontSize: 16,
        fontWeight: 'bold'
      }
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#d1d5db',
      borderWidth: 1,
      textStyle: {
        color: '#374151'
      },
      formatter: function (params: any) {
        return params[0].axisValue + '<br/>' +
               params[0].marker + '资金: ¥' + params[0].value.toLocaleString();
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: history.moneyTrend.map(item => formatTime(item.time)),
      axisLine: {
        lineStyle: {
          color: '#d1d5db'
        }
      },
      axisLabel: {
        color: '#6b7280',
        fontSize: 12
      }
    },
    yAxis: {
      type: 'value',
      name: '资金 (¥)',
      nameTextStyle: {
        color: '#6b7280'
      },
      axisLine: {
        lineStyle: {
          color: '#d1d5db'
        }
      },
      axisLabel: {
        color: '#6b7280',
        formatter: '¥{value}'
      },
      splitLine: {
        lineStyle: {
          color: '#e5e7eb',
          type: 'dashed'
        }
      }
    },
    series: [
      {
        name: '资金',
        type: 'line',
        smooth: true,
        data: history.moneyTrend.map(item => item.money),
        itemStyle: {
          color: '#d97706'
        },
        lineStyle: {
          width: 3
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(217, 119, 6, 0.3)' },
              { offset: 1, color: 'rgba(217, 119, 6, 0.1)' }
            ]
          }
        }
      }
    ]
  };

  return (
    <div className="w-full h-full p-4 bg-white rounded-lg border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
        <div className="h-80">
          <ReactECharts option={powerOption} style={{ height: '100%', width: '100%' }} />
        </div>
        <div className="h-80">
          <ReactECharts option={moneyOption} style={{ height: '100%', width: '100%' }} />
        </div>
      </div>
    </div>
  );
};

export default DataCharts;