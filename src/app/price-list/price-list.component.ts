import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '@connection/connection.service';
import { RequestObject } from '@connection/utils.interface';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from "rxjs";
import { debounceTime, switchMap } from 'rxjs/operators';
import { PriceListViewComponent } from './price-list-view/price-list-view.component';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.css']
})
export class PriceListComponent implements OnInit {
  productMin = {
    max:10,
    page:0,
    filter:{
      value:''
    }
  }
  list = [];
  productSelected = [];
  metadata = {
    searchBoxInput:new Subject<string>(),
    level:{
      _id:''
    },
    sale:{
      total:0
    }
  }
  levelMin = {
    max:10,
    page:0,
    filter:{
      value:''
    }
  };

  levelList = [];

    constructor(private connection:ConnectionService, private dialog:MatDialog) {
      this.metadata.searchBoxInput.pipe(debounceTime(700),
      switchMap(val => {
        if(val != ''){
          this.list = [];
        }else{
          this.list = [];
          this.productMin.filter.value = '';
          val = 'false'
        }
        this.getList();
        return val;
      })
      ).subscribe(()=>{});
     }

    ngOnInit(): void {
      this.getLevels();
    }

    /**funcionalidad para obtener el listado de productos
    */
    getList(){
      this.connection.sendRequestAnonimus("product:searching",this.productMin).subscribe((data: RequestObject)=>{
        this.list = data.object.instanceList;
      },error=>{
        console.log(error);
      })
    }

    addProduct(object){
      console.log(object);
      console.log(this.metadata);
      object.prices = object.prices.map((item)=>{
        if(this.metadata.level._id == item.level._id){
            item.selected = true;
            object.price = item.price;
            console.log(item);
        }
        return item;
      });
      object.quantity = 1;
      this.productSelected.push(object);
      this.calculateTotal();
    }

    /**funcionalidad para cacular el total de la venta
    */
    calculateTotal(){
      this.metadata.sale.total = 0;
      this.productSelected =  this.productSelected.map((item)=>{
        item.subtotal = item.quantity * item.price;
        this.metadata.sale.total = this.metadata.sale.total + item.subtotal;
        return item;
      });
    }

    /**funcionalidad para buscar un municipios
    */
    search(){
      this.metadata.searchBoxInput.next(this.productMin.filter.value);
    }

    delete(object){
      this.productSelected = this.productSelected.filter((item)=>{
        return item._id != object._id;
      });
      this.calculateTotal();
    }

    /**funcionalidad para obtener el listado de de niveles
    */
    getLevels(){
      this.connection.sendRequestAnonimus("level:list",this.levelMin).subscribe(async(data:RequestObject)=>{
        this.levelList = data.object.instanceList;
      },error=>{
        console.log("error->level:list",error);
      })
    }

    show(object){
      const dialogRef = this.dialog.open(PriceListViewComponent, {
        width: '36rem',
        height:'90%',
        data:object,
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result != undefined ){
          if(result.transaction == 'ok'){
            // El modal se cerro con objeto
            object.price = result.object.price;
            this.calculateTotal();
          }else{
            // El modal se cerro sin objeto
          }
        }else{
          // El modal se cerro sin seleccionar algo, dandole click fuera
        }
      });
    }



}
