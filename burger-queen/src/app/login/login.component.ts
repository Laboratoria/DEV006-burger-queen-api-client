import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../services/auth-service.service';
import { UserCredentials } from '../interfaces/userInterfaces';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private authService: AuthServiceService, private router: Router) {

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

    ngOnInit(): void {
      this.checkLocalStorage();
    }

    checkLocalStorage(){
      if(localStorage.getItem('token')){
        this.router.navigate(['waiter']);
      }
    }

    ingresar(){
      console.log(this.formWaiter.value);

      if (this.formWaiter.valid){
    
      this.authService.logIn(this.formWaiter.value as UserCredentials).subscribe((res) => {
        console.log(res)
        localStorage.setItem('token', res.accessToken)
        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesion exitoso',
          text:'¡Bienvenido!',
          confirmButtonText:'Aceptar'
        });
        this.router.navigate(['./waiter']);
      },
      (error) => {
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: error['status'],
          text: 'Usuario o contraseña incorrectos',
          confirmButtonText:'Aceptar'
        })
      })
      
      //como funcionan observables, suscribir
      //agregar url consultar cuomo acceder
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'No se ha logrado ingresar',
          text: 'Por favor, completa todos los campos correctamente',
          confirmButtonText:'Aceptar'
        })
      }
    }
}
