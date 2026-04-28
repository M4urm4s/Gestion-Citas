// Interface que define la estructura de una cita famosa
export interface Cita {
  id?: number;       // Identificador único (auto-incremental en SQLite)
  frase: string;     // Texto de la cita famosa
  autor: string;     // Nombre del autor de la cita
}
