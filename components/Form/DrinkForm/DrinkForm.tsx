import { FieldError, FormProvider, useForm } from "react-hook-form";
import React from "react";
import { Button } from "@chakra-ui/react";
import Name from "./Name";
import Description from "./Description";
import Instruction from "./Instructions";
import { Filter, useUpsert } from "react-supabase";
import ErrorOrNot from "../../ErrorOrNot";
import { useRouter } from "next/router";
import { DrinkType, IngredientForDrink } from "../../../types/types";
import IngredientsSelect from "./IngredientsSelect";

export type DrinkFormValues = {
  name: string;
  ingredients: IngredientForDrink[];
  description: string;
  instructions: string;
};

type Props = {
  drink?: DrinkType;
  triggerToast: (name: string) => void;
  filter?: Filter<any>;
};

const DrinkForm = (props: Props) => {
  const { drink, triggerToast, filter } = props;
  const router = useRouter();

  const methods = useForm<DrinkType>({ defaultValues: drink });

  const [{ error }, execute] = useUpsert("drink", { filter });

  const iForDMethods = useUpsert("ingredient_for_drink");
  const executeIngredientForDrink = iForDMethods[1];

  const onSubmit = (values: DrinkFormValues) => {
    const { ingredients, ...rest } = values;

    execute(rest)
      .then((result) => {
        const drinkId = result.data[0].id;

        for (const ingredientForDrink of ingredients) {
          executeIngredientForDrink({
            drink_id: drinkId,
            ingredient_id: ingredientForDrink.ingredient.id,
            amount: ingredientForDrink.amount,
            unit: ingredientForDrink.unit,
          });
        }
      })
      .finally(() => {
        triggerToast(values.name);
        router.push(`${router.basePath}/drink/`);
      });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Name
          register={methods.register}
          fieldError={methods.formState.errors.name as FieldError}
        />
        <IngredientsSelect />
        <Instruction
          register={methods.register}
          fieldError={methods.formState.errors.instructions as FieldError}
        />
        <Description
          register={methods.register}
          fieldError={methods.formState.errors.description as FieldError}
        />
        <Button mt={4} colorScheme="teal" type="submit">
          Submit
        </Button>
        <ErrorOrNot error={error} />
      </form>
    </FormProvider>
  );
};

export default DrinkForm;
