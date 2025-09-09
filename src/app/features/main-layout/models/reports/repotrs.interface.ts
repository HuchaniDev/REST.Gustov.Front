export interface DailySalesReportDto {
    date: string;
    items: ItemReportDto[];
    total: number;
}

export interface ItemReportDto {
    itemName: string;
    quantity: number;
    unitPrice: number;
    subTotal: number;
}
