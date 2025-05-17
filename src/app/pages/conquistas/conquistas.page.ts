import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ViewWillEnter } from '@ionic/angular';
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
    private modalController: ModalController
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
                        next: () => this.atualizarConquistas(),
                        error: (err) => console.error('Erro ao excluir conquista:', err)
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
