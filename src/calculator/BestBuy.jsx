import React, { useState, useEffect } from "react";
import Unit from "../modules/unit";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import Select from "react-select";

function BestBuy() {
    const [selectedUnit, setSelectedUnit] = useState(null);

    const units = [
        new Unit("Litros", 1000),
        new Unit("ml", 1),
        new Unit("Metros", 100),
        new Unit("Centímetros", 1),
    ];

    let options = units.map((u) => {
        return { value: u.label, label: u.label };
    });

    const { register, getValues, control, errors, handleSubmit } = useForm({
        defaultValues: { items: [{}, {}] },
    });

    const { append, remove, fields } = useFieldArray({ control, name: "items" });

    useEffect(() => {
        if (!selectedUnit) {
            setSelectedUnit(options[0]);
        }
    }, [options]);

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
                                    defaultValue={options[0]}
                                    value={selectedUnit || options[0]}
                                    render={(props) => {
                                        return <Select
                                            ref={register}
                                            options={options}
                                            value={selectedUnit}
                                            isDisabled={index > 0}
                                            onChange={(e) => {
                                                props.onChange(e);
                                                setSelectedUnit(e);
                                                console.log(selectedUnit);
                                                fieldChanged(e);
                                            }}
                                        />
                                    }}

                                />

                                {/* <Select

                                    ref={register}
                                    options={options}
                                    isDisabled={index > 0}
                                    defaultValue={options[0]}
                                    name={`${fieldName}.unit`}
                                    onChange={(e) => {
                                        setSelectedUnit(e);
                                        fieldChanged(e);
                                    }}
                                /> */}
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
