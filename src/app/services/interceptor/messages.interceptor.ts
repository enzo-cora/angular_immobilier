import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import { ToastrService } from 'ngx-toastr';
import {Injectable} from "@angular/core";

@Injectable ()
export class MessagesInterceptor implements HttpInterceptor{

  constructor(public toasterService : ToastrService) {
  }

  intercept(req: HttpRequest <any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(res => {
        if (res instanceof HttpResponse) {
          if(res.body && res.body.success)
            this.toasterService.success(res.body.success.message, res.body.success.title, { positionClass: 'toast-top-right' });
        }
      }),
      catchError((resErr: any) => {
        if(resErr instanceof HttpErrorResponse) {
          try {
            this.toasterService.error(resErr.error.message, resErr.error.title, { positionClass: 'toast-top-right' });
          } catch(e) {
            this.toasterService.error('An error occurred', '', { positionClass: 'toast-top-right' });
          }
        }
        return of(resErr);
      }));
  }
}

export const MessagesInterceptorProvider = {
  provide : HTTP_INTERCEPTORS,
  useClass : MessagesInterceptor,
  multi : true
}
