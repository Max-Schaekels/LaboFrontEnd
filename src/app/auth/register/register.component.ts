import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  private _fb: FormBuilder = inject(FormBuilder);

  registerForm: FormGroup;


  constructor() {
    this.registerForm = this._fb.group({
      prenom: [null, [Validators.required, Validators.maxLength(55)]],
      nom: [null, [Validators.required, Validators.maxLength(55)]],
      email: [null, [Validators.required, Validators.email]],
      mdp: [null, [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]],
      confirm: [null, [Validators.required]],
      role: ['client'],
      conditions: [false, Validators.requiredTrue]

    }, { validators : [this.confirmMdp()]});

  }

  confirmMdp(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let password: string = control.get('mdp')?.value;
      let confirmPassword: string = control.get('confirm')?.value;

      //S'il y a une valeur dans pwd et dans confirm mais qu'ils ne sont pas égaux
      if (password && confirmPassword && password !== confirmPassword) {
        return { 'checkpassword': true };

      }
      return null;
    };

  }

}
