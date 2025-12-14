import { create } from 'zustand';
import { GameState, Building, Floor, Room, RoomType, Equipment, EquipmentType, Tenant } from '../types/game';

interface GameStore extends GameState {
  // Actions
  addFloor: () => void;
  buildRoom: (floorId: string, roomType: RoomType) => void;
  installEquipment: (floorId: string, roomId: string, equipmentType: EquipmentType) => void;
  tick: () => void;
}

// 设备定义
const EQUIPMENT_DEFS: Record<EquipmentType, Omit<Equipment, 'id'>> = {
  [EquipmentType.SOLAR_PANEL]: {
    type: EquipmentType.SOLAR_PANEL,
    name: '光伏板',
    energyProduction: 5,  // 白天5kW，夜晚0kW
    energyConsumption: 0,
    cost: 5000,
    maintenanceCost: 1
  },
  [EquipmentType.AIR_CONDITIONER]: {
    type: EquipmentType.AIR_CONDITIONER,
    name: '空调',
    energyProduction: 0,
    energyConsumption: 3,
    cost: 2000,
    maintenanceCost: 0.5
  },
  [EquipmentType.BATTERY]: {
    type: EquipmentType.BATTERY,
    name: '电池',
    energyProduction: 0,
    energyConsumption: 0,
    cost: 3000,
    maintenanceCost: 0.3
  },
  [EquipmentType.GENERATOR]: {
    type: EquipmentType.GENERATOR,
    name: '发电机',
    energyProduction: 10,
    energyConsumption: 0,
    cost: 8000,
    maintenanceCost: 5
  }
};

// 创建默认租户
function createDefaultTenant(roomType: RoomType): Tenant {
  switch (roomType) {
    case RoomType.RESIDENTIAL:
      return {
        id: `tenant_${Date.now()}`,
        name: '居民',
        satisfaction: 80,
        rent: 10,
        energyUsage: 2
      };
    case RoomType.OFFICE:
      return {
        id: `tenant_${Date.now()}`,
        name: '公司',
        satisfaction: 70,
        rent: 20,
        energyUsage: 5
      };
    case RoomType.SERVER:
      return {
        id: `tenant_${Date.now()}`,
        name: '数据中心',
        satisfaction: 90,
        rent: 50,
        energyUsage: 20
      };
    default:
      throw new Error('Invalid room type for tenant');
  }
}

// 创建空房间
function createEmptyRoom(position: number): Room {
  return {
    id: `room_${Date.now()}_${position}`,
    type: RoomType.EMPTY,
    tenant: null,
    equipment: [],
    position
  };
}

// 创建带租户的房间
function createRoomWithTenant(roomType: RoomType, position: number): Room {
  return {
    id: `room_${Date.now()}_${position}`,
    type: roomType,
    tenant: createDefaultTenant(roomType),
    equipment: [],
    position
  };
}

// 创建默认楼层
function createDefaultFloor(level: number): Floor {
  return {
    id: `floor_${level}`,
    level,
    rooms: [
      createEmptyRoom(0),  // 初始一个空房间
      createEmptyRoom(1),
      createEmptyRoom(2),
      createEmptyRoom(3)
    ]
  };
}

// 计算光伏发电量
function calculateSolarProduction(hour: number): number {
  // 6:00-18:00 白天，其他时间夜晚
  if (hour >= 6 && hour < 18) {
    // 正午12点发电量最高
    const peak = Math.abs(hour - 12);
    return Math.max(0, 1 - peak / 6);
  }
  return 0;
}

// 计算温度（简化版）
function calculateTemperature(hour: number): number {
  // 6:00 最低 15°C，14:00 最高 30°C
  const baseTemp = 22.5;
  const amplitude = 7.5;
  const hourAngle = (hour - 6) * (Math.PI / 12);
  return baseTemp + amplitude * Math.sin(hourAngle);
}

