import { Habito } from "./habito.model"
import { Objetivo } from "./objetivo.model";


export enum StatusConquistaType {
  ATIVA = 'ativa',
  INATIVA = 'inativa'
}

export interface Conquista {
    id?: string,
    habitos: Habito[],
    descricao: string,
    data: Date | string,
    status: StatusConquistaType,
    objetivos: Objetivo[];
}