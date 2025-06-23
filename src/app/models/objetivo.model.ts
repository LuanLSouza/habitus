import { Conquista } from "./conquista.model";
import { Habito } from "./habito.model";

export type Objetivo = {
    id?: string,
    titulo: string,
    descricao: string,
    dataInicio: Date | string,
    prazoConclusao: Date | string,
    progresso: number,
    habitos?: Habito[];
    conquistas?: Conquista[];
}