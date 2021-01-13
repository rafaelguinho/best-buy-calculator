const units = [
    new Unit("Litros", 1000, unitTypes.VOLUME),
    new Unit("ml", 1, unitTypes.VOLUME),
    new Unit("Metros", 100, unitTypes.LENGTH),
    new Unit("Centímetros", 1, unitTypes.LENGTH),
];

let primaryOptions = units.map((u) => {
    return { value: u.label, label: u.label, type: u.type };
});

const defaultSelectedUnit = primaryOptions[0];

const defaultSecondaryOptions = units.filter(u => u.type === defaultSelectedUnit.type).map((u) => {
    return { value: u.label, label: u.label, type: u.type };
});


const initialState = {
    primarySelectedUnit: defaultSelectedUnit,
    secondariesSelectedUnits: [],
    primaryOptions,
    secondaryOptions: defaultSecondaryOptions,
}

function reducer(state, action) {
    switch (action.type) {
        case "reset":
            return {
                ...initialState
            }
        case "selectPrimaryOption":
            return {
                ...state,
                primarySelectedUnit: action.payload,
                secondariesSelectedUnits: [],
                secondaryOptions: units.filter(u => u.type === action.payload.type).map((u) => {
                    return { value: u.label, label: u.label, type: u.type };
                }),
            }
        case "selectSecondaryOption":
            state.secondariesSelectedUnits[index] = e;
            return {
                ...state,
            }
        default:
            throw Error()
    }
}