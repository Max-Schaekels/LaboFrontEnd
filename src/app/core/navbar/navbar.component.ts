import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnDestroy {
  isConnected : boolean = false;
  isAdmin : boolean = false;

  private subscriptions : Subscription[] = [];

  constructor(private authService : AuthService){}

  ngOnInit(): void {
    this.authService.initAuthState();
    this.subscriptions.push(
      this.authService.isConnected$.subscribe(status => {
        this.isConnected = status;
      }),
      this.authService.isAdmin$.subscribe(status =>{
        this.isAdmin = status;
      })
    );
  }

  logout() : void {
    this.authService.logout();
    
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
