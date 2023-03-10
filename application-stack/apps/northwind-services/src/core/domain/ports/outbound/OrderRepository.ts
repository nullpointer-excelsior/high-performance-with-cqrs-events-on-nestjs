import { Order } from "../../Order";



export interface OrderRepository {

    save(order: Order): Promise<number>
    findBySlice(limit: number, offset: number): Promise<Order[]>
    count(): Promise<number>

}
