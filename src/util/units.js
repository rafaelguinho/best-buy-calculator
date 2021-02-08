import Unit from "../modules/unit";
const unitTypes = {
    LENGTH: 'Length',
    VOLUME: 'Volume',
    AMOUNT: 'Amount'
}

const units = [
    new Unit("Litros", 1000, unitTypes.VOLUME),
    new Unit("ml", 1, unitTypes.VOLUME),
    new Unit("Metros", 100, unitTypes.LENGTH),
    new Unit("Centímetros", 1, unitTypes.LENGTH),
    new Unit("Unidades", 1, unitTypes.AMOUNT),
];

export { unitTypes, units };