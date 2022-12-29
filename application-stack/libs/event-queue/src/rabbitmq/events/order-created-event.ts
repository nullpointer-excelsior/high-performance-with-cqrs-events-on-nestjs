
export const ORDER_CREATED_PATTERN = 'ORDER_CREATED_PATTERN'

export class OrderCreatedDetailEvent {
    product: {
        productId: number;
        productName: string;
    }
    unitPrice: number;
    quantity: number;
    discount: number;
}

export interface OrderCreatedEvent {
    orderId: any;
    orderDate: Date;
    customer: {
        customerId: string;
        contactName: string;
        contactTitle: string;
        companyName: string;
        address: string;
        city: string;
        region: string;
        country: string;
        phone: string;
    }
    employee: {
        employeeId: number;
        lastName: string;
        firstName: string;
        title: string;
        titleOfCourtesy: string;
        extension: string;
    }
    requiredDate: Date
    shippedDate: Date
    freight: number
    shipper: {
        shipperId: number;
        companyName: string;
        phone: string;   
    }
    shipping: {
        name: string,
        address: string,
        city: string,
        region: string,
        country: string
    }
    details: OrderCreatedDetailEvent[]

}