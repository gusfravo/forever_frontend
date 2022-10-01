import { Product } from './product.interface';
import { Level } from './level.interface';

export interface ProductLevelPrice {
  _id:string
  price:number,
  product:Product,
  level:Level 
}
