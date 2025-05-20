import { Component, OnInit } from '@angular/core';
import { AlertController, ViewWillEnter } from '@ionic/angular';
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
    private objetivoService: ObjetivoService,
    private alertController: AlertController
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

  async confirmDeleteObjetivo(objetivo: Objetivo) {
    console.log(objetivo);
    const alert = await this.alertController.create({
      header: 'Confirmar exclusão',
      message: `Tem certeza que deseja excluir o objetivo "${objetivo.titulo}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Excluir',
          role: 'confirm',
          cssClass: 'danger',
          handler: () => {
            this.objetivoService.deteleObjetivo(objetivo).subscribe({
              next: () => this.atualizarObjetivos(),
              error: (err) => console.error('Erro ao excluir objetivo:', err)
            })
          }
        }
      ]
    })

    await alert.present();
  }

  atualizarObjetivos() {
    this.objetivoService.getObjetivos().subscribe({
      next: (objetivos) => this.objetivos = objetivos,
      error: (error) => console.error('Erro ao carregar os objetivos:', error)
    })
  }

}
