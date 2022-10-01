import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '@connection/connection.service';
import { RequestObject } from '@connection/utils.interface';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  productMin = {
    max:10,
    page:0,
    filter:{
      value:''
    }
  }
  list = [];
  pagination = {
    total:0,
    page:0,
    pageSizeOptions:[ 2 ,5, 10, 25, 100],
  }
  pageEvent: PageEvent;

  constructor(private connection:ConnectionService) { }

  ngOnInit(): void {
    this.getList();
  }

  /**funcionalidad para obtener el listado de productos
  */
  getList(){
    this.connection.sendRequestAnonimus("product:list",this.productMin).subscribe((data: RequestObject)=>{
      console.log(data.object);
      this.list = data.object.instanceList;
      this.pagination.page = this.productMin.page;
      this.pagination.total = data.object.total;
    },error=>{
      console.log(error);
    })
  }

  // funcion para obtener los datos del paginado.
  onPaginateChange(event){
    console.log(event);
    this.productMin.page = event.pageIndex;
    this.productMin.max = event.pageSize;
    this.getList();
  }

}
