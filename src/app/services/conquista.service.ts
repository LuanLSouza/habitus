import { Injectable } from '@angular/core';
import { Habito } from '../models/habito.model';
import { HttpClient } from '@angular/common/http';
import { Conquista } from '../models/conquista.model';

@Injectable({
  providedIn: 'root'
})
export class ConquistaService {

  private readonly API_URL = 'http://localhost:3000/conquistas';
  constructor(private http: HttpClient) { }

  getConquistas() {
    return this.http.get<Conquista[]>(this.API_URL)
  }

  getById(id: number) {
    return this.http.get<Conquista>(`${this.API_URL}/${id}`)
  }

  private add(conquista: Conquista) {
    return this.http.post<Conquista>(this.API_URL, conquista);
  }

  private update(conquista: Conquista) {
    return this.http.put<Conquista>(`${this.API_URL}/${conquista.id}`, conquista);
  }

  save(conquista: Conquista) {
    return conquista.id ? this.update(conquista) : this.add(conquista);
  }

  deleteConquista(conquista: Conquista) {
    return this.http.delete<Conquista>(`${this.API_URL}/${conquista.id}`);
  }
} 