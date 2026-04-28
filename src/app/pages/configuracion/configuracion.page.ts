import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle,
         IonContent, IonItem, IonLabel,
         IonToggle } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfiguracionService } from
  '../../services/configuracion.service';
 
@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle,
    IonContent, IonItem, IonLabel, IonToggle
  ]
})
export class ConfiguracionPage implements OnInit {
 
  permitirBorrar: boolean = false;
 
  constructor(
    private configService: ConfiguracionService
  ) {}
 
  // Ciclo de vida: carga configuración almacenada
  async ngOnInit() {
    this.permitirBorrar =
      await this.configService.obtenerPermisoBorrar();
  }
 
  // Persiste el cambio cuando el toggle cambia
  async onCambioPermiso() {
    await this.configService
      .guardarPermisoBorrar(this.permitirBorrar);
  }
}
