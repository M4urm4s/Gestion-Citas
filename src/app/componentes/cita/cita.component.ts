import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonCard, IonCardHeader, IonCardTitle,
         IonCardSubtitle, IonCardContent,
         IonButton, IonIcon } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Cita } from '../../models/cita.model';
 
@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonCard, IonCardHeader, IonCardTitle,
    IonCardSubtitle, IonCardContent,
    IonButton, IonIcon
  ]
})
export class CitaComponent {
 
  // @Input: recibe la cita desde el componente padre
  @Input() cita!: Cita;
 
  // @Input: controla visibilidad del botón eliminar
  @Input() mostrarBorrar: boolean = true;
 
  // @Output: emite evento de eliminación al padre
  @Output() eliminarCita = new EventEmitter<Cita>();
 
  // Método que emite el evento al presionar eliminar
  onEliminar() {
    this.eliminarCita.emit(this.cita);
  }
}
