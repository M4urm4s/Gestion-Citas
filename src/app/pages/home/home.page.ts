import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent,
         IonButton, IonIcon } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { CitaComponent } from
  '../../componentes/cita/cita.component';
import { CitasService } from
  '../../services/citas.service';
import { ConfiguracionService } from
  '../../services/configuracion.service';
import { Cita } from '../../models/cita.model';
 
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButton, IonIcon,
    CitaComponent
  ]
})
export class HomePage implements OnInit {
 
  citaAleatoria: Cita | null = null;
  permitirBorrar: boolean = false;
 
  constructor(
    private citasService: CitasService,
    private configService: ConfiguracionService
  ) {}
 
  // Ciclo de vida: carga configuración y cita aleatoria
  async ngOnInit() {
    this.permitirBorrar =
      await this.configService.obtenerPermisoBorrar();
    await this.cargarCitaAleatoria();
  }
 
  // Obtiene una cita aleatoria del servicio
  async cargarCitaAleatoria() {
    const citas = await this.citasService.obtenerTodas();
    if (citas.length > 0) {
      const i = Math.floor(Math.random() * citas.length);
      this.citaAleatoria = citas[i];
    }
  }
 
  // Captura el @Output del CitaComponent
  async onEliminarCita(cita: Cita) {
    if (cita.id) {
      await this.citasService.eliminar(cita.id);
      await this.cargarCitaAleatoria();
    }
  }
}
