import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UpdateFormDTO } from '../../models/updateFormDTO ';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss'
})
export class ProfilComponent implements OnInit {

  isEditing: boolean = false;
  user?: User;
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private _fb: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);


  editForm: FormGroup;

  constructor() {
    this.editForm = this._fb.group({
      prenom: [null, [Validators.maxLength(55)]],
      nom: [null, [Validators.maxLength(55)]],
      newMdp: [null, [Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]],
      confirmNewMdp: [null, [Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]]
    }, { validators: [this.confirmNewMdp()] });
  }

  ngOnInit(): void {
    const user = this.authService.getUser();

    if (!user?.id) {
      return;
    }

    this.loadUser(user.id);
  }

  loadUser(id: number): void {
    this.userService.getById(id).subscribe({
      next: (data) => {
        this.user = data;
        this.initForm();
      },
      error: (err) => {

        console.error('Erreur lors du chargement du profil', err);
      }
    });
  }
  initForm(): void {
    if (!this.user) return;

    this.editForm.patchValue({
      prenom: this.user.prenom,
      nom: this.user.nom,
      newMdp: null,
      confirmNewMdp: null
    });
  }

  enterEditMode(): void {
    this.isEditing = true;
  }

  cancelEditMod(): void {
    this.isEditing = false;
  }

  onSubmit(): void {
    if (this.editForm.invalid) return;
    if (!this.user) return;
    const userId = this.user.id;

    const dto: UpdateFormDTO = {
      prenom: this.editForm.value.prenom,
      nom: this.editForm.value.nom
    };

    const newPassword = this.editForm.value.newMdp;
    const passwordChanged = !!newPassword;

    if (passwordChanged) {
      dto.mdp = newPassword;
    }

    console.log('Payload envoyé au backend :', dto);

    this.userService.update(userId, dto).subscribe({
      next: () => {
        if (passwordChanged) {
          this.authService.logout(); // Vide le localStorage et déconnecte
          this.router.navigate(['login']);
        } else {
          this.isEditing = false;
          this.editForm.reset();
          this.loadUser(userId);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour :', err);
        // Tu peux afficher un message ici si besoin
      }
    });
  }

  confirmNewMdp(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let password: string = control.get('newMdp')?.value;
      let confirmPassword: string = control.get('confirmNewMdp')?.value;

      //S'il y a une valeur dans pwd et dans confirm mais qu'ils ne sont pas égaux
      if (password && confirmPassword && password !== confirmPassword) {
        return { 'checkpassword': true };

      }
      return null;
    };

  }


}
