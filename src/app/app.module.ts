import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ConnectionModule } from '@connection/connection.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AdminComponent } from './admin/admin.component';
import { PriceListComponent } from './price-list/price-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    PriceListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ConnectionModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
