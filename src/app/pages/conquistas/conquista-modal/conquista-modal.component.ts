import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-conquista-modal',
  templateUrl: './conquista-modal.component.html',
  styleUrls: ['./conquista-modal.component.scss'],
})
export class ConquistaModalComponent  implements OnInit {

  conquistaForm: FormGroup = this.fb.group({});
  
  constructor(private fb: FormBuilder) { }

  ngOnInit() {}

}
