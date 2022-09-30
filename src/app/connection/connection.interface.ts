export interface Connection {
  session:{
    token:string,
    tokenType:string,
    expiresAt:string,
    roles:string[]
  },
  userConnected:boolean,
  serverURL:string,
  user:{
    id:string,
    username:string,
    fullName:string
  },
  role:{
    id:string,
    name:string,
    description:string,
    status:boolean
  },
  bundles:{id:string}[], /*Objectos a los que tiene acceso el usuario*/
  object:{
    id:string, /*Objecto cargado en el sistema*/
    _id:string
  }
}
