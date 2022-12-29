import { Product } from "../../Product";

export interface ProductRepository {
    
    findById(id: number): Promise<Product>
    updateStock(productId: number,unitsInStock: number, unitsOnOrder: number): Promise<void>

}