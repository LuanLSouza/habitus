import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  currentPage: string = 'habitos';

  constructor(private router: Router) {
    this.atualizarPaginaAtual();
  }

  navegar(page: string) {
    this.router.navigate([`/${page}`]);
    this.currentPage = page;
  }

  atualizarPaginaAtual() {
    const rotaAtual = this.router.url.split('/')[1];
    this.currentPage = rotaAtual || 'habitos';
  }

  getPaginaAtual() {
    return this.currentPage;
  }
}
