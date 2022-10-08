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

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminProductUpdateComponent } from './admin/admin-product-update/admin-product-update.component';
import { AdminLevelProductComponent } from './admin/admin-product-update/admin-level-product/admin-level-product.component';
import { PriceListViewComponent } from './price-list/price-list-view/price-list-view.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    PriceListComponent,
    AdminProductUpdateComponent,
    AdminLevelProductComponent,
    PriceListViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatRadioModule,
    ConnectionModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  entryComponents:[
    AdminProductUpdateComponent,
    AdminLevelProductComponent,
    PriceListViewComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
