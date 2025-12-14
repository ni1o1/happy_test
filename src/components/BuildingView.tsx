import React from 'react';
import { Home, Building, Server, Plus, Zap } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { RoomType } from '../types/game';

const BuildingView: React.FC = () => {
  const { building } = useGameStore();

  const getRoomIcon = (roomType: RoomType) => {
    switch (roomType) {
      case RoomType.RESIDENTIAL:
        return <Home size={16} className="text-orange-600" />;
      case RoomType.OFFICE:
        return <Building size={16} className="text-blue-600" />;
      case RoomType.SERVER:
        return <Server size={16} className="text-purple-600" />;
      default:
        return null;
    }
  };

  const getRoomColor = (roomType: RoomType) => {
    switch (roomType) {
      case RoomType.RESIDENTIAL:
        return 'bg-orange-50';
      case RoomType.OFFICE:
        return 'bg-blue-50';
      case RoomType.SERVER:
        return 'bg-purple-50';
      case RoomType.EMPTY:
        return 'bg-gray-50';
    }
  };

  const getSatisfactionColor = (satisfaction: number) => {
    if (satisfaction >= 80) return 'bg-green-500';
    if (satisfaction >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="h-full px-4 py-2">
      <div className="max-w-4xl mx-auto h-full">
        <div className="relative h-full">
          {/* 左侧承重墙 */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-600"></div>
          {/* 右侧承重墙 */}
          <div className="absolute right-0 top-0 bottom-0 w-1 bg-gray-600"></div>

          {/* 楼层容器 - 使用gap-px创建墙体效果 */}
          <div className="space-y-px h-full overflow-y-auto">
            {building.floors.map((floor, floorIndex) => (
              <div key={floor.id} className="relative">
                {/* 楼板 - 除了顶层 */}
                {floorIndex > 0 && (
                  <div className="absolute -top-px left-0 right-0 h-px bg-gray-500"></div>
                )}

                {/* 楼层主体 - 固定高度 */}
                <div className="h-16 flex items-center">
                  {/* 楼层标签 */}
                  <div className="w-8 flex items-center justify-center text-xs font-bold text-gray-600">
                    {floor.level}
                  </div>

                  {/* 房间行 - 使用gap-px模拟墙体 */}
                  <div className="flex-1 grid grid-cols-4 gap-px h-full px-2">
                    {floor.rooms.map((room) => (
                      <div
                        key={room.id}
                        className={`${getRoomColor(room.type)} border border-gray-300 flex flex-col items-center justify-center relative`}
                        onClick={() => {
                          // TODO: 触发建造或设备安装
                        }}
                      >
                        {room.type !== RoomType.EMPTY ? (
                          <>
                            {/* 顶部：图标和设备计数 */}
                            <div className="flex items-center justify-between w-full px-1 pt-1">
                              <div className="flex-1">{getRoomIcon(room.type)}</div>
                              {room.equipment.length > 0 && (
                                <div className="flex items-center gap-1">
                                  <Zap size={12} className="text-blue-600" />
                                  <span className="text-xs font-bold text-blue-600">{room.equipment.length}</span>
                                </div>
                              )}
                            </div>

                            {/* 底部：满意度指示器 */}
                            {room.tenant && (
                              <div className="flex-1 flex items-center justify-center">
                                <div className={`w-2 h-2 rounded-full ${getSatisfactionColor(room.tenant.satisfaction)}`}></div>
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="flex items-center justify-center w-full h-full hover:bg-gray-100 cursor-pointer transition-colors"
                               onClick={(e) => {
                                 e.stopPropagation();
                                 // 触发建造房间
                               }}
                          >
                            <Plus size={20} className="text-gray-400" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildingView;