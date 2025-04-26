import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-habitos',
  templateUrl: './habitos.page.html',
  styleUrls: ['./habitos.page.scss'],
  standalone: false
})
export class HabitosPage implements OnInit {

  constructor(private router: Router) { }

  navegar(event: any) {
    const valor = event.detail.value;
    this.router.navigate(['/' + valor]);
  }

  ngOnInit() {
  }

}
