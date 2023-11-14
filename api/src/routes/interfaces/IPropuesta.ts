import { IActividad } from "./IActividad";

export interface IPropuesta{
    id: string,
    titulo: string,
    listaActividades: IActividad[],
}