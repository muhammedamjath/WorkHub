import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../auth/authService.service';

export const TokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  let token = localStorage.getItem('token')
  let authRequest = req;

  if(token) {
    authRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(authRequest).pipe(
    catchError(error => {
      if (error.status === 401) {
        const refreshToken = localStorage.getItem('refreshToken');

        if (refreshToken) {
          const refreshData = {
            token: token,
            clientId: 'ERPWebApp',
            refreshToken: refreshToken
          };

          return authService.CheckRefreshToken(refreshData).pipe(
            switchMap((response: any) => {
              localStorage.setItem('token', response.data.token);
              localStorage.setItem('refreshToken', response.data.refreshToken);

              const newRequest = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${response.data.token}`
                }
              });

              return next(newRequest);
            }),
            catchError(refreshError => {
              authService.logout();
              return throwError(refreshError);
            })
          );
        } else {
          authService.logout();
        }
      }
      
      return throwError(error);
    })
  );
};
