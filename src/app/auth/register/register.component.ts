import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RegisterFormDTO } from '../../models/RegisterFormDTO';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  private _fb: FormBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private routeur = inject(Router);
  isSubmitting = false;
  errorMessage: string | null = null;

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

    }, { validators: [this.confirmMdp()] });

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

  onSubmit(): void {
    if (this.registerForm.invalid) return;

    this.isSubmitting = true;
    this.errorMessage = null;

    
    const dto: RegisterFormDTO = {
      prenom: this.registerForm.value.prenom,
      nom: this.registerForm.value.nom,
      email: this.registerForm.value.email,
      mdp: this.registerForm.value.mdp,
      role: this.registerForm.value.role
    };

    this.authService.register(dto).subscribe({
      next: () => {
        
        this.isSubmitting = false;
        this.registerForm.reset();
        this.errorMessage = null; 

        
        window.alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
        this.routeur.navigate(['login']);
      },
      error: (err) => {
        
        this.isSubmitting = false;
        console.error('Erreur d’inscription :', err);
       
        this.errorMessage = err.error?.message || 'Une erreur est survenue pendant l’inscription.';
      }
    });
  }

}
