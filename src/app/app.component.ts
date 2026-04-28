import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet, IonToolbar, IonButtons,
         IonButton, IonIcon } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { homeOutline, listOutline, settingsOutline,
         refreshOutline, trashOutline } from 'ionicons/icons';
import { CitasService } from './services/citas.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [
    IonApp, IonRouterOutlet, IonToolbar, IonButtons,
    IonButton, IonIcon, RouterLink
  ]
})
export class AppComponent implements OnInit {

  constructor(private citasService: CitasService) {
    addIcons({
      homeOutline, listOutline, settingsOutline,
      refreshOutline, trashOutline
    });
  }

  async ngOnInit() {
    await this.citasService.inicializar();
  }
}