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
/**
 * This component manages login of the user.
 */
export class LoginComponent implements OnInit {

  /**
   * Form group of the login.
   */
  loginForm!: FormGroup;

  /**
   * Login model.
   */
  private loginData!: Login;

  /**
   * If exist an error in the login.
   */
  errorMessage!: string;

  /**
   * Login component constructor.
   * @param api Authentication API service.
   * @param formBuilder Build the form.
   * @param cookieService Create a cookie if the login was successful.
   * @param router Redirect user a new page.
   * @param data Save the data of the logged user.
   */
  constructor(private readonly api: AuthService, private formBuilder: FormBuilder, private cookieService: CookieService,
    private router: Router, private data: DataService) { }

  ngOnInit(): void {
    //Verify if a user is logged in or not.
    if (this.cookieService.check('token_access')) {
      this.router.navigate(['/home']);
      this.data.authenticated = true;
    } else {
      this.data.authenticated = false;
    }

    //Build a reactive form.
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  /**
   * Log in a user and save their data.
   */
  login(): void {
    this.loginData = this.loginForm.value;
    this.api.apiAuthSignInPost$Json({ body: this.loginData }).subscribe(
      {
        next: res => {
          this.cookieService.set('token_access', res.token!)
          localStorage.setItem('user', JSON.stringify(res.user!));
          this.router.navigate(['/home']);
          this.data.authenticated = true;
          this.data.user = res.user;
        }, error: (error) => {
          if (error.status == 400) {
            this.errorMessage = error.error.message;
          } else {
            this.errorMessage = 'Something went wrong...';
          }
        }
      }
    );
  }
}
