import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { PriceListComponent } from './price-list/price-list.component';

const routes: Routes = [
  {
    path:'admin',
    component:AdminComponent
  },{
    path:'priceList',
    component:PriceListComponent
  },{
    path:'',
    redirectTo:'priceList',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
