import React, { useEffect, useReducer } from "react";
import Unit from "../modules/unit";
import Product from "../modules/product";
import BestBuyCalculator from "../modules/bestBuyCalculator";
import { useForm, useFieldArray } from "react-hook-form";

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
            state.secondariesSelectedUnits[action.payload.index] = action.payload.item;
            return {
                ...state,
            }
        default:
            throw Error()
    }
}

function BestBuy() {

    const [state, dispatch] = useReducer(reducer, initialState);

    const { register, setValue, getValues, control, errors, handleSubmit } = useForm({
        defaultValues: { items: [{}, {}] },
    });

    const { append, remove, fields } = useFieldArray({ control, name: "items" });

    const clearAllOtherSelects = (index) => {
        fields.forEach((item, idx) => {
            if (idx === index) return;

            setValue(`items[${idx}].unit`, null);
        });
    };

    const fieldChanged = (e) => {
        const formValues = getValues();

        const products = formValues.items.map(f => (new Product(f.price, f.amount, findUnit(f.unit))));

        const calculator = new BestBuyCalculator(products);

        const result = calculator.compare();

        console.log(result);
    };

    const onSubmit = data => console.log(data);

    useEffect(() => {
        clearAllOtherSelects(0);
    }, [state.primarySelectedUnit]);

    const findUnit = (unitName) => {
        if (!unitName) return null;
        return units.find(u => u.label === unitName);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {fields.map((field, index) => {
                const fieldName = `items[${index}]`;

                const options = index == 0 ? state.primaryOptions : state.secondaryOptions;

                return (
                    <fieldset name={field.id} key={field.id}>
                        <div>

                            <div>
                                <label>R$</label>
                                <input ref={register} onChange={fieldChanged} type="number" step="0.01" name={`${fieldName}.price`} />
                            </div>

                            <div>
                                <label>Amount</label>
                                <input ref={register} onChange={fieldChanged} type="number" step="0.01" name={`${fieldName}.amount`} />
                            </div>

                            <div>
                                <select name={`${fieldName}.unit`} ref={register} onChange={(e) => {

                                    const selectIndex = e.nativeEvent.target.selectedIndex;

                                    const value = e.target.value;
                                    const label = e.nativeEvent.target[selectIndex].text;
                                    const type = e.nativeEvent.target[selectIndex].attributes['data-type'].value;

                                    const optionPayload = { value, label, type }

                                    if (index == 0) {
                                        dispatch({ type: 'selectPrimaryOption', payload: optionPayload });
                                    } else {
                                        dispatch({ type: 'selectSecondaryOption', payload: { index, item: optionPayload } });
                                    }

                                    fieldChanged(e);
                                }}>
                                    {options.map(item => (
                                        <option key={item.value} data-type={item.type} value={item.value}>
                                            {item.label}
                                        </option>
                                    ))}
                                </select>

                            </div>

                            <div>
                                <button
                                    type="button"
                                    disabled={index <= 1}
                                    onClick={() => {
                                        remove(index);
                                    }}
                                >
                                    Remove
              </button>
                            </div>
                        </div>
                    </fieldset>
                );
            })}
            <div>
                <button
                    type="button"
                    onClick={() => {
                        append({});
                    }}
                >
                    Add
        </button>
            </div>

            <input type="submit" value="submit" />
        </form>
    );
}

export default BestBuy;
