export enum FrequencyType {
  DAILY = 'diario',
  WEEKLY = 'semanal',
  MONTHLY = 'mensal'
}

export enum StatusType {
  ACTIVE = 'ativo',
  COMPLETED = 'concluido',
  PAUSED = 'pausado'
}

export interface Habit {
  id: number;
  nome: string;
  descricao: string;
  frequencia: FrequencyType;
  dataInicio: Date;
  status: StatusType;
} 