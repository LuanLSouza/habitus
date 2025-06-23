import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Objetivo } from '../models/objetivo.model';

@Injectable({
  providedIn: 'root'
})
export class ObjetivoService {
  private readonly API_URL = 'http://localhost:3000/objectives'
  constructor(private http: HttpClient) { }

  getObjetivos(){
    return this.http.get<Objetivo[]>(this.API_URL);
  }

  getById(id: number) {
    return this.http.get<Objetivo>(`${this.API_URL}/${id}`);
  }

  private add(objetivo: Objetivo) {
    return this.http.post<Objetivo>(this.API_URL, objetivo);
  }

  private update(objetivo: Objetivo) {
    return this.http.put<Objetivo>(`${this.API_URL}/${objetivo.id}`, objetivo);
  }

  save(objetivo: Objetivo) {
    return objetivo.id ? this.update(objetivo) : this.add(objetivo);
  }

  deteleObjetivo(objetivo: Objetivo) {
    return this.http.delete<Objetivo>(`${this.API_URL}/${objetivo.id}`);
  }

}
