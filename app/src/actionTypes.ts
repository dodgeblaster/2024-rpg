type ElementType = 'fire' | 'ice' | 'water' | 'lightning' | 'none';

type StatusEffect = 'poison' | 'sleep' | 'paralysis' | 'blind' | 'silence' | 'confuse';

type StatType = 'hp' | 'mp' | 'str_phy' | 'str_mag' | 'def_phy' | 'def_mag' | 'speed';

type ActionType = 'add' | 'subtract' | 'set' | 'multiply';

type TargetType = 'party:single' | 'party:all' | 'enemy:single' | 'enemy:all';

interface ActionBase {
  name: string;
  target: TargetType;
  element?: ElementType;
}

interface DamageAction extends ActionBase {
  effect: `${StatType}:subtract`;
  strength: number;
}

interface HealAction extends ActionBase {
  effect: `${StatType}:add`;
  strength: number;
}

interface BuffAction extends ActionBase {
  effect: `${StatType}:multiply`;
  multiplier: number;
  duration: number;
}

interface SetStatAction extends ActionBase {
  effect: `${StatType}:set`;
  value: number;
}

interface StatusEffectAction extends ActionBase {
  effect: `status:${ActionType}`;
  status: StatusEffect;
  duration?: number;
  chance?: number;
}

interface ItemAction extends ActionBase {
  itemId: string;
  consumable: boolean;
}

interface WeightedAction extends ActionBase {
  weight: number;
}

interface EventAction extends ActionBase {
  event: string;
  priority: number;
}

interface PhaseAction extends WeightedAction {
  maxHp: number;
  minHp: number;
}

type Action = 
  | DamageAction 
  | HealAction 
  | BuffAction 
  | SetStatAction 
  | StatusEffectAction 
  | ItemAction 
  | WeightedAction 
  | EventAction 
  | PhaseAction;

// Example usage:
const fireballAction: DamageAction = {
  name: "Fireball",
  target: "enemy:single",
  effect: "hp:subtract",
  strength: 50,
  element: "fire"
};

const healSpellAction: HealAction = {
  name: "Cure",
  target: "party:single",
  effect: "hp:add",
  strength: 100
};

const poisonAttackAction: StatusEffectAction = {
  name: "Poison Strike",
  target: "enemy:single",
  effect: "status:add",
  status: "poison",
  duration: 3,
  chance: 0.75
};