import { Injectable } from '@angular/core';
import { Habit, FrequencyType, StatusType } from '../models/habit.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HabitService {
  private listHabitos: Habit[] = [];

  private readonly API_URL = 'http://localhost:3000/habits';
  constructor(private http: HttpClient) { }

  getHabitos() {
    return this.http.get<Habit[]>(this.API_URL)
  }

  getHabitById(id: number): Habit | undefined {
    return this.listHabitos.find(habit => habit.id === id);
  }

  addHabit(habit: Partial<Habit>): Habit {
    const newId = Math.max(...this.listHabitos.map(h => h.id), 0) + 1;
    
    const newHabit: Habit = {
      id: newId,
      nome: habit.nome || '',
      descricao: habit.descricao || '',
      frequencia: habit.frequencia || FrequencyType.DAILY,
      dataInicio: habit.dataInicio ? new Date(habit.dataInicio) : new Date(),
      status: habit.status || StatusType.ACTIVE
    };
    
    this.listHabitos.push(newHabit);
    
    return newHabit;
  }

  updateHabit(updatedHabit: Habit): boolean {
    const index = this.listHabitos.findIndex(h => h.id === updatedHabit.id);
    
    if (index !== -1) {
      this.listHabitos[index] = {...updatedHabit};
      return true;
    }
    
    return false;
  }

  deleteHabit(id: number): boolean {
    const initialLength = this.listHabitos.length;
    this.listHabitos = this.listHabitos.filter(habit => habit.id !== id);
    return initialLength > this.listHabitos.length;
  }
} 