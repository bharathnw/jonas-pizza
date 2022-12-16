import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { forkJoin, Observable } from "rxjs";
import { OrderService } from "../services/order.service";

@Injectable({ providedIn: 'root' })
export class PizzaOrderResolver implements Resolve<any> {
    constructor(private _orderService: OrderService) {
    }
    resolve(): Observable<any> | Promise<any> | any {
        return [this._orderService.getPizzaTypes(), this._orderService.getPizzaToppings()];
    }
}