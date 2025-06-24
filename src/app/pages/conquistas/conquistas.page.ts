import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController, ViewWillEnter } from '@ionic/angular';
import { Conquista } from 'src/app/models/conquista.model';
import { ConquistaService } from 'src/app/services/conquista.service';
import { ConquistaModalComponent } from './conquista-modal/conquista-modal.component';

@Component({
  selector: 'app-conquistas',
  templateUrl: './conquistas.page.html',
  styleUrls: ['./conquistas.page.scss'],
  standalone: false
})
export class ConquistasPage implements OnInit, ViewWillEnter {
  conquistas: Conquista[] = [];
  constructor(
    private conquistaService: ConquistaService,
    private alertController: AlertController,
    private modalController: ModalController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.conquistaService.getConquistas().subscribe(
      {
        next: (response) => {
          this.conquistas = response;
        },
        error: (error) => {
          alert('Erro ao carregar as conquistas:');
          console.error(error);
        }
      }
    );
  }

  async openAddConquistaModal() {
    const modal = await this.modalController.create({
      component: ConquistaModalComponent
    });

    await modal.present();

    const { data, role} = await modal.onWillDismiss();

    if (role === 'confirm' && data) {
      this.conquistaService.save(data).subscribe({
          next: () => {
            this.toastController.create({
              message: 'Conquista adicionada com sucesso!',
              duration: 2000,
              position: 'top',
              color: 'success'
            }).then(toast => toast.present());
            this.atualizarConquistas()
          },
          error: (err) => {
          this.toastController.create({
              message: err.error.message,
              header: 'Erro ao adicionar conquista: ' + data.descricao + ' Tente novamente.',
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

  async openEditHabitModal(conquista: Conquista) {
    const modal = await this.modalController.create({
        component: ConquistaModalComponent,
        componentProps: {
            conquista: {...conquista}
        }
    });
  
    await modal.present();
  
    const { data, role } = await modal.onWillDismiss();
  
    if (role === 'confirm' && data) {
        this.conquistaService.save(data).subscribe({
          next: () => {
            this.toastController.create({
              message: 'Conquista atualizada com sucesso!',
              duration: 2000,
              position: 'top',
              color: 'success'
            }).then(toast => toast.present());
            this.atualizarConquistas()
          },
          error: (err) => {
            this.toastController.create({
              message: err.error.message,
              header: 'Erro ao atualizar conquista: ' + data.descricao + ' Tente novamente.',
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

  async confirmDeleteConquista(conquista: Conquista) {
    const alert = await this.alertController.create({
        header: 'Confirmar exclusão',
        message: `Tem certeza que deseja esta cnquista?`,
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
                    this.conquistaService.deleteConquista(conquista).subscribe({
                        next: () => {
                          this.toastController.create({
                            message: 'Conquista removida com sucesso!',
                            duration: 2000,
                            position: 'top',
                            color: 'success'
                          }).then(toast => toast.present());
                          this.atualizarConquistas()
                        },
                        error: (err) => {
                        this.toastController.create({
                          message: err.error.message,
                          header: 'Erro ao remover conquista.',
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
        ]
    });
  
    await alert.present();
  }

  atualizarConquistas() {
    this.conquistaService.getConquistas().subscribe({
        next: (conquistas) => this.conquistas = conquistas,
        error: (error) => console.error('Erro ao carregar os conquistas:', error)
    });
  }

}
