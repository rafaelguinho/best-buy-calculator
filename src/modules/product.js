class Product {
    constructor(id, price, amount, unit) {
        this.id = id;
        this.price = price;
        this.amount = amount;
        this.unit = unit;
    }

    allValuesFilled() { return this.id && this.price && this.amount && this.unit }

    priceByBasicUnit() {
        return this.price / this.amountByBasicUnit();
    }

    amountByBasicUnit() {
        return this.unit.basicValue * this.amount
    }

    priceByBasicUnitAmount(amount) {
        return this.priceByBasicUnit() * amount;
    }

}

export default Product;