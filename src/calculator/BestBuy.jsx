import React, { useState, useEffect } from "react";
import Unit from "../modules/unit";
import { useForm, useFieldArray } from "react-hook-form";
import Select from "react-select";

function BestBuy() {
  const units = [
    new Unit("Litros", 1000),
    new Unit("ml", 1),
    new Unit("Metros", 100),
    new Unit("Centímetros", 1),
  ];

  let options = units.map((u) => {
    return { value: u.basicValue, label: u.label };
  });

  const { register, control, errors } = useForm({
    defaultValues: { items: [{}, {}] },
  });

  const { append, remove, fields } = useFieldArray({ control, name: "items" });

  return (
    <form>
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
                <Select
                  options={options}
                  defaultValue={options[0]}
                  name={`${fieldName}.unit`}
                />
              </div>
            </fieldset>
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
    </form>
  );
}

export default BestBuy;
