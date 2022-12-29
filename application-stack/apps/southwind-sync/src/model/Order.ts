

export class Order {
  
  orderId: number;
  
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
  };

  employee: {
    employeeId: number;
    lastName: string;
    firstName: string;
    title: string;
    titleOfCourtesy: string;
    extension: string;
  }
  
  shippedDate: Date;
  
  requiredDate: Date;
  
  freight: number;

  shipper: {
    shipperId: number;
    companyName: string;
    phone: string;
  }

  shipping: {
    name: string;
    address: string;
    city: string;
    region: string;
    country: string
  }

  details: {
    product: {
      productId: number;
      productName:  string;
    },
    unitPrice: number;
    quantity: number;
    discount: number;
  }[]

}


