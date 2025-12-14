import React from 'react';
import { useGameStore } from './store/gameStore';
import Header from './components/Header';
import DataCharts from './components/DataCharts';
import BuildingView from './components/BuildingView';
import ControlPanel from './components/ControlPanel';
import { useGameTick } from './hooks/useGameTick';

function App() {
  // 启动游戏循环
  useGameTick();

  // 获取当前时间用于动态背景
  const currentTime = useGameStore(state => state.time);
  const hour = currentTime.getHours();

  // 动态背景色 - 根据时间变化
  const getBackgroundClass = () => {
    if (hour >= 6 && hour < 12) {
      return 'bg-gradient-to-b from-blue-300 to-blue-100'; // 早晨
    } else if (hour >= 12 && hour < 18) {
      return 'bg-gradient-to-b from-blue-200 to-blue-50'; // 白天
    } else if (hour >= 18 && hour < 21) {
      return 'bg-gradient-to-b from-orange-300 to-yellow-100'; // 傍晚
    } else {
      return 'bg-gradient-to-b from-indigo-900 to-purple-800'; // 夜晚
    }
  };

  return (
    <div className={`h-[100dvh] w-screen overflow-hidden flex flex-col ${getBackgroundClass()}`}>
      {/* 顶部HUD - 固定高度 */}
      <div className="h-14 flex-shrink-0">
        <Header />
      </div>

      {/* 迷你趋势图 - 固定高度 */}
      <div className="h-24 flex-shrink-0">
        <DataCharts />
      </div>

      {/* 大楼视图 - 可滚动 */}
      <div className="flex-1 overflow-y-auto">
        <BuildingView />
      </div>

      {/* 底部控制栏 - 固定高度 */}
      <div className="h-16 flex-shrink-0">
        <ControlPanel />
      </div>
    </div>
  );
}

export default App;