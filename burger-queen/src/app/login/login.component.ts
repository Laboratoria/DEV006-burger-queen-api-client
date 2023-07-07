import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  mesero = {
    email: '',
    password: ''
  }

  ingresar() {
    console.log(this.mesero);
  }
}
