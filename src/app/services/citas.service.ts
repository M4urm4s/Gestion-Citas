import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection,
  SQLiteDBConnection
} from '@capacitor-community/sqlite';
import { Cita } from '../models/cita.model';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  private sqlite: SQLiteConnection;
  private db: SQLiteDBConnection | null = null;
  private readonly DB_NAME = 'citasDB';

  constructor() {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
  }

  async inicializar(): Promise<void> {
    try {
      const retCC = (await this.sqlite
        .checkConnectionsConsistency()).result;
      const isConn = (await this.sqlite
        .isConnection(this.DB_NAME, false)).result;

      if (!isConn && !retCC) {
        this.db = await this.sqlite.createConnection(
          this.DB_NAME, false, 'no-encryption', 1, false
        );
      } else {
        this.db = await this.sqlite.retrieveConnection(
          this.DB_NAME, false
        );
      }

      await this.db.open();
      await this.crearTabla();
      await this.insertarDatosIniciales();
    } catch (error) {
      console.error('Error SQLite:', error);
    }
  }

  private async crearTabla(): Promise<void> {
    const sql = `CREATE TABLE IF NOT EXISTS citas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      frase TEXT NOT NULL,
      autor TEXT NOT NULL
    );`;
    await this.db?.run(sql);
  }

  private async insertarDatosIniciales() {
    const citas = await this.obtenerTodas();
    if (citas.length === 0) {
      const iniciales: Cita[] = [
        { frase: 'La vida es lo que pasa mientras haces otros planes',
          autor: 'John Lennon' },
        { frase: 'El conocimiento es poder',
          autor: 'Francis Bacon' },
        { frase: 'Pienso, luego existo',
          autor: 'René Descartes' }
      ];
      for (const c of iniciales) {
        await this.agregar(c);
      }
    }
  }

  async agregar(cita: Cita): Promise<void> {
    const sql = 'INSERT INTO citas (frase, autor) VALUES (?,?)';
    await this.db?.run(sql, [cita.frase, cita.autor]);
  }

  async obtenerTodas(): Promise<Cita[]> {
    const res = await this.db?.query('SELECT * FROM citas');
    return res?.values || [];
  }

  async eliminar(id: number): Promise<void> {
    const sql = 'DELETE FROM citas WHERE id = ?';
    await this.db?.run(sql, [id]);
  }
}