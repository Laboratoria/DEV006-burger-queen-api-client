import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  // constructor(private fb: FormBuilder) {

  // }

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
    }

}
