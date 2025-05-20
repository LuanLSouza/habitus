export enum PrioridadeType {
  ALTA = 'alta',
  MEDIA = 'media',
  BAIXA = 'baixa'
}

export enum StatusCategoriaType {
  ATIVA = 'ativa',
  INATIVA = 'inativa'
}

export interface Categoria {
  id?: number;
  nome: string;
  cor: string;
  descricao: string;
  prioridade: PrioridadeType;
  status: StatusCategoriaType;
} 