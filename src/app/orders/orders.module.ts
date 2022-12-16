import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PizzaOrderComponent } from './pizza-order/pizza-order.component';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { PizzaOrderResolver } from './pizza-order.resolver';

const routes: Routes = [
  { path: '', component: OrdersComponent },
  { path: 'pizza', component: PizzaOrderComponent, resolve: { resolverData: PizzaOrderResolver } },

]


@NgModule({
  declarations: [
    PizzaOrderComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule
  ]
})
export class OrdersModule { }
