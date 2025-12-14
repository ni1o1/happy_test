import React, { useState } from 'react';
import { Hammer, Wrench, BarChart3, X } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { RoomType } from '../types/game';

const ControlPanel: React.FC = () => {
  const { addFloor, buildRoom, building } = useGameStore();
  const [activeTab, setActiveTab] = useState<'build' | 'equipment' | 'data'>('build');
  const [showModal, setShowModal] = useState(false);

  const roomTypes = [
    { type: RoomType.RESIDENTIAL, name: '住宅', icon: '🏠', cost: 5000, income: 10 },
    { type: RoomType.OFFICE, name: '办公室', icon: '🏢', cost: 10000, income: 20 },
    { type: RoomType.SERVER, name: '机房', icon: '🖥️', cost: 20000, income: 50 },
  ];

  const handleBuildRoom = (roomType: RoomType) => {
    const floor = building.floors[building.floors.length - 1];
    buildRoom(floor.id, roomType);
    setShowModal(false);
  };

  return (
    <>
      {/* 底部控制栏 */}
      <div className="p-4 mx-4 mb-4 rounded-lg border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
        <div className="flex justify-around">
          <button
            onClick={() => setActiveTab('build')}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'build' ? 'bg-blue-500 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Hammer size={24} />
            <span className="text-xs">建设</span>
          </button>

          <button
            onClick={() => setActiveTab('equipment')}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'equipment' ? 'bg-blue-500 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Wrench size={24} />
            <span className="text-xs">设备</span>
          </button>

          <button
            onClick={() => setActiveTab('data')}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'data' ? 'bg-blue-500 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <BarChart3 size={24} />
            <span className="text-xs">数据</span>
          </button>
        </div>

        {/* 操作内容 */}
        <div className="mt-4">
          {activeTab === 'build' && (
            <div className="flex gap-2">
              <button
                onClick={() => setShowModal(true)}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors"
              >
                建造房间
              </button>
              <button
                onClick={addFloor}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors"
              >
                添加楼层
              </button>
            </div>
          )}

          {activeTab === 'equipment' && (
            <div className="text-center text-slate-400">
              点击房间来安装设备
            </div>
          )}

          {activeTab === 'data' && (
            <div className="text-center text-slate-400">
              数据统计功能开发中...
            </div>
          )}
        </div>
      </div>

      {/* 建造房间模态框 */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="p-6 mx-4 max-w-md w-full rounded-lg border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">选择房间类型</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-3">
              {roomTypes.map((room) => (
                <button
                  key={room.type}
                  onClick={() => handleBuildRoom(room.type)}
                  className="w-full p-4 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors text-left"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{room.icon}</span>
                      <div>
                        <div className="font-medium">{room.name}</div>
                        <div className="text-sm text-slate-400">
                          收入: ¥{room.income}/分钟
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-yellow-400">¥{room.cost}</div>
                      <div className="text-xs text-slate-400">建造成本</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ControlPanel;