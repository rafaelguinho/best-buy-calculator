import React, { useState } from 'react';
import Unit from "../modules/unit";
import { useForm, useFieldArray } from 'react-hook-form';
import Select from 'react-select'

function BestBuy() {
    const [units, SetUnits] = useState([new Unit("Litro", 1000), new Unit("ML", 1), new Unit("Metro", 100), new Unit("Centímetro", 1)]);

    const { register, control, errors } = useForm({ defaultValues: { items: [{}, {}] } });

    const { append, remove, fields } = useFieldArray({ control, name: "items" });

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ];

    return (<form>
        {fields.map((field, index) => {
            const fieldName = `items[${index}]`;
            return (
                <div>
                    <fieldset name={fieldName} key={fieldName}>

                        <div>
                            <label>R$</label>
                            <input type="number" step="0.01" name={`${fieldName}.price`} />
                        </div>

                        <div>
                            <label>Amount</label>
                            <input type="number" step="0.01" name={`${fieldName}.amount`} />
                        </div>

                        <div>
                            <Select options={options} />
                        </div>

                    </fieldset>
                    <div>
                        <button type="button" onClick={() => { remove(index) }}>Remove</button>
                    </div>
                </div>
            )
        })}
        <div>
            <button type="button" onClick={() => { append({}) }}>Add</button>
        </div>
    </form>)

}

export default BestBuy;