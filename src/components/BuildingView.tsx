import React from 'react';
import { Home, Building, Server, Plus } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { RoomType } from '../types/game';

const BuildingView: React.FC = () => {
  const { building } = useGameStore();

  const getRoomIcon = (roomType: RoomType) => {
    switch (roomType) {
      case RoomType.RESIDENTIAL:
        return <Home size={20} className="text-orange-600" />;
      case RoomType.OFFICE:
        return <Building size={20} className="text-blue-600" />;
      case RoomType.SERVER:
        return <Server size={20} className="text-purple-600" />;
      default:
        return null;
    }
  };

  const getRoomColor = (roomType: RoomType) => {
    switch (roomType) {
      case RoomType.RESIDENTIAL:
        return 'bg-orange-100 border-orange-300';
      case RoomType.OFFICE:
        return 'bg-blue-100 border-blue-300';
      case RoomType.SERVER:
        return 'bg-purple-100 border-purple-300';
      case RoomType.EMPTY:
        return 'bg-gray-100 border-gray-300';
    }
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          {/* 左侧承重墙 */}
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-gray-400"></div>
          {/* 右侧承重墙 */}
          <div className="absolute right-0 top-0 bottom-0 w-2 bg-gray-400"></div>

          <div className="space-y-1">
            {building.floors.map((floor, floorIndex) => (
              <div key={floor.id} className="relative">
                {/* 楼板 - 除了顶层 */}
                {floorIndex > 0 && (
                  <div className="absolute -top-1 left-0 right-0 h-2 bg-gray-500"></div>
                )}
                <div className="pt-2">
                  {/* 楼层标签 */}
                  <div className="text-sm font-medium text-gray-600 mb-2 pl-4">
                    F{floor.level}
                  </div>

                  {/* 房间行 */}
                  <div className="grid grid-cols-4 gap-1 px-4">
                    {floor.rooms.map((room) => (
                      <div
                        key={room.id}
                        className={`aspect-square border-2 flex flex-col items-center justify-center relative ${getRoomColor(room.type)}`}
                        style={{
                          borderTopWidth: room.position === 0 ? '2px' : '0',
                          borderBottomWidth: '2px',
                          borderLeftWidth: room.position === 0 ? '2px' : '0',
                          borderRightWidth: room.position === 3 ? '2px' : '0',
                        }}
                      >
                        {room.type !== RoomType.EMPTY ? (
                          <>
                            <div className="mb-1">{getRoomIcon(room.type)}</div>
                            {room.tenant && (
                              <div className="text-xs text-gray-700 text-center font-medium">
                                <div>{room.tenant.name}</div>
                                <div className="text-xs text-gray-500">{room.tenant.satisfaction.toFixed(0)}%</div>
                              </div>
                            )}
                            {room.equipment.length > 0 && (
                              <div className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                                {room.equipment.length}
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="flex items-center justify-center w-full h-full hover:bg-gray-200 cursor-pointer transition-colors"
                               onClick={() => {
                                 // TODO: 触发建造房间
                               }}
                          >
                            <Plus size={24} className="text-gray-400" />
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