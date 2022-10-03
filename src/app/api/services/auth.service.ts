/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { Login } from '../models/login';
import { Register } from '../models/register';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root',
})

export class AuthService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation apiAuthSignInPost
   */
  static readonly ApiAuthSignInPostPath = '/api/Auth/SignIn';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAuthSignInPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiAuthSignInPost$Plain$Response(params?: {
    context?: HttpContext
    body?: Login
  }
): Observable<StrictHttpResponse<Response>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.ApiAuthSignInPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Response>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiAuthSignInPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiAuthSignInPost$Plain(params?: {
    context?: HttpContext
    body?: Login
  }
): Observable<Response> {

    return this.apiAuthSignInPost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<Response>) => r.body as Response)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAuthSignInPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiAuthSignInPost$Json$Response(params?: {
    context?: HttpContext
    body?: Login
  }
): Observable<StrictHttpResponse<Response>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.ApiAuthSignInPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Response>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiAuthSignInPost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiAuthSignInPost$Json(params?: {
    context?: HttpContext
    body?: Login
  }
): Observable<Response> {

    return this.apiAuthSignInPost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<Response>) => r.body as Response)
    );
  }

  /**
   * Path part for operation apiAuthSignUpPost
   */
  static readonly ApiAuthSignUpPostPath = '/api/Auth/SignUp';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAuthSignUpPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiAuthSignUpPost$Plain$Response(params?: {
    context?: HttpContext
    body?: Register
  }
): Observable<StrictHttpResponse<Response>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.ApiAuthSignUpPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Response>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiAuthSignUpPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiAuthSignUpPost$Plain(params?: {
    context?: HttpContext
    body?: Register
  }
): Observable<Response> {

    return this.apiAuthSignUpPost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<Response>) => r.body as Response)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAuthSignUpPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiAuthSignUpPost$Json$Response(params?: {
    context?: HttpContext
    body?: Register
  }
): Observable<StrictHttpResponse<Response>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.ApiAuthSignUpPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Response>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiAuthSignUpPost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiAuthSignUpPost$Json(params?: {
    context?: HttpContext
    body?: Register
  }
): Observable<Response> {

    return this.apiAuthSignUpPost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<Response>) => r.body as Response)
    );
  }

}
