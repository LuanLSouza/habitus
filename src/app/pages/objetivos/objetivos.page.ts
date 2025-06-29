import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController, ViewWillEnter } from '@ionic/angular';
import { Objetivo } from 'src/app/models/objetivo.model';
import { ObjetivoService } from 'src/app/services/objetivo.service';
import { ObjetivoModalComponent } from './objetivo-modal/objetivo-modal.component';

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
    private alertController: AlertController,
    private modalController: ModalController,
    private toastController: ToastController
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
              next: () => {
                this.toastController.create({
                  message: 'Objetivo removido com sucesso!',
                  duration: 2000,
                  position: 'top',
                  color: 'success'
                }).then(toast => toast.present());
                this.atualizarObjetivos()
              },
              error: (err) => {
                this.toastController.create({
                  message: err.error.message,
                  header: 'Erro ao remover objetivo.',
                  position: 'top',
                  color: 'danger',
                  buttons:[
                    {
                      text: 'OK',
                      role: 'cancel'
                    }
                  ]
                }).then(toast => toast.present());
              }
            })
          }
        }
      ]
    })

    await alert.present();
  }

  async openAddObjetivoModal() {
    const modal = await this.modalController.create({
      component: ObjetivoModalComponent
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm' && data) {
      this.objetivoService.save(data).subscribe({
        next: () => {
          this.toastController.create({
            message: 'Objetivo adicionado com sucesso!',
            duration: 2000,
            position: 'top',
            color: 'success'
          }).then(toast => toast.present());
          this.atualizarObjetivos()
        },
        error: (err) => {
          this.toastController.create({
            message: err.error.message,
            header: 'Erro ao adicionar objetivo: ' + data.titulo + ' Tente novamente.',
            position: 'top',
            color: 'danger',
            buttons:[
              {
                text: 'OK',
                role: 'cancel'
              }
            ]
          }).then(toast => toast.present());
        }
      });
    }
  }

  async openEditObjetivoModal(objetivo: Objetivo) {
    const modal = await this.modalController.create({
      component: ObjetivoModalComponent,
      componentProps: {
        objetivo: { ...objetivo }
      }
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm' && data) {
      this.objetivoService.save(data).subscribe({
        next: () => {
          this.toastController.create({
            message: 'Objetivo atualizado com sucesso!',
            duration: 2000,
            position: 'top',
            color: 'success'
          }).then(toast => toast.present());
          this.atualizarObjetivos()
        },
        error: (err) => {
          this.toastController.create({
            message: err.error.message,
            header: 'Erro ao adicionar objetivo: ' + data.titulo + ' Tente novamente.',
            position: 'top',
            color: 'danger',
            buttons:[
              {
                text: 'OK',
                role: 'cancel'
              }
            ]
          }).then(toast => toast.present());
        }
      });
    }
  }

  atualizarObjetivos() {
    this.objetivoService.getObjetivos().subscribe({
      next: (objetivos) => this.objetivos = objetivos,
      error: (error) => console.error('Erro ao carregar os objetivos:', error)
    })
  }

}
