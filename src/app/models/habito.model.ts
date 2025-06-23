import { Categoria } from './categoria.model';
import { Conquista } from './conquista.model';
import { Objetivo } from './objetivo.model';

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

export type Habito = {
  id?: number,
  nome: string,
  descricao: string,
  frequencia: FrequencyType,
  dataInicio: Date | string,
  status: StatusType,
  categoria?: Categoria
  conquistas?: Conquista[];
  objetivos?: Objetivo[];
} 