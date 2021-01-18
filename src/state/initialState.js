import { units } from "../util/units";

let primaryOptions = units.map((u) => {
    return { value: u.label, label: u.label, type: u.type };
});

const defaultSelectedUnit = primaryOptions[0];

const defaultSecondaryOptions = units.filter(u => u.type === defaultSelectedUnit.type).map((u) => {
    return { value: u.label, label: u.label, type: u.type };
});


const initialState = {
    moreFavourableProduct: null,
    primarySelectedUnit: defaultSelectedUnit,
    secondariesSelectedUnits: [],
    primaryOptions,
    secondaryOptions: defaultSecondaryOptions,
}

export default initialState;