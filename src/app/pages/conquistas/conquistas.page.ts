import { Component, OnInit } from '@angular/core';
import { AlertController, ViewWillEnter } from '@ionic/angular';
import { Conquista } from 'src/app/models/conquista.model';
import { ConquistaService } from 'src/app/services/conquista.service';

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
