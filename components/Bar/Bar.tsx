import { Center } from "@chakra-ui/layout";
import { UseComboboxStateChange } from "downshift";
import React, { useState } from "react";
import { BarDrink, BarType } from "../../types/types";
import BarNav from "./BarNav";
import ComboBox from "./ComboBox";
import DrinkList from "./DrinkList";

type Props = {
  bar: BarType;
  removeDrink: (drinkId: string) => void;
};

const Bar = (props: Props) => {
  const { bar, removeDrink } = props;

  const [drinks, setDrinks] = useState(bar.drink);
  const [addingDrinks, setAddingDrinks] = useState(false);
  const [addingIngredients, setAddingIngredients] = useState(false);

  const toggleAddingDrinks = () => {
    setAddingDrinks((prev) => !prev);
    setAddingIngredients(false);
  };

  const toggleAddingIngredients = () => {
    setAddingIngredients((prev) => !prev);
    setAddingDrinks(false);
  };

  const removeDrinkFromBar = (drinkId: string) => {
    setDrinks((prevState) => prevState.filter((drink) => drink.id !== drinkId));
    removeDrink(drinkId);
  };

  return (
    <>
      <BarNav
        barId={bar.id}
        onAddDrink={() => toggleAddingDrinks()}
        onAddIngredient={() => toggleAddingIngredients()}
      />
      <AddDrink display={addingDrinks} drinks={drinks} />
      <AddIngredient display={addingIngredients} />
      <DrinkList
        drinks={drinks}
        type={"drink"}
        removeDrinkFromBar={removeDrinkFromBar}
      />
    </>
  );
};

export default Bar;

type ItemType = {
  name: string;
};

const AddDrink = (props: { display: boolean; drinks: BarDrink[] }) => {
  const { display, drinks } = props;

  if (!display) return null;

  const onSelectedItemChange: (
    changes: UseComboboxStateChange<ItemType>
  ) => void = ({ inputValue }) => console.log(inputValue);

  return (
    <Center>
      <ComboBox
        items={drinks}
        onSelectedItemChange={onSelectedItemChange}
        submit={() => console.log("fooo")}
      />
    </Center>
  );
};

const AddIngredient = (props: { display: boolean }) => {
  const { display } = props;

  if (!display) return null;
  return (
    <Center>
      <div>Add Ingredient</div>
    </Center>
  );
};
