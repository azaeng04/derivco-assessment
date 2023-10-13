const host = "https://www.thecocktaildb.com";

export const searchIngredientByName = (name: string) => ({
  url: `${host}/api/json/v1/1/search.php?i=${name}`,
});

export const searchCocktailByName = (name: string) => ({
  url: `${host}/api/json/v1/1/search.php?s=${name}`,
});
