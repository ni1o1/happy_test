import React from 'react';
import Header from './components/Header';
import BuildingView from './components/BuildingView';
import ControlPanel from './components/ControlPanel';
import { useGameTick } from './hooks/useGameTick';

function App() {
  // 启动游戏循环
  useGameTick();

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-slate-900 to-slate-800">
      {/* 顶部HUD */}
      <Header />

      {/* 主视图 - 大楼 */}
      <BuildingView />

      {/* 底部控制面板 */}
      <ControlPanel />
    </div>
  );
}

export default App;