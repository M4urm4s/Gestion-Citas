import { Injectable } from '@angular/core';
import { Cita } from '../models/cita.model';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  private citas: Cita[] = [];
  private nextId: number = 1;

  async inicializar(): Promise<void> {
    // Datos iniciales
    if (this.citas.length === 0) {
      this.citas = [
        { id: 1, frase: 'La vida es lo que pasa mientras haces otros planes', autor: 'John Lennon' },
        { id: 2, frase: 'El conocimiento es poder', autor: 'Francis Bacon' },
        { id: 3, frase: 'Pienso, luego existo', autor: 'René Descartes' }
      ];
      this.nextId = 4;
    }
  }

  async agregar(cita: Cita): Promise<void> {
    cita.id = this.nextId++;
    this.citas.push(cita);
  }

  async obtenerTodas(): Promise<Cita[]> {
    return [...this.citas];
  }

  async eliminar(id: number): Promise<void> {
    this.citas = this.citas.filter(c => c.id !== id);
  }
}