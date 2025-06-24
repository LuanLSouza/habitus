import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HabitFilter } from '../../../services/habit.service';
import { FrequencyType, StatusType } from '../../../models/habito.model';
import { Categoria } from '../../../models/categoria.model';
import { CategoriaService } from '../../../services/categoria.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss'],
  standalone: false
})
export class SearchModalComponent implements OnInit {
  searchForm: FormGroup;
  FrequencyType = FrequencyType;
  StatusType = StatusType;
  categorias: Categoria[] = [];
  showAdvancedFilters = false;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private categoriaService: CategoriaService
  ) {
    this.searchForm = this.formBuilder.group({
      nome: [''],
      descricao: [''],
      frequencia: [''],
      status: [''],
      categoriaId: [''],
      dataInicio: [''],
      dataFim: [''],
      dataInicioRange: [''],
      dataFimRange: [''],
      orderBy: ['nome'],
      orderDirection: ['ASC']
    });
  }

  ngOnInit() {
    this.loadCategorias();
  }

  loadCategorias() {
    this.categoriaService.getCategorias().subscribe({
      next: (categorias) => {
        this.categorias = categorias;
      },
      error: (error) => {
        console.error('Erro ao carregar categorias:', error);
      }
    });
  }

  toggleAdvancedFilters() {
    this.showAdvancedFilters = !this.showAdvancedFilters;
  }

  search() {
    const filters: HabitFilter = {};
    
    Object.keys(this.searchForm.value).forEach(key => {
      const value = this.searchForm.get(key)?.value;
      if (value !== null && value !== undefined && value !== '') {
        filters[key as keyof HabitFilter] = value;
      }
    });

    this.modalController.dismiss(filters, 'search');
  }

  resetFilters() {
    this.searchForm.reset({
      orderBy: 'nome',
      orderDirection: 'ASC'
    });
  }

  cancel() {
    this.modalController.dismiss(null, 'cancel');
  }
} 