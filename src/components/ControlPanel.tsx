import React, { useState } from 'react';
import { Hammer, Wrench, BarChart3, X } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { RoomType } from '../types/game';
import DataCharts from './DataCharts';

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
      <div className="bg-white border-t border-gray-200 shadow-sm">
        <div className="p-4">
          <div className="flex justify-around max-w-4xl mx-auto">
            <button
              onClick={() => setActiveTab('build')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'build' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <Hammer size={24} />
              <span className="text-xs">建设</span>
            </button>

            <button
              onClick={() => setActiveTab('equipment')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'equipment' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <Wrench size={24} />
              <span className="text-xs">设备</span>
            </button>

            <button
              onClick={() => setActiveTab('data')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'data' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <BarChart3 size={24} />
              <span className="text-xs">数据</span>
            </button>
          </div>

          {/* 操作内容 */}
          <div className="mt-4 max-w-4xl mx-auto">
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
              <div className="text-center text-gray-500">
                点击房间来安装设备
              </div>
            )}

            {activeTab === 'data' && (
              <div className="h-96">
                <DataCharts />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 建造房间模态框 */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="p-6 mx-4 max-w-md w-full rounded-lg border border-gray-300 bg-white shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">选择房间类型</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-3">
              {roomTypes.map((room) => (
                <button
                  key={room.type}
                  onClick={() => handleBuildRoom(room.type)}
                  className="w-full p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left border border-gray-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{room.icon}</span>
                      <div>
                        <div className="font-medium text-gray-800">{room.name}</div>
                        <div className="text-sm text-gray-500">
                          收入: ¥{room.income}/分钟
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-orange-600 font-semibold">¥{room.cost}</div>
                      <div className="text-xs text-gray-500">建造成本</div>
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