import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService} from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private _fb: FormBuilder = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);
  private router : Router = inject(Router);

  loginForm: FormGroup;


  constructor() {
    this.loginForm = this._fb.group({
      email: [null, [Validators.required, Validators.email]],
      mdp: [null, [Validators.required]]
    });

  }

  onSubmit() {
    const { email, mdp } = this.loginForm.value;
    this.authService.login(email, mdp).subscribe({
      next: ({ token, user }) => {
        this.authService.saveAuth(token, user);
        this.redirectAfterLogin(user.role);
      },
      error: err => {
        
      }
    });
  }

  redirectAfterLogin(role: string | null) {
    if (role === 'admin') {
      this.router.navigate(['']);
    } else {
      this.router.navigate(['']);
    }
  }

}
