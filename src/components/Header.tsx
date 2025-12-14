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
      month: 'numeric',
      day: 'numeric'
    });
  };

  return (
    <div className="h-full bg-white/90 backdrop-blur-sm border-b border-gray-300 flex items-center px-3">
      <div className="flex-1 flex items-center justify-between max-w-4xl mx-auto">
        {/* 左侧：时间 */}
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-gray-600" />
          <div className="text-sm">
            <div className="font-semibold text-gray-800">{formatTime(time)}</div>
            <div className="text-xs text-gray-500">{formatDate(time)}</div>
          </div>
        </div>

        {/* 中间：能源 */}
        <div className="flex items-center gap-2">
          <Zap size={16} className="text-gray-600" />
          <div className="text-sm">
            <div className={`font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {netEnergy.toFixed(1)} kW
            </div>
            <div className="text-xs text-gray-500">
              {totalEnergyProduction.toFixed(0)} / {totalEnergyConsumption.toFixed(0)}
            </div>
          </div>
        </div>

        {/* 右侧：资金和温度 */}
        <div className="flex items-center gap-3">
          {/* 温度 */}
          <div className="flex items-center gap-1">
            <Thermometer size={16} className="text-gray-600" />
            <span className="text-sm font-semibold text-gray-800">{globalTemperature.toFixed(0)}°C</span>
          </div>

          {/* 资金 */}
          <div className="flex items-center gap-1">
            <DollarSign size={16} className="text-orange-600" />
            <span className="text-sm font-semibold text-orange-600">¥{money.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;