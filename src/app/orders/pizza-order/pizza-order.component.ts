import { Component, OnInit } from '@angular/core';
import { zip } from 'rxjs';
import { IPizzaSize } from 'src/app/interfaces/IPizzaSize';
import { IPizzaTopping } from 'src/app/interfaces/IPizzaToping';
import { ITopping } from 'src/app/interfaces/IToping';

@Component({
  selector: 'app-pizza-order',
  templateUrl: './pizza-order.component.html',
  styleUrls: ['./pizza-order.component.scss']
})
export class PizzaOrderComponent implements OnInit {

  pizzaSizes: IPizzaSize[] =
    [{ type: 'Small', price: 5, isDiscountApplicable: false },
    { type: 'Medium', price: 7, isDiscountApplicable: false },
    { type: 'Large', price: 8, isDiscountApplicable: false },
    { type: 'Extra Large', price: 9, isDiscountApplicable: false }]
    ;

  pizzaToppings: IPizzaTopping[] = [{
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
      { name: 'Barbeque chicken', price: 3 },
    ]
  }]

  selectedPizzas: any[] = [];

  ngOnInit(): void {

  }

  onTopingSelection(event: boolean, topping: ITopping, size: IPizzaSize): void {
    if (event) {
      this.selectedPizzas.push({ size: size.type, topping: topping.name, toppingPrice: topping.price })
    }
    else {
      this.selectedPizzas = this.selectedPizzas.filter(x => (x.size + x.topping) != (size.type + topping.name));
    }
    let pizzaToppings = this.selectedPizzas.filter(x => x.size == size.type);
    this.calculatePizzaPrice(pizzaToppings, size)
  }

  totals = { 'Medium': { calculated: 0, discount: 0, offer: "" }, 'Small': { calculated: 0, discount: 0, offer: "" }, 'Large': { calculated: 0, discount: 0, offer: "" }, 'Extra Large': { calculated: 0, discount: 0, offer: "" } }
  calculatePizzaPrice(toppings: any[], pizzaSize: IPizzaSize): void {
    if (toppings.length == 0) {
      this.totals[pizzaSize.type].calculated = 0;
      return;
    }
    this.totals[pizzaSize.type].calculated = pizzaSize.price + toppings.map(x => x.toppingPrice).reduce((a, b) => (a + b));
    this.calculateOffer(pizzaSize.type, toppings)
  }

  calculateOffer(pizzaType: string, toppings: any[]) {
    if (pizzaType == "Medium") {
      if (toppings.length == 2) {
        this.totals[pizzaType].discount = this.totals[pizzaType].calculated - 5;
        this.totals[pizzaType].offer = "Offer 1";
      }
      else if (toppings.length == 4) {
        this.totals[pizzaType].discount = this.totals[pizzaType].calculated - 9;
        this.totals[pizzaType].offer = "Offer 2";
      }
      else {
        this.totals[pizzaType].discount = 0
      }
    }
    else if (pizzaType == "Large") {
      let totalToppings = 0;
      if (toppings.map(x => x.topping).includes('Pepperoni')) {
        totalToppings += 1;
      }
      if (toppings.map(x => x.topping).includes('Barbeque chicken')) {
        totalToppings += 1;
      }
      totalToppings += toppings.length;
      if (totalToppings == 4) {
        this.totals[pizzaType].discount = ((this.totals[pizzaType].calculated / 2) * 100) / 100;
        this.totals[pizzaType].offer = "Offer 3";
      }
      else {
        this.totals[pizzaType].discount = 0;
      }
    }
  }
}
