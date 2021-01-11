import React, { useState, useEffect } from "react";
import Unit from "../modules/unit";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import Select from "react-select";

function BestBuy() {
    const [selectedUnit, setSelectedUnit] = useState(null);
    const [secondariesSelectedUnits, setSecondariesSelectedUnits] = useState([]);
    const [secondaryOptions, setSecondaryOptions] = useState([]);

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

    let options = units.map((u) => {
        return { value: u.label, label: u.label, type: u.type };
    });

    const { register, setValue, getValues, control, errors, handleSubmit } = useForm({
        defaultValues: { items: [{}, {}] },
    });

    const { append, remove, fields } = useFieldArray({ control, name: "items" });

    useEffect(() => {
        if (!selectedUnit) {
            setSelectedUnit(options[0]);
        }
    }, [options]);

    useEffect(() => {

        if (!selectedUnit) return;

        const newSecondaryOptions = units.filter(u => u.type === selectedUnit.type).map((u) => {
            return { value: u.label, label: u.label, type: u.type };
        });

        setSecondaryOptions(newSecondaryOptions);

    }, [selectedUnit]);

    const clearAllOtherSelects = (index) => {
        fields.forEach((item, idx) => {
            if(idx === index) return;

            setValue(`items[${idx}].unit`, null);

            secondariesSelectedUnits[idx] = null;
            setSecondariesSelectedUnits(secondariesSelectedUnits);
        });
    };

    const fieldChanged = (e) => {
        console.log(getValues());
    };

    const onSubmit = data => console.log(data);

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
                                            ref={register}
                                            value={index == 0 ? selectedUnit : secondariesSelectedUnits[index]}
                                            options={index == 0 ? options : secondaryOptions}
                                            onChange={(e) => {
                                                props.onChange(e);

                                                if(index == 0){
                                                    setSelectedUnit(e);
                                                    clearAllOtherSelects(index);
                                                }else{
                                                    secondariesSelectedUnits[index] = e;
                                                    setSecondariesSelectedUnits(secondariesSelectedUnits);
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
