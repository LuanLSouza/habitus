import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'habitos',
    loadChildren: () => import('./pages/habitos/habitos.module').then( m => m.HabitosPageModule)
  },
  {
    path: 'conquistas',
    loadChildren: () => import('./pages/conquistas/conquistas.module').then( m => m.ConquistasPageModule)
  },
  {
    path: 'objetivos',
    loadChildren: () => import('./pages/objetivos/objetivos.module').then( m => m.ObjetivosPageModule)
  },
  {
    path: 'categorias',
    loadChildren: () => import('./pages/categorias/categorias.module').then( m => m.CategoriasPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
