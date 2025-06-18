import { Component, inject, output, OutputEmitterRef } from '@angular/core';
import { RecaptchaModule } from "ng-recaptcha-19";
import { CaptchaserviceService } from '../../../core/services/captchaservice.service';

@Component({
  selector: 'app-captcha',
  imports: [RecaptchaModule],
  templateUrl: './captcha.component.html',
  styleUrl: './captcha.component.scss'
})
export class CaptchaComponent {
  private readonly _captchaService : CaptchaserviceService = inject(CaptchaserviceService);

  onSuccess: OutputEmitterRef<void> = output();
  siteKey: string = this._captchaService.PUBLIC_KEY;

  onResolved(response: string | null) : void {
    console.log(response);

    if (!response) {
      console.error("Captcha échouer");
      return;            
    }

    this._captchaService.verifyCaptcha(response).subscribe({
      next: () => {
        this.onSuccess.emit();
      },
      error: () => {
        // gérer les erreurs
      }
    })
    
    
  }

}
