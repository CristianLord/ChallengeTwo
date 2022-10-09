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

import { Journal } from '../models/journal';

@Injectable({
  providedIn: 'root',
})
export class JournalsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation apiJournalsGet
   */
  static readonly ApiJournalsGetPath = '/api/Journals';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiJournalsGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiJournalsGet$Plain$Response(params?: {
    context?: HttpContext
  }
  ): Observable<StrictHttpResponse<Array<Journal>>> {

    const rb = new RequestBuilder(this.rootUrl, JournalsService.ApiJournalsGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Journal>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiJournalsGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiJournalsGet$Plain(params?: {
    context?: HttpContext
  }
  ): Observable<Array<Journal>> {

    return this.apiJournalsGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Journal>>) => r.body as Array<Journal>)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiJournalsGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiJournalsGet$Json$Response(params?: {
    context?: HttpContext
  }
  ): Observable<StrictHttpResponse<Array<Journal>>> {

    const rb = new RequestBuilder(this.rootUrl, JournalsService.ApiJournalsGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Journal>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiJournalsGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiJournalsGet$Json(params?: {
    context?: HttpContext
  }
  ): Observable<Array<Journal>> {

    return this.apiJournalsGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Journal>>) => r.body as Array<Journal>)
    );
  }

  /**
   * Path part for operation apiJournalsPost
   */
  static readonly ApiJournalsPostPath = '/api/Journals';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiJournalsPost$Plain()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  apiJournalsPost$Plain$Response(params?: {
    context?: HttpContext
    body?: {
      'Title'?: string;
      'IdUser'?: number;
      'File'?: Blob;
    }
  }
  ): Observable<StrictHttpResponse<Journal>> {

    const rb = new RequestBuilder(this.rootUrl, JournalsService.ApiJournalsPostPath, 'post');
    if (params) {
      rb.body(params.body, 'multipart/form-data');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Journal>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiJournalsPost$Plain$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  apiJournalsPost$Plain(params?: {
    context?: HttpContext
    body?: {
      'Title'?: string;
      'IdUser'?: number;
      'File'?: Blob;
    }
  }
  ): Observable<Journal> {

    return this.apiJournalsPost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<Journal>) => r.body as Journal)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiJournalsPost$Json()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  apiJournalsPost$Json$Response(params?: {
    context?: HttpContext
    body?: {
      'Title'?: string;
      'IdUser'?: number;
      'File'?: Blob;
    }
  }
  ): Observable<StrictHttpResponse<Journal>> {

    const rb = new RequestBuilder(this.rootUrl, JournalsService.ApiJournalsPostPath, 'post');
    if (params) {
      rb.body(params.body, 'multipart/form-data');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Journal>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiJournalsPost$Json$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  apiJournalsPost$Json(params?: {
    context?: HttpContext
    body?: {
      'Title'?: string;
      'IdUser'?: number;
      'File'?: Blob;
    }
  }
  ): Observable<Journal> {

    return this.apiJournalsPost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<Journal>) => r.body as Journal)
    );
  }

  /**
   * Path part for operation apiJournalsJournalIdGet
   */
  static readonly ApiJournalsJournalIdGetPath = '/api/Journals/Journal/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiJournalsJournalIdGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiJournalsJournalIdGet$Plain$Response(params: {
    id: number;
    context?: HttpContext
  }
  ): Observable<StrictHttpResponse<Journal>> {

    const rb = new RequestBuilder(this.rootUrl, JournalsService.ApiJournalsJournalIdGetPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Journal>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiJournalsJournalIdGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiJournalsJournalIdGet$Plain(params: {
    id: number;
    context?: HttpContext
  }
  ): Observable<Journal> {

    return this.apiJournalsJournalIdGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<Journal>) => r.body as Journal)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiJournalsJournalIdGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiJournalsJournalIdGet$Json$Response(params: {
    id: number;
    context?: HttpContext
  }
  ): Observable<StrictHttpResponse<Journal>> {

    const rb = new RequestBuilder(this.rootUrl, JournalsService.ApiJournalsJournalIdGetPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Journal>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiJournalsJournalIdGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiJournalsJournalIdGet$Json(params: {
    id: number;
    context?: HttpContext
  }
  ): Observable<Journal> {

    return this.apiJournalsJournalIdGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<Journal>) => r.body as Journal)
    );
  }

  /**
   * Path part for operation apiJournalsUserJournalsIdGet
   */
  static readonly ApiJournalsUserJournalsIdGetPath = '/api/Journals/UserJournals/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiJournalsUserJournalsIdGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiJournalsUserJournalsIdGet$Plain$Response(params: {
    id: number;
    context?: HttpContext
  }
  ): Observable<StrictHttpResponse<Array<Journal>>> {

    const rb = new RequestBuilder(this.rootUrl, JournalsService.ApiJournalsUserJournalsIdGetPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Journal>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiJournalsUserJournalsIdGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiJournalsUserJournalsIdGet$Plain(params: {
    id: number;
    context?: HttpContext
  }
  ): Observable<Array<Journal>> {

    return this.apiJournalsUserJournalsIdGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Journal>>) => r.body as Array<Journal>)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiJournalsUserJournalsIdGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiJournalsUserJournalsIdGet$Json$Response(params: {
    id: number;
    context?: HttpContext
  }
  ): Observable<StrictHttpResponse<Array<Journal>>> {

    const rb = new RequestBuilder(this.rootUrl, JournalsService.ApiJournalsUserJournalsIdGetPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Journal>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiJournalsUserJournalsIdGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiJournalsUserJournalsIdGet$Json(params: {
    id: number;
    context?: HttpContext
  }
  ): Observable<Array<Journal>> {

    return this.apiJournalsUserJournalsIdGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Journal>>) => r.body as Array<Journal>)
    );
  }

  /**
   * Path part for operation apiJournalsSubscriptionsJournalsIdGet
   */
  static readonly ApiJournalsSubscriptionsJournalsIdGetPath = '/api/Journals/SubscriptionsJournals/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiJournalsSubscriptionsJournalsIdGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiJournalsSubscriptionsJournalsIdGet$Plain$Response(params: {
    id: number;
    context?: HttpContext
  }
  ): Observable<StrictHttpResponse<Array<Journal>>> {

    const rb = new RequestBuilder(this.rootUrl, JournalsService.ApiJournalsSubscriptionsJournalsIdGetPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Journal>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiJournalsSubscriptionsJournalsIdGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiJournalsSubscriptionsJournalsIdGet$Plain(params: {
    id: number;
    context?: HttpContext
  }
  ): Observable<Array<Journal>> {

    return this.apiJournalsSubscriptionsJournalsIdGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Journal>>) => r.body as Array<Journal>)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiJournalsSubscriptionsJournalsIdGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiJournalsSubscriptionsJournalsIdGet$Json$Response(params: {
    id: number;
    context?: HttpContext
  }
  ): Observable<StrictHttpResponse<Array<Journal>>> {

    const rb = new RequestBuilder(this.rootUrl, JournalsService.ApiJournalsSubscriptionsJournalsIdGetPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Journal>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiJournalsSubscriptionsJournalsIdGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiJournalsSubscriptionsJournalsIdGet$Json(params: {
    id: number;
    context?: HttpContext
  }
  ): Observable<Array<Journal>> {

    return this.apiJournalsSubscriptionsJournalsIdGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Journal>>) => r.body as Array<Journal>)
    );
  }

  /**
   * Path part for operation apiJournalsIdPut
   */
  static readonly ApiJournalsIdPutPath = '/api/Journals/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiJournalsIdPut()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  apiJournalsIdPut$Response(params: {
    id: number;
    context?: HttpContext
    body?: {
      'Title'?: string;
      'IdUser'?: number;
      'File'?: Blob;
    }
  }
  ): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, JournalsService.ApiJournalsIdPutPath, 'put');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'multipart/form-data');
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
   * To access the full response (for headers, for example), `apiJournalsIdPut$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  apiJournalsIdPut(params: {
    id: number;
    context?: HttpContext
    body?: {
      'Title'?: string;
      'IdUser'?: number;
      'File'?: Blob;
    }
  }
  ): Observable<void> {

    return this.apiJournalsIdPut$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation apiJournalsIdDelete
   */
  static readonly ApiJournalsIdDeletePath = '/api/Journals/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiJournalsIdDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiJournalsIdDelete$Response(params: {
    id: number;
    context?: HttpContext
  }
  ): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, JournalsService.ApiJournalsIdDeletePath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `apiJournalsIdDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiJournalsIdDelete(params: {
    id: number;
    context?: HttpContext
  }
  ): Observable<void> {

    return this.apiJournalsIdDelete$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
