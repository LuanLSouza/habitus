import { Injectable } from '@angular/core';
import { Habit, FrequencyType, StatusType } from '../models/habit.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HabitService {
  private listHabitos: Habit[] =([
    {
      id: 1,
      nome: 'Beber água',
      descricao: 'Beber 2L de água por dia',
      frequencia: FrequencyType.DAILY,
      dataInicio: new Date('2023-01-01'),
      status: StatusType.ACTIVE
    },
    {
      id: 2,
      nome: 'Meditar',
      descricao: 'Meditar por 15 minutos',
      frequencia: FrequencyType.DAILY,
      dataInicio: new Date('2023-02-15'),
      status: StatusType.ACTIVE
    },
    {
      id: 3,
      nome: 'Ler livro',
      descricao: 'Ler pelo menos 30 páginas',
      frequencia: FrequencyType.WEEKLY,
      dataInicio: new Date('2023-03-10'),
      status: StatusType.PAUSED
    },
    {
      id: 4,
      nome: 'Fazer revisão mensal',
      descricao: 'Revisar objetivos e metas',
      frequencia: FrequencyType.MONTHLY,
      dataInicio: new Date('2023-01-25'),
      status: StatusType.COMPLETED
    }
  ]);

  constructor() { }

  getHabits(): Habit[] {
    return [...this.listHabitos];
  }


} 