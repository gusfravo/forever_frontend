import { Component, OnInit,Inject } from '@angular/core';
import { ConnectionService } from '@connection/connection.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { RequestObject } from '@connection/utils.interface';
import { Product } from '../../interfaces/product.interface';
import { Level } from '../../interfaces/level.interface';
import { ProductLevelPrice } from '../../interfaces/productLevelPrice.interface';
import { AdminLevelProductComponent } from './admin-level-product/admin-level-product.component';

@Component({
  selector: 'app-admin-product-update',
  templateUrl: './admin-product-update.component.html',
  styleUrls: ['./admin-product-update.component.css']
})
export class AdminProductUpdateComponent implements OnInit {
  productModel:Product = {
    _id:'',
    sku:'',
    name:'',
    ccUnit:0.0,
    status:true
  }
  levelMin = {
    max:10,
    page:0,
    filter:{
      value:''
    }
  };
  productLevelPriceModel:ProductLevelPrice = {
    _id:'',
    price:0,
    product:JSON.parse(JSON.stringify(this.productModel)),
    level:{
      _id:'',
      name:'',
      status:true
    }
  };
  levelList:Level[] = [];
  productLevelPriceList:ProductLevelPrice[] = [];
  productLevelPriceListTemp:ProductLevelPrice[] = [];
  object:Product = JSON.parse(JSON.stringify(this.productModel));
  constructor(public dialogRef: MatDialogRef<AdminProductUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private connection:ConnectionService,
    public dialog:MatDialog
  ) { }

    ngOnInit(): void {
      if(this.data != 'new') {
        // this.loadingService.show(true,"Espere un momento..");
        this.connection.sendRequestAnonimus('product:get',{_id:this.data}).subscribe((data:any)=>{
          this.object = JSON.parse(JSON.stringify(data.object));
          this.getLevels();
          // this.loadingService.hide();
        },
        (error)=>{
          // this.loadingService.hide();
          console.log('Error:product:get',error)
        })
      }else{
        this.getLevels();
      }
    }

    /**funcionalidad para obtener el listado de de niveles
    */
    getLevels(){
      this.connection.sendRequestAnonimus("level:list",this.levelMin).subscribe(async(data:RequestObject)=>{
        this.levelList = data.object.instanceList;
        this.productLevelPriceList = [];
        for(let item of this.levelList){
          let aux = await this.makeModelProductPriceLeve(item);
          this.productLevelPriceList.push(aux);
        }
        // Buscamos los precios de un productos
        if(this.object._id != ''){
          this.productLevelPriceListTemp = await this.getPricenFromProduct(this.object);
          for(let i = 0; i < this.productLevelPriceList.length; i++){
            for(let item of this.productLevelPriceListTemp){
              if(item.level._id == this.productLevelPriceList[i].level._id){
                this.productLevelPriceList[i] = item;
                break;
              }
            }
          }
        }

        console.log(this.productLevelPriceList);
      },error=>{
        console.log("error->level:list",error);
      })
    }

    makeModelProductPriceLeve(object:Level):Promise<ProductLevelPrice>{
      return new Promise((resolve,reject)=>{
        let aux:ProductLevelPrice = JSON.parse(JSON.stringify(this.productLevelPriceModel));
        aux.level = object;
        resolve(aux);
      });
    }

    getPricenFromProduct(object):Promise<ProductLevelPrice[]>{
      return new Promise((resolve,reject)=>{
        let productLevelPriceMin = {
          product:{
            _id:object._id
          }
        }
        this.connection.sendRequestAnonimus("productLevelPrice:findAllByProduct",productLevelPriceMin).subscribe((data:RequestObject)=>{
          resolve(data.object.instanceList)
        },error=>{
          console.log("error->productLevelPrice:findAllByProduct",error);
          reject(error);
        })
      });
    }

    /**funcaionalidad para crea o actualizar un nivel
    */
    update(_id){
      const dialogRef = this.dialog.open(AdminLevelProductComponent, {
        width: '30rem',
        data: _id,
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result != undefined ){
          if(result.transaction == 'ok'){
            // El modal se cerro con objeto
            this.getLevels();
          }else{
            // El modal se cerro sin objeto
          }
        }else{
          // El modal se cerro sin seleccionar algo, dandole click fuera
        }
      });
    }

    /**funcionalidad para guardar el producto
    */
    send(){
      this.connection.sendRequest("product:update",this.object).subscribe(async(data:RequestObject)=>{
        this.object._id = data.object._id;
        //Guardamos los precios de los productos
        try{
          for(let i = 0; i < this.productLevelPriceList.length; i++){
            this.productLevelPriceList[i].product._id = this.object._id;
            let aux = await this.savePrice(this.productLevelPriceList[i]);
            this.productLevelPriceList[i]._id = aux._id;
          }
          this.close(true);
        }catch(e){
          console.log(e);
        }

      },error=>{
        console.log("error->product:update",error);
      })
    }

    savePrice(object):Promise<ProductLevelPrice>{
      return new Promise((resolve,reject)=>{
        this.connection.sendRequest("productLevelPrice:update",object).subscribe(async(data:RequestObject)=>{
          resolve(data.object);
        },error=>{
          console.log("error->product:update",error);
          reject(error);
        })
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
        object.code = 'customer:001';
      }
      this.dialogRef.close(object);
    }

  }
