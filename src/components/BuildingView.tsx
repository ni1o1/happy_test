import React from 'react';
import { Home, Building, Server, Plus } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { RoomType } from '../types/game';

const BuildingView: React.FC = () => {
  const { building } = useGameStore();

  const getRoomIcon = (roomType: RoomType) => {
    switch (roomType) {
      case RoomType.RESIDENTIAL:
        return <Home size={20} />;
      case RoomType.OFFICE:
        return <Building size={20} />;
      case RoomType.SERVER:
        return <Server size={20} />;
      default:
        return null;
    }
  };

  const getRoomColor = (roomType: RoomType) => {
    switch (roomType) {
      case RoomType.RESIDENTIAL:
        return 'bg-blue-500/20 border-blue-500';
      case RoomType.OFFICE:
        return 'bg-purple-500/20 border-purple-500';
      case RoomType.SERVER:
        return 'bg-orange-500/20 border-orange-500';
      case RoomType.EMPTY:
        return 'bg-slate-700/50 border-dashed border-slate-500';
    }
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4">
      <div className="space-y-2">
        {building.floors.map((floor) => (
          <div key={floor.id} className="p-3 rounded-lg border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="text-sm font-semibold text-slate-300">第 {floor.level} 层</div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {floor.rooms.map((room) => (
                <div
                  key={room.id}
                  className={`aspect-square rounded-lg border-2 flex flex-col items-center justify-center relative ${getRoomColor(room.type)}`}
                >
                  {room.type !== RoomType.EMPTY ? (
                    <>
                      <div className="text-slate-200 mb-1">{getRoomIcon(room.type)}</div>
                      {room.tenant && (
                        <div className="text-xs text-slate-300 text-center">
                          <div>{room.tenant.name}</div>
                          <div className="text-xs text-slate-400">{room.tenant.satisfaction.toFixed(0)}% 满意</div>
                        </div>
                      )}
                      {room.equipment.length > 0 && (
                        <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {room.equipment.length}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="flex items-center justify-center w-full h-full">
                      <Plus size={24} className="text-slate-500" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuildingView;