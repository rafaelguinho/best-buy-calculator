import Unit from "../modules/unit";
const unitTypes = {
    LENGTH: 'Length',
    VOLUME: 'Volume'
}

const units = [
    new Unit("Litros", 1000, unitTypes.VOLUME),
    new Unit("ml", 1, unitTypes.VOLUME),
    new Unit("Metros", 100, unitTypes.LENGTH),
    new Unit("Centímetros", 1, unitTypes.LENGTH),
];

export { unitTypes, units };