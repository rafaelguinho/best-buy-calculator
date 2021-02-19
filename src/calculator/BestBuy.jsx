import React, { useEffect, useReducer } from "react";
import Product from "../modules/product";
import BestBuyCalculator from "../modules/bestBuyCalculator";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import reducer from "../reducers/bestBuyReducer";
import initialState from "../state/initialState";
import { units } from "../util/units";
import BestBuyTooltipMessage from "../components/BestBuyTooltipMessage";
import {
  faTrashAlt,
  faPlusCircle,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CurrencyFormat from "react-currency-format";

function BestBuy() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { register, setValue, getValues, control, handleSubmit } = useForm({
    defaultValues: {
      products: [
        { amount: "", price: "", unit: "" },
        { amount: "", price: "", unit: "" },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const fieldChanged = (e) => {
    dispatch({ type: "anyFieldChanged" });

    const formValues = getValues();

    const products = formValues.products.map(
      (f) => new Product(f.id, f.price, f.amount, findUnit(f.unit))
    );

    const calculator = new BestBuyCalculator(products);

    const result = calculator.compare();

    if (result) {
      dispatch({ type: "moreFavourableProductFound", payload: result });
    }

    console.log(result);
  };

  const onSubmit = (data) => console.log(data);

  useEffect(() => {
    const clearAllOtherSelects = (index) => {
      fields.forEach((item, idx) => {
        if (idx === index) return;

        const secondaryOption =
          state.secondariesSelectedUnits &&
          state.secondariesSelectedUnits[idx]
            ? state.secondariesSelectedUnits[idx].value
            : state.secondaryOptions[0].value;

        setValue(`products[${idx}].unit`, secondaryOption);
      });
    };
    clearAllOtherSelects(0);
  }, [state.primarySelectedUnit, fields, setValue]);

  const findUnit = (unitName) => {
    if (!unitName) return null;
    return units.find((u) => u.label === unitName);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => {
          const fieldName = `products[${index}]`;

          const options =
            index === 0 ? state.primaryOptions : state.secondaryOptions;

          const isTheBestBuy =
            field.id === state.moreFavourableProduct?.mostFavourable?.id;

          return (
            <fieldset
              className={isTheBestBuy ? "best" : ""}
              name={field.id}
              key={field.id}
            >
              {isTheBestBuy ? (
                <div className="best-container">
                  <strong>
                    <FontAwesomeIcon icon={faTrophy} size="1x" /> Melhor
                  </strong>

                  <BestBuyTooltipMessage
                    isTheBestBuy={isTheBestBuy}
                    moreFavourableProduct={
                      state.moreFavourableProduct?.mostFavourable
                    }
                  />
                </div>
              ) : (
                <></>
              )}

              <div className="form-fields">
                <input
                  type="hidden"
                  ref={register()}
                  name={`${fieldName}.id`}
                  defaultValue={field.id}
                />

                <div className="Label-field">
                  <input
                    className="input"
                    placeholder="Quantidade"
                    ref={register()}
                    onChange={fieldChanged}
                    type="number"
                    step="0.01"
                    name={`${fieldName}.amount`}
                    defaultValue={`${field.amount}`}
                  />
                </div>

                <div className="Label-field">
                  <Controller
                    control={control}
                    name={`${fieldName}.price`}
                    render={({ onChange }) => (
                      <CurrencyFormat
                        className="input"
                        placeholder="Preço R$"
                        type="tel"
                        fixedDecimalScale={true}
                        thousandSeparator={true}
                        prefix={"R$ "}
                        onValueChange={(values) => {
                          const { floatValue } = values;

                          onChange(floatValue);
                          fieldChanged();
                        }}
                      />
                    )}
                  />
                </div>

                <div className="select Label-field">
                  <select
                    className="unit-select"
                    name={`${fieldName}.unit`}
                    defaultValue={`${field.unit}`}
                    ref={register()}
                    onChange={(e) => {
                      const selectIndex = e.nativeEvent.target.selectedIndex;

                      const value = e.target.value;
                      const label = e.nativeEvent.target[selectIndex].text;
                      const type =
                        e.nativeEvent.target[selectIndex].attributes[
                          "data-type"
                        ].value;

                      const optionPayload = { value, label, type };

                      if (index === 0) {
                        dispatch({
                          type: "selectPrimaryOption",
                          payload: optionPayload,
                        });
                      } else {
                        dispatch({
                          type: "selectSecondaryOption",
                          payload: { index, item: optionPayload },
                        });
                      }

                      fieldChanged(e);
                    }}
                  >
                    {options.map((item) => (
                      <option
                        key={item.value}
                        data-type={item.type}
                        value={item.value}
                      >
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="button-container">
                  <button
                    className="button"
                    type="button"
                    disabled={index <= 1}
                    onClick={() => {
                      remove(index);
                      console.log(index);
                      console.log(fields);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} size="1x" />
                  </button>
                </div>
              </div>
            </fieldset>
          );
        })}
        <div className="button-container append">
          <button
            type="button"
            className="button"
            onClick={() => {
              append({});
            }}
          >
            <FontAwesomeIcon icon={faPlusCircle} size="1x" /> Add
          </button>
        </div>
      </form>
    </>
  );
}

export default BestBuy;
