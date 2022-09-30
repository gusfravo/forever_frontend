import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, 	HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Connection } from './connection.interface';
import endpointList from './endpoints.json';
import key from './keys.server';
interface ResponseHC {
  code: string,
  object:any,
  message:string,
  transaction:string
};
@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  connectionServiceModel:Connection = {
    session:{
      token:'',
      tokenType:'',
      expiresAt:'',
      roles:[]
    },
    userConnected:false,
    serverURL:'',
    user:{
      id:'',
      username:'',
      fullName:''
    },
    role:{
      id:'',
      name:'',
      description:'',
      status:false
    },
    bundles:[], /*Objectos a los que tiene acceso el usuario*/
    object:{
      id:'', /*Objecto cargado en el sistema*/
      _id:''
    }
  };

  connection:Connection = JSON.parse(JSON.stringify(this.connectionServiceModel));

  constructor(protected http: HttpClient) { }

  /**funcionalidad para realizar login al sistema
  */
  public login(object){
    return new Promise((resolve,reject)=>{
      let parameters = {
        username: object.email,
        password: object.password,
        remember_me: object.remember_me
      };
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      let httpOptions = {
        headers: headers
      };
      this.http.post(key.url + 'login', parameters, httpOptions)
        .subscribe((data:any) => {
          this.saveSession(data.object);
          let headersAux = new HttpHeaders({
            'Authorization': this.connection.session.tokenType + " " + this.connection.session.token,
            'Content-Type': 'application/json'
          });
          let httpOptions2 = {
            headers: headersAux
          };
          this.http.post(key.url + 'access',{id:this.getUser().id}, httpOptions2)
            .subscribe(async(data:any) => {
              await this.saveAccess(data);
              resolve({transaction: 'ok', object: this.getUserAndRole()});
            }, error => {
              console.log("Error:login:001 ", error);
              reject(error);
            });
        }, error => {
          console.log("Error:login:002 ", error);
          reject(error);
        });
    });
  }


  /**función para realizar consultas al backend con cabeceras de Authorization
  * @param code código para consultar al backend
  * @param object objeto a enviar al backEnd
  */
  public sendRequest(code: string, object): Observable<ResponseHC> {
    let path = key.url + this.getEnpoint(code);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.connection.session.tokenType + " " + this.connection.session.token
   });
    const httpOptions = {
      headers: headers
    };
    return Observable.create(observer => {
      this.http.post(path, object, httpOptions)
        .subscribe((response) => {
          let answer:any = response;
          if (answer.transaction === 'ok') {
            observer.next(answer);
            observer.complete();
          } else {
            observer.error(answer);
          }
        }, error => {
          console.log(error);
          observer.error(error);
        });
    });
  }

  /**función para realizar peticiones al backend sin cabeceras de Authorization
  * @param code código para consultar al backend
  * @param object objeto a enviar al backEnd
  */
  public sendRequestAnonimus(code: string, object): Observable<ResponseHC> {
    let path = key.url + this.getEnpoint(code);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
   });
    const httpOptions = {
      headers: headers
    };
    return Observable.create(observer => {
      this.http.post(path, object, httpOptions)
        .subscribe((response) => {
          let answer:any = response;
          if (answer.transaction === 'ok') {
            observer.next(answer);
            observer.complete();
          } else {
            observer.error(answer);
          }
        }, error => {
          console.log(error);
          observer.error(error);
        });
    });
  }

  /**función para realizar consultas al backend con cabeceras de Authorization con file
  * @param code código para consultar al backend
  * @param object objeto a enviar al backEnd
  */
  public sendRequestFile(code: string, object): Observable<ResponseHC> {
    let path = key.url + this.getEnpoint(code);
    let headers = new HttpHeaders({
      'Authorization': this.connection.session.tokenType + " " + this.connection.session.token
   });
    const httpOptions = {
      headers: headers
    };
    return Observable.create(observer => {
      this.http.post(path, object, httpOptions)
        .subscribe((response) => {
          let answer:any = response;
          if (answer.transaction === 'ok') {
            observer.next(answer);
            observer.complete();
          } else {
            observer.error(answer);
          }
        }, error => {
          console.log(error);
          observer.error(error);
        });
    });
  }

  /**funcionalidad para recargar las variables de sesión
  */
  public async reloadAndIsInSession():Promise<Boolean>{
    return new Promise(async(resolve,reject)=>{
      await this.getSessionStorage();
      if(this.connection.session.token != null && this.connection.session.tokenType != null && this.connection.user.id != ''){
        if(this.connection.userConnected){
          resolve(true);
        }else{
          resolve(false);
        }
      }else{
        resolve(false);
      }
    });
  }

  /**
  ============= sección de utilidades ============
  */

  /**funcionalidad para obtener si un usuario esta logueado
  */
  public isConected():boolean{
    return this.connection.userConnected;
  }

  /**funcionalidad para obtener un usuario
  */
  public getUser(){
    return this.connection.user;
  }

  /**funcionalidad para obtener el rol que tiene acceso el usuario
  */
  public getRole(){
    return this.connection.role;
  }

  /**funcionalida para obtener que acceso tengo seleccionado
  */
  public getAccess(){
    return this.connection.object;
  }

  /**funcionalidad para obtener todos lo accesos
  */
  public getAllAccess(){
    return this.connection.bundles;
  }

  /**funcionalidad para guardar que acceso tengo seleccionado
  */
  public setAccess(object){
    this.connection.object = JSON.parse(JSON.stringify(object));
    this.saveSessionOnStorage();
    return true;
  }


  /**funcionalida para obtener el usuario y rol
  */
  public getUserAndRole(){
    return {
      user:this.connection.user,
      role:this.connection.role
    };
  }

  /**funcionalidad para cargar las variables de sesión
  */
  private async saveSession(object){
    this.connection.userConnected = true;
    this.connection.session.tokenType = object.user.tokenType;
    this.connection.session.token = object.user.token;
    this.connection.session.expiresAt = object.user.expiration;
    this.connection.session.roles = object.roles;
    this.connection.user = object.user;
    if(object.roles.length > 0)
      this.connection.role = JSON.parse(JSON.stringify(object.roles[0]))
    await this.saveSessionOnStorage();
  }

  /**función para guardar el acceso del usuario
  */
  private async saveAccess(object){
    this.connection.bundles = object.object.bundles;
    await this.saveSessionOnStorage();
  }

  /**funcionalidad para guardar las variables de sesión
  */
  private saveSessionOnStorage(){
    return new Promise((resolve)=>{
      sessionStorage.setItem('tokenType', this.connection.session.tokenType);
      sessionStorage.setItem('token', this.connection.session.token);
      sessionStorage.setItem('expiresAt', this.connection.session.expiresAt);
      sessionStorage.setItem('roles', JSON.stringify(this.connection.session.roles));
      sessionStorage.setItem('object', JSON.stringify(this.connection.object));
      sessionStorage.setItem('role', JSON.stringify(this.connection.role));
      sessionStorage.setItem('id', this.connection.user.id);
      sessionStorage.setItem('fullName', this.connection.user.fullName);
      sessionStorage.setItem('username', this.connection.user.username);
      sessionStorage.setItem('userConnected', JSON.stringify(this.connection.userConnected));
      sessionStorage.setItem('bundles', JSON.stringify(this.connection.bundles));
      resolve(true)
    })
  }

  /**funcionalida para recargar las variables de sesión
  */
  private getSessionStorage(){
    return new Promise((resolve)=>{
      this.connection.session.tokenType = sessionStorage.getItem('tokenType');
      this.connection.session.token = sessionStorage.getItem('token');
      this.connection.session.expiresAt = sessionStorage.getItem('expiresAt');
      this.connection.session.roles = JSON.parse(sessionStorage.getItem('roles'));
      this.connection.object = JSON.parse(sessionStorage.getItem('object'));
      this.connection.user.id = sessionStorage.getItem('id');
      this.connection.user.fullName = sessionStorage.getItem('fullName');
      this.connection.user.username = sessionStorage.getItem('username');
      this.connection.userConnected = JSON.parse(sessionStorage.getItem('userConnected'));
      this.connection.bundles = JSON.parse(sessionStorage.getItem('bundles'));
      this.connection.role = JSON.parse(sessionStorage.getItem('role'));
      resolve(true);
    })
  }

  /**funcionalida para resetar una session
  */
  private resetSession(){
    this.connection = JSON.parse(JSON.stringify(this.connectionServiceModel));
    sessionStorage.clear();
  }

  /**
   * Función para obtener el recurso del listado de enpoints para consulta al backend
   */
  getEnpoint(code: string) {
    //buscamos el code en el compendio de urls
    let resourse = endpointList.find(x => x.code == code);
    //variable que contendra el path a llamar por el http metodo get
    if (resourse === undefined) {
      console.log('Error: La url que desea accesar no esta definida');
    } else {
      return resourse.endpoint;
    }
  }

}
