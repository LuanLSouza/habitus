import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Objetivo } from '../models/objetivo.model';

@Injectable({
  providedIn: 'root'
})
export class ObjetivoService {
  private readonly API_URL = 'http://localhost:3000/objetivos'
  constructor(private http: HttpClient) { }

  getObjetivos(){
    return this.http.get<Objetivo[]>(this.API_URL)
  }
  
}
