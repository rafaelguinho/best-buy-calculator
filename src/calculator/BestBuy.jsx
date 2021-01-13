import React, { useEffect, useReducer, useRef } from "react";
import Unit from "../modules/unit";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import Select from "react-select";

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

    const selectInputRef = useRef([]);
    selectInputRef.current = [];

    const addToRefs = el => {
        if (el && !selectInputRef.current.includes(el)) {
            selectInputRef.current.push(el);
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const { register, setValue, getValues, control, errors, handleSubmit } = useForm({
        defaultValues: { items: [{}, {}] },
    });

    const { append, remove, fields } = useFieldArray({ control, name: "items" });

    const clearAllOtherSelects = (index) => {
        fields.forEach((item, idx) => {
            if (idx === index) return;

            selectInputRef.current[idx].select.clearValue();

            setValue(`items[${idx}].unit`, null);
        });
    };

    const fieldChanged = (e) => {
        console.log(getValues());
    };

    const onSubmit = data => console.log(data);

    useEffect(() => {

        clearAllOtherSelects(0);
    }, [state.primarySelectedUnit]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {fields.map((field, index) => {
                const fieldName = `items[${index}]`;
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
                                <Controller
                                    name={`${fieldName}.unit`}
                                    control={control}
                                    render={(props) => {
                                        return <Select
                                            ref={addToRefs}
                                            value={index == 0 ? state.primarySelectedUnit : state.secondariesSelectedUnits[index]}
                                            options={index == 0 ? state.primaryOptions : state.secondaryOptions}
                                            onChange={(e) => {
                                                props.onChange(e);

                                                if (index == 0) {
                                                    dispatch({ type: 'selectPrimaryOption', payload: e });
                                                } else {
                                                    dispatch({ type: 'selectSecondaryOption', payload: { index, item: e } });
                                                }

                                                fieldChanged(e);
                                            }}
                                        />
                                    }}

                                />
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
