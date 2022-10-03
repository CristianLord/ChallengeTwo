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

import { Subscription } from '../models/subscription';
import { UserViewModel } from '../models/user-view-model';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation apiSubscriptionsGet
   */
  static readonly ApiSubscriptionsGetPath = '/api/Subscriptions';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiSubscriptionsGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiSubscriptionsGet$Plain$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<Subscription>>> {

    const rb = new RequestBuilder(this.rootUrl, SubscriptionsService.ApiSubscriptionsGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Subscription>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiSubscriptionsGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiSubscriptionsGet$Plain(params?: {
    context?: HttpContext
  }
): Observable<Array<Subscription>> {

    return this.apiSubscriptionsGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Subscription>>) => r.body as Array<Subscription>)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiSubscriptionsGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiSubscriptionsGet$Json$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<Subscription>>> {

    const rb = new RequestBuilder(this.rootUrl, SubscriptionsService.ApiSubscriptionsGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Subscription>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiSubscriptionsGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiSubscriptionsGet$Json(params?: {
    context?: HttpContext
  }
): Observable<Array<Subscription>> {

    return this.apiSubscriptionsGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Subscription>>) => r.body as Array<Subscription>)
    );
  }

  /**
   * Path part for operation apiSubscriptionsPost
   */
  static readonly ApiSubscriptionsPostPath = '/api/Subscriptions';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiSubscriptionsPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiSubscriptionsPost$Plain$Response(params?: {
    context?: HttpContext
    body?: Subscription
  }
): Observable<StrictHttpResponse<Subscription>> {

    const rb = new RequestBuilder(this.rootUrl, SubscriptionsService.ApiSubscriptionsPostPath, 'post');
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
        return r as StrictHttpResponse<Subscription>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiSubscriptionsPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiSubscriptionsPost$Plain(params?: {
    context?: HttpContext
    body?: Subscription
  }
): Observable<Subscription> {

    return this.apiSubscriptionsPost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<Subscription>) => r.body as Subscription)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiSubscriptionsPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiSubscriptionsPost$Json$Response(params?: {
    context?: HttpContext
    body?: Subscription
  }
): Observable<StrictHttpResponse<Subscription>> {

    const rb = new RequestBuilder(this.rootUrl, SubscriptionsService.ApiSubscriptionsPostPath, 'post');
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
        return r as StrictHttpResponse<Subscription>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiSubscriptionsPost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiSubscriptionsPost$Json(params?: {
    context?: HttpContext
    body?: Subscription
  }
): Observable<Subscription> {

    return this.apiSubscriptionsPost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<Subscription>) => r.body as Subscription)
    );
  }

  /**
   * Path part for operation apiSubscriptionsGetSubscriptionsUserIdUserGet
   */
  static readonly ApiSubscriptionsGetSubscriptionsUserIdUserGetPath = '/api/Subscriptions/GetSubscriptionsUser/{idUser}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiSubscriptionsGetSubscriptionsUserIdUserGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiSubscriptionsGetSubscriptionsUserIdUserGet$Plain$Response(params: {
    idUser: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<UserViewModel>>> {

    const rb = new RequestBuilder(this.rootUrl, SubscriptionsService.ApiSubscriptionsGetSubscriptionsUserIdUserGetPath, 'get');
    if (params) {
      rb.path('idUser', params.idUser, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<UserViewModel>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiSubscriptionsGetSubscriptionsUserIdUserGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiSubscriptionsGetSubscriptionsUserIdUserGet$Plain(params: {
    idUser: number;
    context?: HttpContext
  }
): Observable<Array<UserViewModel>> {

    return this.apiSubscriptionsGetSubscriptionsUserIdUserGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<Array<UserViewModel>>) => r.body as Array<UserViewModel>)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiSubscriptionsGetSubscriptionsUserIdUserGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiSubscriptionsGetSubscriptionsUserIdUserGet$Json$Response(params: {
    idUser: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<UserViewModel>>> {

    const rb = new RequestBuilder(this.rootUrl, SubscriptionsService.ApiSubscriptionsGetSubscriptionsUserIdUserGetPath, 'get');
    if (params) {
      rb.path('idUser', params.idUser, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<UserViewModel>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiSubscriptionsGetSubscriptionsUserIdUserGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiSubscriptionsGetSubscriptionsUserIdUserGet$Json(params: {
    idUser: number;
    context?: HttpContext
  }
): Observable<Array<UserViewModel>> {

    return this.apiSubscriptionsGetSubscriptionsUserIdUserGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<Array<UserViewModel>>) => r.body as Array<UserViewModel>)
    );
  }

  /**
   * Path part for operation apiSubscriptionsIdUserIdSubscribedDelete
   */
  static readonly ApiSubscriptionsIdUserIdSubscribedDeletePath = '/api/Subscriptions/{idUser}/{idSubscribed}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiSubscriptionsIdUserIdSubscribedDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiSubscriptionsIdUserIdSubscribedDelete$Response(params: {
    idUser: number;
    idSubscribed: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, SubscriptionsService.ApiSubscriptionsIdUserIdSubscribedDeletePath, 'delete');
    if (params) {
      rb.path('idUser', params.idUser, {});
      rb.path('idSubscribed', params.idSubscribed, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiSubscriptionsIdUserIdSubscribedDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiSubscriptionsIdUserIdSubscribedDelete(params: {
    idUser: number;
    idSubscribed: number;
    context?: HttpContext
  }
): Observable<void> {

    return this.apiSubscriptionsIdUserIdSubscribedDelete$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
