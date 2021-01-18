import initialState from "../state/initialState";
import { units } from "../util/units";

function reducer(state, action) {
    switch (action.type) {
        case "reset":
            return {
                ...initialState
            }
        case "anyFieldChanged":
            return {
                ...state,
                moreFavourableProduct: null
            }
        case "moreFavourableProductFound":
            return {
                ...state,
                moreFavourableProduct: action.payload
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
            state.secondariesSelectedUnits[action.payload.index] = action.payload.item;
            return {
                ...state,
            }
        default:
            throw Error()
    }
}

export default reducer;