import { Location } from '@angular/common';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const featuresGuard: CanActivateFn = (route, state) => {
  const router= inject(Router);
  const location = inject(Location)

  
  const token = localStorage.getItem('token');

  if(token){
    return true;
  }
  else{
    location.back()
    return false;
  }
};
