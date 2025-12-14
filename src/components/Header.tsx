import React from 'react';
import { Clock, DollarSign, Zap, Thermometer } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

const Header: React.FC = () => {
  const { time, money, totalEnergyProduction, totalEnergyConsumption, globalTemperature } = useGameStore();

  const netEnergy = totalEnergyProduction - totalEnergyConsumption;
  const isPositive = netEnergy >= 0;

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('zh-CN', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
      <div className="grid grid-cols-4 gap-4 max-w-4xl mx-auto">
        {/* 时间 */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 text-gray-600 mb-1">
            <Clock size={16} />
            <span className="text-xs font-medium">时间</span>
          </div>
          <div className="text-lg font-bold text-gray-800">{formatTime(time)}</div>
          <div className="text-xs text-gray-500">{formatDate(time)}</div>
        </div>

        {/* 金钱 */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 text-gray-600 mb-1">
            <DollarSign size={16} />
            <span className="text-xs font-medium">资金</span>
          </div>
          <div className="text-lg font-bold money-gold">¥{money.toLocaleString()}</div>
        </div>

        {/* 能源 */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 text-gray-600 mb-1">
            <Zap size={16} />
            <span className="text-xs font-medium">功率</span>
          </div>
          <div className={`text-lg font-bold ${isPositive ? 'energy-positive' : 'energy-negative'}`}>
            {isPositive ? '+' : ''}{netEnergy.toFixed(1)} kW
          </div>
          <div className="text-xs text-gray-500">
            产出: {totalEnergyProduction.toFixed(1)} | 消耗: {totalEnergyConsumption.toFixed(1)}
          </div>
        </div>

        {/* 温度 */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 text-gray-600 mb-1">
            <Thermometer size={16} />
            <span className="text-xs font-medium">温度</span>
          </div>
          <div className="text-lg font-bold text-gray-800">{globalTemperature.toFixed(1)}°C</div>
        </div>
      </div>
    </div>
  );
};

export default Header;