import { Injectable } from '@angular/core';
import { Habito } from '../models/habito.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface HabitFilter {
  nome?: string;
  descricao?: string;
  frequencia?: string;
  status?: string;
  categoriaId?: string;
  dataInicio?: string;
  dataFim?: string;
  dataInicioRange?: string;
  dataFimRange?: string;
  objetivoIds?: string[];
  conquistaIds?: string[];
  orderBy?: 'nome' | 'dataInicio' | 'status' | 'frequencia';
  orderDirection?: 'ASC' | 'DESC';
  page?: number;
  limit?: number;
}

export interface HabitSearchResponse {
  data: Habito[];
  total: number;
  page: number;
  limit: number;
}

@Injectable({
  providedIn: 'root'
})
export class HabitService {

  private readonly API_URL = 'http://localhost:3000/habits';
  constructor(private http: HttpClient) { }

  getHabitos() {
    return this.http.get<Habito[]>(this.API_URL)
  }

  getById(id: string) {
    return this.http.get<Habito>(`${this.API_URL}/${id}`)
  }

  searchWithFilters(filters: HabitFilter): Observable<HabitSearchResponse> {
    let params = new HttpParams();
    
    Object.keys(filters).forEach(key => {
      const value = filters[key as keyof HabitFilter];
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          value.forEach(item => {
            params = params.append(key, item);
          });
        } else {
          params = params.set(key, value.toString());
        }
      }
    });

    return this.http.get<HabitSearchResponse>(`${this.API_URL}/search`, { params });
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