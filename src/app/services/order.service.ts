import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IPizzaSize } from '../interfaces/IPizzaSize';
import { IPizzaTopping } from '../interfaces/IPizzaToping';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }

  getPizzaTypes(): IPizzaSize[] {
    return [{ type: 'Small', price: 5, isDiscountApplicable: false },
    { type: 'Medium', price: 7, isDiscountApplicable: false },
    { type: 'Large', price: 8, isDiscountApplicable: false },
    { type: 'Extra Large', price: 9, isDiscountApplicable: false }];
  }

  getPizzaToppings(): IPizzaTopping[] {
    return [{
      category: 'Veg Toppings', toppings: [
        { name: 'Tomatoes', price: 1 },
        { name: 'Onions', price: 0.5 },
        { name: 'Bell Pepper', price: 1 },
        { name: 'Mushrooms', price: 1.20 },
        { name: 'Pineapple', price: 0.75 },
      ]
    },
    {
      category: 'Non Veg Toppings', toppings: [
        { name: 'Sausage', price: 1 },
        { name: 'Pepperoni', price: 2 },
        { name: 'Barbecue chicken', price: 3 },
      ]
    }];
  }
}
