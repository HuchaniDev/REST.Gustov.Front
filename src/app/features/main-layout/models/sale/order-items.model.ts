export class ss{
    // items:ItemLIteDto[]=[]
    //
    // constructor() {}
    //
    // addItem(item:ItemLIteDto){
    //     this.items.push(item)
    // }
    //
    // deleteItem(id:number){
    //     // this.items = this.items.filter(i=> i.id!==id);
    // }
}

export class OrderItemsModel{
    id: number;
    name: string;
    price: number;
    quantity:number;
    imageUrl: string;
    subTotal: number;

    constructor(
        id: number,
        name: string,
        price: number,
        imageUrl: string
    ) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = 1;
        this.imageUrl = imageUrl;
        this.subTotal = price;
    }

    increment(){
        this.quantity++;
        this.updateSubTotal();
    }

    decrement(){
        if(this.quantity > 1){
            this.quantity--;
            this.updateSubTotal();
        }
    }

    updateSubTotal(){
        this.subTotal= this.price*this.quantity;
    }
}
