export interface IPizzaSize {
    type: 'Small' | 'Medium' | 'Large' | 'Extra Large'
    price: number,
    isDiscountApplicable?: boolean 
}