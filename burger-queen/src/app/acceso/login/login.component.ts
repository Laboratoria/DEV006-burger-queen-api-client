import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';
import { UserCredentials } from '../../interfaces/userInterfaces';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthServiceService) {

  }

  get email() {
    return this.formWaiter.get('email') as FormControl;
  }

  get password() {
    return this.formWaiter.get('password') as FormControl;
  }

    formWaiter = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required)
    });

    ingresar(){
      console.log(this.formWaiter.value)
      this.authService.logIn(this.formWaiter.value as UserCredentials).subscribe((res) => console.log(res))
      //como funcionan observables, suscribir
      //agregar url consultar cu=omo acceder 12ad622
    }
}
