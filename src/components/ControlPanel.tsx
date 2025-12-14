import React, { useState } from 'react';
import { Hammer, Plus, X } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { RoomType } from '../types/game';

const ControlPanel: React.FC = () => {
  const { addFloor, buildRoom, building } = useGameStore();
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
      {/* 底部控制栏 - 极简设计 */}
      <div className="h-full bg-white/90 backdrop-blur-sm border-t border-gray-300">
        <div className="h-full flex items-center justify-center gap-4 px-4">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
          >
            <Plus size={16} />
            建造房间
          </button>

          <button
            onClick={addFloor}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
          >
            <Hammer size={16} />
            添加楼层
          </button>

          <div className="text-xs text-gray-500 ml-2">
            点击空房间建造
          </div>
        </div>
      </div>

      {/* 建造房间模态框 */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="p-4 mx-4 max-w-sm w-full rounded-lg border border-gray-300 bg-white shadow-xl">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-base font-semibold text-gray-800">选择房间类型</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-2">
              {roomTypes.map((room) => (
                <button
                  key={room.type}
                  onClick={() => handleBuildRoom(room.type)}
                  className="w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left border border-gray-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{room.icon}</span>
                      <div>
                        <div className="font-medium text-gray-800 text-sm">{room.name}</div>
                        <div className="text-xs text-gray-500">
                          收入: ¥{room.income}/分钟
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-orange-600 font-semibold text-sm">¥{room.cost}</div>
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