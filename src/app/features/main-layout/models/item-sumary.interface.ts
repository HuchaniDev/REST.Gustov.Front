export interface ItemSummary {
    id: number;
    name: string;
    price: number;
    stock: number;
    statusColor: string;
    status: boolean;
    imageUrl: string;

    // constructor(
    //     id: number,
    //     name: string,
    //     price: number,
    //     stock: number,
    //     statusColor: string,
    //     status: boolean,
    //     imageUrl: string
    // ) {
    //     this.id = id;
    //     this.name = name;
    //     this.price = price;
    //     this.stock = stock;
    //     this.statusColor = statusColor;
    //     this.status = status;
    //     this.imageUrl = imageUrl;
    // }
    //
    // decrementStock() {
    //     this.stock--;
    // }
    // incrementStock() {
    //     this.stock++;
    // }
}
