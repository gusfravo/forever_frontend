import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ConnectionService } from './connection.service';
import { ProtectionPermissions } from './protection.permissions';
export * from './connection.service';
export * from './protection.permissions';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers:[
    ConnectionService,
    ProtectionPermissions
   ]
})
export class ConnectionModule {
  public static forRoot(): ModuleWithProviders< ConnectionModule > {
    return {
      ngModule: ConnectionModule,
    };
  }
}
