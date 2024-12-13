declare module 'midtrans-client' {
    export class CoreApi {
      constructor(config: {
        isProduction: boolean;
        serverKey: string;
        clientKey: string;
      });
  
      transactionStatus(orderId: string): Promise<any>;
  
      transaction(parameter: {
        payment_type: string;
        order_id: string;
        gross_amount: number;
        bank_transfer?: {
          bank: string;
        };
        customer_details?: {
          email?: string;
        };
      }): Promise<any>;
    }
  
    export class Snap {
      constructor(config: {
        isProduction: boolean;
        serverKey: string;
        clientKey: string;
      });
  
      createTransaction(parameter: any): Promise<any>;
  
      transactionStatus(orderId: string): Promise<any>;
    }
  }
  