import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private _fb : FormBuilder = inject(FormBuilder);

  loginForm : FormGroup;


  constructor() {
    this.loginForm = this._fb.group({
      email : [null, [Validators.required, Validators.email]],
      mdp : [null, [Validators.required]]
    })
    
  }

}
