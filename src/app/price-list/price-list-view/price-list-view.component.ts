import { Component, OnInit, Inject } from '@angular/core';
import { ConnectionService } from '@connection/connection.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RequestObject } from '@connection/utils.interface';

@Component({
  selector: 'app-price-list-view',
  templateUrl: './price-list-view.component.html',
  styleUrls: ['./price-list-view.component.css']
})
export class PriceListViewComponent implements OnInit {
  object = {
    _id:'',
    price:''
  }
  pricesList = []
  constructor(public dialogRef: MatDialogRef<PriceListViewComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private connection:ConnectionService) { }

  ngOnInit(): void {
    for(let item of this.data.prices){
      if(this.data.price ==  item.price){
        this.object = item;
      }
    }
    this.pricesList = this.data.prices;
  }

  savePrice(){
    this.close(true);
  }

  close(status){
    let object = {
      transaction:'',
      code:'',
      object:{}
    };
    if(status){
      object.transaction = 'ok';
      object.object = this.object;
    }else{
      object.transaction = 'bad';
      object.code = '::::001';
    }
    this.dialogRef.close(object);
  }

}
