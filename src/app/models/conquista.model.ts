import { Habito } from "./habito.model"


export type Conquista = {
    id?: number,
    habitos: Habito[],
    descricao: string,
    dataConquista: Date | string,
    status: boolean

}