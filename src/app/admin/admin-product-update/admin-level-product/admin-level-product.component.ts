import { Component, OnInit,Inject } from '@angular/core';
import { ConnectionService } from '@connection/connection.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RequestObject } from '@connection/utils.interface';
import { Level } from '../../../interfaces/level.interface';

@Component({
  selector: 'app-admin-level-product',
  templateUrl: './admin-level-product.component.html',
  styleUrls: ['./admin-level-product.component.css']
})
export class AdminLevelProductComponent implements OnInit {
  levelModel:Level = {
    _id:'',
    name:'',
    status:true
  }
  object:Level = JSON.parse(JSON.stringify(this.levelModel));
  constructor(public dialogRef: MatDialogRef<AdminLevelProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private connection:ConnectionService,) { }

  ngOnInit(): void {
    if(this.data != 'new') {
      // this.loadingService.show(true,"Espere un momento..");
      this.connection.sendRequestAnonimus('level:get',{_id:this.data}).subscribe((data:any)=>{
        this.object = JSON.parse(JSON.stringify(data.object));
        // this.loadingService.hide();
      },
      (error)=>{
        // this.loadingService.hide();
        console.log('Error:product:get',error)
      })
    }else{
    }
  }

  send(){
    this.connection.sendRequestAnonimus("level:update",this.object).subscribe((data:RequestObject)=>{
      this.object._id = data.object._id;
      this.close(true)
    },error=>{
      console.log("error->level:update",error);
    })
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
      object.code = 'level:001';
    }
    this.dialogRef.close(object);
  }

}
