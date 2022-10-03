import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { catchError } from 'rxjs';
import { DataService } from 'src/app/api/data.service';
import { Login, User } from 'src/app/api/models';
import { AuthService } from 'src/app/api/services';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  private loginData!:Login;
  errorMessage!:string;

  constructor(private readonly api:AuthService, private formBuilder: FormBuilder, private cookieService:CookieService,
    private router:Router, private data:DataService) { }

  ngOnInit(): void {
    if(this.cookieService.check('token_access')){
      this.router.navigate(['/home']);
      this.data.authenticated = true;
    }else{
      this.data.authenticated = false;
    }
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    
  }

  /**
   * Log in a user and save their data.
   */
  login():void{
    this.loginData = this.loginForm.value;
    this.api.apiAuthSignInPost$Json({body:this.loginData}).subscribe(
      res => {
        this.cookieService.set('token_access', res.token!)
        localStorage.setItem('user', JSON.stringify(res.user!));
        this.router.navigate(['/home']);
        this.data.authenticated = true;
        this.data.user = res.user;
      },(error) => {
        console.log(error.error.message)
        this.errorMessage = error.error.message;
      }
    );
  }
}
