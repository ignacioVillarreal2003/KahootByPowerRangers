import { IPropuesta } from "./IPropuesta";

export interface IJuego {
    id: string,
    titulo: string,
    codigo: string,
    link: string,
    propuesta: IPropuesta
}