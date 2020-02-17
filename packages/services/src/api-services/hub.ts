import axios from 'axios';
import {IAuthenticationService} from "../authentication/auth.service";
import {ConfigService} from "../config/config.service";
import {User} from "../../../models/src/user.model";
// import {HttpUtils} from "../util/common";

// Base class for all Hub-API based services.
export class AbstractHubService {

  private apiBaseHref: string;

  /**
   * Constructor.
   * @param http
   * @param authService
   */
  constructor(protected authService: IAuthenticationService, protected config: ConfigService) {
      this.apiBaseHref = this.config.hubUrl();
  }

  /**
   * Gets the current user.
   */
  protected user(): User {
      return this.authService.getAuthenticatedUserNow();
  }

  /**
   * Creates a hub API endpoint from the api path and params.
   * @param path
   * @param params
   * 
   */
  public endpoint(path: string, params?: any, queryParams?: any): string {
    // if (params) {
    //   Object.keys(params).forEach(key => {
    //     const value = encodeURIComponent(params[key]);
    //     path = path.replace(":" + key, value);
    //   })
    //   }
    if (params) {
      for (let key in params) {
          let value: string = encodeURIComponent(params[key]);
            path = path.replace(":" + key, value);
        }
    }

      let rval: string = this.apiBaseHref + path;
      if (queryParams) {
          let first: boolean = true;
          for (let key in queryParams) {
              if (queryParams[key]) {
                  let value: string = encodeURIComponent(queryParams[key]);
                  if (first) {
                      rval = rval + "?" + key;
                  } else {
                      rval = rval + "&" + key;
                  }
                  if (value != null && value != undefined) {
                      rval = rval + "=" + value;
                  }
                  first = false;
              }
          }
      }
      return rval;
  }

    /**
     * Creates an editing endpoint from the given relative path and params.
     * @param path
     * @param params
     * 
     */
    // protected editingEndpoint(path: string, params?: any): string {
    //     if (params) {
    //         for (let key in params) {
    //             let value: string = encodeURIComponent(params[key]);
    //             path = path.replace(":" + key, value);
    //         }
    //     }
    //     return this.editingBaseHref + path;
    // }

    /**
     * Creates the request options used by the HTTP service when making
     * API calls.
     * @param headers
     * @param authenticated
     * 
     */
    protected options(headers: {[header: string]: string}, authenticated: boolean = true): any {
        const options = {
            headers: headers
        };
        if (authenticated) {
            this.authService.injectAuthHeaders(options.headers);
        }
        return options;
    }

    /**
     * Converted to React/Axios
     * Performs an HTTP GET operation to the given URL with the given options.  Returns
     * a Promise to the HTTP response data.
     */
    protected httpGet<T>(url: string, options: any, successCallback?: (value: T) => T): Promise<any> {
      options["observe"] = "response"; // not sure what this does?
      
      const request = axios({
        method: 'get',
        url: url,
        data: {
          options: options
        }
      })
      return request
      .then(result => console.log(result))
        // if (successCallback) {
        //   console.log('what is this ?' + response)
        //   return response;
        // }
        // else {
        //   return response;
        // }
      .catch(error => console.log(error)); // handle error state
    }

    // protected httpGet<T>(url: string, options: any, successCallback?: (value: T) => T): Promise<T> {
    //     options["observe"] = "response";
    //     return HttpUtils.mappedPromise(this.http.get<HttpResponse<any>>(url, options).toPromise(), response => {
    //         if (successCallback) {
    //             return successCallback(response.body);
    //         } else {
    //             return response.body;
    //         }
    //     });
    // }

    /**
     * Converted to React/Axios
     * Performs an HTTP POST operation to the given URL with the given body and options.  Returns
     * a Promise to null (no response data expected).
     * 
     */
    // httpPost(url: string, body: I, options: any, successCallback?: () => void) {
    //   options["observe"] = "response";
    //   axios({
    //     method: 'post',
    //     url: url,
    //     data: body,
    //     options: options
    //   })
    //   .then (response => {
    //     if (successCallback) {
    //       successCallback();
    //     }
    //   })
    //   .catch(err => next(err));
    // }
    
    // protected httpPost<I>(url: string, body: I, options: any, successCallback?: () => void): Promise<void> {
    //     options["observe"] = "response";
    //     return HttpUtils.mappedPromise(this.http.post<HttpResponse<any>>(url, body, options).toPromise(), () => {
    //         if (successCallback) {
    //           successCallback();
    //         }
    //         return null;
    //     });
    // }

    /**
     * Performs an HTTP POST operation to the given URL with the given body and options.  Returns
     * a Promise to the HTTP response data.
     * @param url
     * @param body
     * @param options
     * 
     */
    // protected httpPostWithReturn<I, O>(url: string, body: I, options: any, successCallback?: (data: O) => O): Promise<O> {
    //     options["observe"] = "response";
    //     return HttpUtils.mappedPromise(this.http.post<HttpResponse<any>>(url, body, options).toPromise(), response => {
    //         let data: O = response.body;
    //         if (successCallback) {
    //             return successCallback(data);
    //         } else {
    //             return response.body;
    //         }
    //     });
    // }

    /**
     * Performs an HTTP PUT operation to the given URL with the given body and options.  Returns
     * a Promise to null (no response data expected).
     * @param url
     * @param body
     * @param options
     * 
     */
    // protected httpPut<I>(url: string, body: I, options: any, successCallback?: () => void): Promise<void> {
    //     options["observe"] = "response";
    //     return HttpUtils.mappedPromise(this.http.put<HttpResponse<any>>(url, body, options).toPromise(), () => {
    //         if (successCallback) {
    //             successCallback();
    //         }
    //         return null;
    //     });
    // }

    /**
     * Performs an HTTP PUT operation to the given URL with the given body and options.  Returns
     * a Promise to the HTTP response data.
     * @param url
     * @param body
     * @param options
     * 
     */
    // protected httpPutWithReturn<I, O>(url: string, body: I, options: any, successCallback?: (data: O) => O): Promise<O> {
    //     options["observe"] = "response";
    //     return HttpUtils.mappedPromise(this.http.put<HttpResponse<any>>(url, body, options).toPromise(), response => {
    //         let data: O = response.body;
    //         if (successCallback) {
    //             return successCallback(data);
    //         } else {
    //             return response.body;
    //         }
    //     });
    // }

    /**
     * Performs an HTTP DELETE operation to the given URL with the given body and options.
     * @param url
     * @param options
     * 
     */
    // protected httpDelete(url: string, options: any, successCallback?: () => void): Promise<void> {
    //     options["observe"] = "response";
    //     return HttpUtils.mappedPromise(this.http.delete<HttpResponse<any>>(url, options).toPromise(), () => {
    //         if (successCallback) {
    //             successCallback();
    //         }
    //         return null;
    //     });
    // }

}
