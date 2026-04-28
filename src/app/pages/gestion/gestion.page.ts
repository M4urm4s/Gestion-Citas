import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,
         ReactiveFormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent,
         IonItem, IonLabel, IonInput, IonButton,
         IonList, IonText } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { CitaComponent } from
  '../../componentes/cita/cita.component';
import { CitasService } from
  '../../services/citas.service';
import { Cita } from '../../models/cita.model';
 
@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.page.html',
  styleUrls: ['./gestion.page.scss'],
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonItem, IonLabel, IonInput, IonButton,
    IonList, IonText,
    CitaComponent
  ]
})
export class GestionPage implements OnInit {
 
  citaForm!: FormGroup;
  citas: Cita[] = [];
 
  constructor(
    private fb: FormBuilder,
    private citasService: CitasService
  ) {}
 
  ngOnInit() {
    // Formulario reactivo con validaciones
    this.citaForm = this.fb.group({
      frase: ['', [
        Validators.required,
        Validators.minLength(5)
      ]],
      autor: ['', [
        Validators.required,
        Validators.minLength(2)
      ]]
    });
    this.cargarCitas();
  }
 
  async cargarCitas() {
    this.citas = await this.citasService.obtenerTodas();
  }
 
  async agregarCita() {
    if (this.citaForm.valid) {
      const nueva: Cita = {
        frase: this.citaForm.value.frase,
        autor: this.citaForm.value.autor
      };
      await this.citasService.agregar(nueva);
      this.citaForm.reset();
      await this.cargarCitas();
    }
  }
 
  async onEliminarCita(cita: Cita) {
    if (cita.id) {
      await this.citasService.eliminar(cita.id);
      await this.cargarCitas();
    }
  }
}
