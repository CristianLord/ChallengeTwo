import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from 'src/app/api/data.service';
import { Register } from 'src/app/api/models';
import { AuthService } from 'src/app/api/services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  private registerData!:Register;
  errorMessage!:string;

  constructor(private readonly api:AuthService, private formBuilder: FormBuilder, private cookieService:CookieService,
    private router:Router, private data:DataService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  /**
   * Register a user and save their data.
   */
  register(){
    this.registerData = this.registerForm.value;
    this.api.apiAuthSignUpPost$Json({body:this.registerData}).subscribe(
      res => {
        this.cookieService.set('token_access', res.token!)
        localStorage.setItem('user', JSON.stringify(res.user!));
        this.router.navigate(['/home']);
        this.data.authenticated = true;
        this.data.user = res.user;
      },(error) => {
        console.log(error)
        this.errorMessage = error.error.message;
      }
    );
  }

}

