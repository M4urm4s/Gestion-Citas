import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
 
@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {
 
  // Clave para almacenamiento en Preferences
  private readonly KEY = 'app_configuracion';
 
  // Guarda la preferencia de borrado
  async guardarPermisoBorrar(
    permitir: boolean
  ): Promise<void> {
    await Preferences.set({
      key: this.KEY,
      value: JSON.stringify({
        permitirBorrarInicio: permitir
      })
    });
  }
 
  // Recupera la preferencia de borrado
  async obtenerPermisoBorrar(): Promise<boolean> {
    const result = await Preferences.get({
      key: this.KEY
    });
    if (result.value) {
      const config = JSON.parse(result.value);
      return config.permitirBorrarInicio || false;
    }
    return false;
  }
}
