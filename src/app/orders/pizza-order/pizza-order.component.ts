import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IPizzaSize } from 'src/app/interfaces/IPizzaSize';
import { IPizzaTopping } from 'src/app/interfaces/IPizzaToping';
import { ITopping } from 'src/app/interfaces/IToping';

@Component({
  selector: 'app-pizza-order',
  templateUrl: './pizza-order.component.html',
  styleUrls: ['./pizza-order.component.scss']
})
export class PizzaOrderComponent implements OnInit {

  pizzaSizes: IPizzaSize[] = [];

  pizzaToppings: IPizzaTopping[] = [];

  selectedPizzas: any[] = [];

  subscriptions: Subscription = new Subscription();

  constructor(private _activatedRoute: ActivatedRoute) {
    this.fetchResolverData();
  }

  fetchResolverData() {
    //Fetching data from the resolver
    this.subscriptions.add(this._activatedRoute.data.subscribe(
      data => {
        this.pizzaSizes = data['resolverData'][0];
        this.pizzaToppings = data['resolverData'][1];
      }
    ))
  }

  ngOnInit(): void {

  }

  //On Change function to save the toppings of each pizza
  onTopingSelection(event: boolean, topping: ITopping, size: IPizzaSize): void {
    if (event) {
      //Saving the toppings
      this.selectedPizzas.push({ size: size.type, topping: topping.name, toppingPrice: topping.price })
    }
    else {
      //Removing the toppings from the saved data if it is unchecked
      this.selectedPizzas = this.selectedPizzas.filter(x => (x.size + x.topping) != (size.type + topping.name));
    }
    //Passing the pizza toppings of selected size pizza
    let pizzaToppings = this.selectedPizzas.filter(x => x.size == size.type);
    this.calculatePizzaPrice(pizzaToppings, size)
  }

  totals = { 'Medium': { calculated: 0, discount: 0, offer: "" }, 'Small': { calculated: 0, discount: 0, offer: "" }, 'Large': { calculated: 0, discount: 0, offer: "" }, 'Extra Large': { calculated: 0, discount: 0, offer: "" } }

  calculatePizzaPrice(toppings: any[], pizzaSize: IPizzaSize): void {
    //Checking the toppings and updating the total to the 0 if there are no selections
    if (toppings.length == 0) {
      this.totals[pizzaSize.type].calculated = 0;
      return;
    }
    //Calculating the total price based on the toppings
    this.totals[pizzaSize.type].calculated = pizzaSize.price + toppings.map(x => x.toppingPrice).reduce((a, b) => (a + b));
    this.calculateOffer(pizzaSize.type, toppings)
  }

  calculateOffer(pizzaType: string, toppings: any[]) {
    //Calculating the offers for medium sized pizzas
    if (pizzaType == "Medium") {
      //Checking for the offer 1
      if (toppings.length == 2) {
        this.totals[pizzaType].discount = this.totals[pizzaType].calculated - 5;
        this.totals[pizzaType].offer = "Offer 1";
      }
      //Checking for the offer 2
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
      //Adding 1 more topping if the selection is pepperoni or Barbecue chicken
      if (toppings.map(x => x.topping).includes('Pepperoni')) {
        totalToppings += 1;
      }
      if (toppings.map(x => x.topping).includes('Barbecue chicken')) {
        totalToppings += 1;
      }
      totalToppings += toppings.length;
      //Checking for the offer 3
      if (totalToppings == 4) {
        this.totals[pizzaType].discount = ((this.totals[pizzaType].calculated / 2) * 100) / 100;
        this.totals[pizzaType].offer = "Offer 3";
      }
      else {
        this.totals[pizzaType].discount = 0;
      }
    }
  }

  ngOnDestroy():void{
    this.subscriptions.unsubscribe();
  }
}