export const useGameStore = create<GameStore>((set, get) => ({
  // 初始状态
  money: 10000,
  time: new Date(2024, 0, 1, 8, 0), // 2024年1月1日 08:00
  totalEnergyProduction: 0,
  totalEnergyConsumption: 0,
  globalTemperature: 22,
  building: {
    floors: [createDefaultFloor(1)]
  },
  history: {
    powerTrend: [],
    moneyTrend: []
  },

  // 添加楼层
  addFloor: () => {
    const state = get();
    const newLevel = state.building.floors.length + 1;
    const newFloor = createDefaultFloor(newLevel);

    set({
      building: {
        floors: [...state.building.floors, newFloor]
      }
    });
  },

  // 建造房间
  buildRoom: (floorId: string, roomType: RoomType) => {
    const state = get();
    const floorIndex = state.building.floors.findIndex(f => f.id === floorId);
    if (floorIndex === -1) return;

    // 找到第一个空房间
    const emptyRoomIndex = state.building.floors[floorIndex].rooms.findIndex(r => r.type === RoomType.EMPTY);
    if (emptyRoomIndex === -1) return;

    const newFloors = [...state.building.floors];
    newFloors[floorIndex] = {
      ...newFloors[floorIndex],
      rooms: newFloors[floorIndex].rooms.map((room, idx) =>
        idx === emptyRoomIndex ? createRoomWithTenant(roomType, room.position) : room
      )
    };

    set({
      building: { floors: newFloors }
    });
  },

  // 安装设备
  installEquipment: (floorId: string, roomId: string, equipmentType: EquipmentType) => {
    const state = get();
    const equipmentDef = EQUIPMENT_DEFS[equipmentType];

    if (state.money < equipmentDef.cost) return;

    const newFloors = state.building.floors.map(floor => {
      if (floor.id !== floorId) return floor;

      return {
        ...floor,
        rooms: floor.rooms.map(room => {
          if (room.id !== roomId) return room;

          const newEquipment: Equipment = {
            ...equipmentDef,
            id: `equipment_${Date.now()}`
          };

          return {
            ...room,
            equipment: [...room.equipment, newEquipment]
          };
        })
      };
    });

    set({
      money: state.money - equipmentDef.cost,
      building: { floors: newFloors }
    });
  },

  // 游戏时钟滴答
  tick: () => {
    const state = get();

    // 更新时间
    const newTime = new Date(state.time.getTime() + 30 * 60 * 1000); // +30分钟
    const hour = newTime.getHours();

    // 计算温度
    const temperature = calculateTemperature(hour);

    // 计算总发电量和耗电量
    let totalProduction = 0;
    let totalConsumption = 0;
    let totalIncome = 0;
    let totalExpense = 0;

    state.building.floors.forEach(floor => {
      floor.rooms.forEach(room => {
        // 租户耗电和收入
        if (room.tenant) {
          totalConsumption += room.tenant.energyUsage;
          totalIncome += room.tenant.rent;

          // 温度影响满意度
          if (room.type !== RoomType.SERVER) {
            const tempDiff = Math.abs(temperature - 24); // 理想温度24度
            room.tenant.satisfaction = Math.max(0, Math.min(100,
              room.tenant.satisfaction - tempDiff * 0.1));
          }
        }

        // 设备耗电和发电
        room.equipment.forEach(equipment => {
          // 光伏发电
          if (equipment.type === EquipmentType.SOLAR_PANEL) {
            const solarRatio = calculateSolarProduction(hour);
            totalProduction += equipment.energyProduction * solarRatio;
          } else {
            totalProduction += equipment.energyProduction;
          }

          totalConsumption += equipment.energyConsumption;
          totalExpense += equipment.maintenanceCost;
        });
      });
    });

    // 净收益（负值表示亏损）
    const netProfit = totalIncome - totalExpense;
    const newMoney = state.money + netProfit;

    // 更新历史数据（限制长度为60个数据点）
    const newPowerData = {
      time: newTime,
      production: totalProduction,
      consumption: totalConsumption
    };
    const newMoneyData = {
      time: newTime,
      money: newMoney
    };

    const updatedPowerTrend = [...state.history.powerTrend, newPowerData].slice(-60);
    const updatedMoneyTrend = [...state.history.moneyTrend, newMoneyData].slice(-60);

    // 更新状态
    set({
      time: newTime,
      money: newMoney,
      totalEnergyProduction: totalProduction,
      totalEnergyConsumption: totalConsumption,
      globalTemperature: temperature,
      building: state.building, // 保持引用不变
      history: {
        powerTrend: updatedPowerTrend,
        moneyTrend: updatedMoneyTrend
      }
    });
  }
}));