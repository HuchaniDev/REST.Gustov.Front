export interface SaleDetailTickedInterface{
    saleId:number;
    saleCode:string;
    saleDate:string;
    total:number;
    items: ItemSalesInterface[]
}
export interface ItemSalesInterface {
    id:number;
    name:string;
    subTotal:number;
    quantity:number;
}