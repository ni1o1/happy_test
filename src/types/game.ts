// 房间类型
export enum RoomType {
  RESIDENTIAL = 'residential',  // 住宅
  OFFICE = 'office',            // 办公
  SERVER = 'server',            // 机房
  EMPTY = 'empty'               // 空房间
}

// 设备类型
export enum EquipmentType {
  SOLAR_PANEL = 'solar_panel',  // 光伏板
  AIR_CONDITIONER = 'air_conditioner',  // 空调
  BATTERY = 'battery',          // 电池
  GENERATOR = 'generator'       // 发电机
}

// 设备接口
export interface Equipment {
  id: string;
  type: EquipmentType;
  name: string;
  energyProduction: number;  // 发电量 (kW)
  energyConsumption: number; // 耗电量 (kW)
  cost: number;              // 安装成本
  maintenanceCost: number;   // 维护成本 (每分钟)
}

// 租户接口
export interface Tenant {
  id: string;
  name: string;
  satisfaction: number;      // 满意度 (0-100)
  rent: number;             // 租金 (每分钟)
  energyUsage: number;      // 用电量 (kW)
}

// 房间接口
export interface Room {
  id: string;
  type: RoomType;
  tenant: Tenant | null;
  equipment: Equipment[];
  position: number;         // 在楼层中的位置
}

// 楼层接口
export interface Floor {
  id: string;
  level: number;            // 楼层编号 (从1开始)
  rooms: Room[];
}

// 建筑接口
export interface Building {
  floors: Floor[];
}

// 游戏状态接口
export interface GameState {
  money: number;
  time: Date;               // 游戏内时间
  totalEnergyProduction: number;   // 总发电量 (kW)
  totalEnergyConsumption: number;  // 总耗电量 (kW)
  globalTemperature: number;       // 环境温度 (°C)
  building: Building;
}