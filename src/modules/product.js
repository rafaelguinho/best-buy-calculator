class Product {
    constructor(price, amount, unit) {
        this.price = price;
        this.amount = amount;
        this.unit = unit;
    }

    priceByBasicUnit() {
        return this.price / this.amountByBasicUnit();
    }

    amountByBasicUnit() {
        return this.unit.basicValue * this.amount
    }

    priceByBasicUnitAmount(amount){
        return this.priceByBasicUnit() * amount;
    }

}

export default Product;