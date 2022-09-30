import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { ConnectionService } from './connection.service';

@Injectable({
  providedIn: 'root'
})
export class ProtectionPermissions {

  constructor(private connectionService: ConnectionService, private router: Router) {
    this.connectionService.reloadAndIsInSession().then((data)=>{
      if(!data)
        this.router.navigate(['/']);
    }).catch(e=>{
      this.router.navigate(['/']);
    })
  }

  canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot){
    let allowAccess:Array<string> = next.data.access;
    let roleSelected = this.connectionService.getRole();
    let access = false;
    //verificamos si el rol que tiene el usuario tiene acceso concedido
    const granted = allowAccess.filter((role)=>{
      return role == roleSelected.name || role == 'ANONYMOUS';
    });
    // si existe almenos un acceso concedido activamos el acceso
    if(granted.length > 0)
      access = true;
    //si no tenemos acceso retornamos la aplicación al inicio
    if(!access)
      this.router.navigate(['/']);
    return access;
  }
}
