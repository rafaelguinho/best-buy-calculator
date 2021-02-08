class BestBuyCalculator {
    constructor(products) {
        if (products === null || products.length === 0) {
            throw new Error("You must pass a product")
        }

        this.products = products;
    }

    compare() {

        const filledProducts = this.products.filter(p => p.allValuesFilled());
        if (filledProducts.length < 2) return null;

        var minPrice = this.products[0].priceByBasicUnit();
        var mostFavourable = this.products[0];
        var savedMoney = 0;



        filledProducts.forEach(p => {
            if (p.priceByBasicUnit() < minPrice) {
                mostFavourable = p;
            }
        });

        filledProducts.forEach(p => {
            var priceByBasicUnitAmount = p.priceByBasicUnitAmount(mostFavourable.amountByBasicUnit());
            var saved = priceByBasicUnitAmount - mostFavourable.price;

            saved = Math.round(saved * 100) / 100;

            if (saved > savedMoney) {
                savedMoney = saved
            }
        });

        return {
            mostFavourable: { ...mostFavourable, savedMoney }
        }
    }
}

export default BestBuyCalculator;