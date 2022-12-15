import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PizzaOrderComponent } from './pizza-order/pizza-order.component';
import { Route, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'pizza', component: PizzaOrderComponent }
]


@NgModule({
  declarations: [
    PizzaOrderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class OrdersModule { }
