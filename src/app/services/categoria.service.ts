import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../models/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
 private readonly API_URL= "http://localhost:3000/categories";

  constructor(private http: HttpClient) { }

  getCategorias() {
    return this.http.get<Categoria[]>(this.API_URL);
  }

  getCategoria(id: number){
    return this.http.get<Categoria>(`${this.API_URL}/${id}`);
  }

  save(categoria: Categoria) {
    if (categoria.id) {
      return this.http.put<Categoria>(`${this.API_URL}/${categoria.id}`, categoria);
    }
    return this.http.post<Categoria>(this.API_URL, categoria);
  }

  deleteCategoria(categoria: Categoria) {
    return this.http.delete<void>(`${this.API_URL}/${categoria.id}`);
  }
} 