export type Objetivo = {
    id?: number,
    titulo: string,
    descricao: string,
    dataInicio: Date | string,
    prazoConclusao: Date | string,
    progresso: number
}