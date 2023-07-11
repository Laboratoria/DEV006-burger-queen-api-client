import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private http: HttpClient) {

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
      // console.log(this.formWaiter.value)
      const url = 'https://app.swaggerhub.com/apis-docs/ssinuco/BurgerQueenAPI/2.0.0#/auth/getToken';
      const body = this.formWaiter.value;

      this.http.post(url, body).subscribe(
        (response : any) => {
          const accessToken = response.accessToken;
          console.log('Token de acceso:', accessToken);
        },
        (error) => {
          console.log('Error de autenticacion:', error);
        }
      );
    }

}
