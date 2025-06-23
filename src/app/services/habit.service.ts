import { Injectable } from '@angular/core';
import { Habito } from '../models/habito.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HabitService {

  private readonly API_URL = 'http://localhost:3000/habits';
  constructor(private http: HttpClient) { }

  getHabitos() {
    return this.http.get<Habito[]>(this.API_URL)
  }

  getById(id: number) {
    return this.http.get<Habito>(`${this.API_URL}/${id}`)
  }

  private add(habito: Habito) {
    return this.http.post<Habito>(this.API_URL, habito);
  }

  private update(habito: Habito) {
    return this.http.put<Habito>(`${this.API_URL}/${habito.id}`, habito);
  }

  save(habito: Habito) {
    return habito.id ? this.update(habito) : this.add(habito);
  }

  deleteHabit(habito: Habito) {
    return this.http.delete<Habito>(`${this.API_URL}/${habito.id}`);
  }
} 