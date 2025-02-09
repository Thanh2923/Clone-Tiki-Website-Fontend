import { Product } from "./Product"


 export interface Cart {
    id:number,
    checkbox?:boolean,
    product:Product
    productId:number,
    quantity:number,
    userId:number
   }



  export  interface UpdateCart {
      cartId:number,
      quantity:number
    }
    