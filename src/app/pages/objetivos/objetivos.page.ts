import { Component, OnInit } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { Objetivo } from 'src/app/models/objetivo.model';
import { ObjetivoService } from 'src/app/services/objetivo.service';

@Component({
  selector: 'app-objetivos',
  templateUrl: './objetivos.page.html',
  styleUrls: ['./objetivos.page.scss'],
  standalone: false
})
export class ObjetivosPage implements OnInit, ViewWillEnter {
  objetivos: Objetivo[] = [];

  constructor(
    private objetivoService: ObjetivoService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(): void {
    this.objetivoService.getObjetivos().subscribe(
      {
        next: (response) => {
          this.objetivos = response;
        },
        error: (error) => {
          alert('Erro ao carregar os objetivos:');
          console.error(error);
        }
      }
    )
  }


}
