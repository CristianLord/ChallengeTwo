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

/**
 * This component manages the application register.
 */
export class RegisterComponent implements OnInit {

  /**
   * Register form group.
   */
  registerForm!: FormGroup;

  /**
   * Register model.
   */
  private registerData!: Register;

  /**
   * Error message if there's an error in the registry.
   */
  errorMessage!: string;

  /**
   * Register component contructor.
   * @param api Auhtentication API service.
   * @param formBuilder Build the form.
   * @param cookieService Create a cookie if the registry was successful.
   * @param router Redirect user a new page.
   * @param data Save the data of the registered user.
   */
  constructor(
    private readonly api: AuthService,
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    private router: Router,
    private data: DataService) { }

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
  register() {
    this.registerData = this.registerForm.value;
    this.api.apiAuthSignUpPost$Json({ body: this.registerData }).subscribe({
      next: res => {
        this.cookieService.set('token_access', res.token!)
        localStorage.setItem('user', JSON.stringify(res.user!));
        this.router.navigate(['/home']);
        this.data.authenticated = true;
        this.data.user = res.user;
      },
      error: (error) => {
        console.log(error)
        this.errorMessage = error.error.message;
      }
    });
  }

}

