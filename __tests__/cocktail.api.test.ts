import { describe, test, expect } from "bun:test";
import {
  searchIngredientByName,
  searchCocktailByName,
} from "../urls/cocktails.url";
import { ingredientContract } from "../contract/cocktail-ingredients.contract";
import axios from "axios";
import { cocktailContract } from "../contract/cocktail.contract";

describe("Cocktail Ingredients", () => {
  test("should return a 200 status code", async () => {
    const response = await axios.request(searchIngredientByName("vodka"));

    const result = response.status;

    expect(result).toEqual(200);
  });

  test("should conform to ingredient contract", async () => {
    const response = await axios.request(searchIngredientByName("vodka"));
    const responseBody = response.data;

    const validate = ingredientContract.validate(responseBody);
    const result = validate.error;

    expect(result).toBeUndefined();
  });

  test("should return null for an ingredient that is not found", async () => {
    const response = await axios.request(searchIngredientByName("INVALID"));
    const responseBody = response.data;

    const validate = ingredientContract.validate(responseBody);

    const result = validate.error;
    expect(result).toBeUndefined();
  });

  test('should return alcohol "Yes" and ABV with a value', async () => {
    const expected = { strAlcohol: "Yes", strABV: "40" };
    const response = await axios.request(searchIngredientByName("gin"));
    const { ingredients } = response.data;
    const [firstIngredient] = ingredients;

    const result = {
      strAlcohol: firstIngredient.strAlcohol,
      strABV: firstIngredient.strABV,
    };

    expect(result).toEqual(expected);
  });

  test('should return alcohol "No" and ABV with null', async () => {
    const expected = { strAlcohol: "No", strABV: null };
    const response = await axios.request(searchIngredientByName("orange"));
    const { ingredients } = response.data;
    const [firstIngredient] = ingredients;

    const result = {
      strAlcohol: firstIngredient.strAlcohol,
      strABV: firstIngredient.strABV,
    };

    expect(result).toEqual(expected);
  });
});

describe("Cocktails", () => {
  test("should return a 200 status code", async () => {
    const response = await axios.request(searchCocktailByName("gin tonic"));

    const result = response.status;

    expect(result).toEqual(200);
  });

  test("should conform to the contract", async () => {
    const response = await axios.request(searchCocktailByName("gin tonic"));
    const responseBody = response.data;

    const validate = cocktailContract.validate(responseBody);
    const result = validate.error;

    expect(result).toBeUndefined();
  });

  test("should return null for drinks that are not found", async () => {
    const response = await axios.request(searchCocktailByName("INVALID"));
    const result = response.data.drinks;

    expect(result).toBeNull();
  });

  test("should return cocktail despite the case of the name", async () => {
    const response = await axios.request(searchCocktailByName("GIN tonic"));
    const responseBody = response.data;

    const validate = cocktailContract.validate(responseBody);
    const result = validate.error;

    expect(result).toBeUndefined();
  });
});
