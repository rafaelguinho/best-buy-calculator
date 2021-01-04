class BestBuyCalculator {
    constructor(products) {
        if (products == null || products.length == 0) {
            throw "You must pass a product"
        }

        this.products = products;
    }

    compare() {
        var minPrice = this.products[0].priceByBasicUnit();
        var mostFavourable = this.products[0];
        var savedMoney = 0;

        this.products.forEach(p => {
            if (p.priceByBasicUnit() < minPrice) {
                mostFavourable = p;
            }
        });

        this.products.forEach(p => {
            var priceByBasicUnitAmount = p.priceByBasicUnitAmount(mostFavourable.amountByBasicUnit());
            var saved = priceByBasicUnitAmount - mostFavourable.price;
            
            saved = Math.round(saved * 100) / 100;

            if(saved > savedMoney){
                savedMoney = saved
            }
        });

        return {
            savedMoney,
            mostFavourable
        }
    }
}

export default BestBuyCalculator;