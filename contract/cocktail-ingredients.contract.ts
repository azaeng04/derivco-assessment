import joi from "joi";

const ingredient = joi
  .object({
    idIngredient: joi.string().required(),
    strIngredient: joi.string().required(),
    strDescription: joi.string().required(),
    strType: joi.string().required(),
    strAlcohol: joi.string().allow("Yes").allow("No"),
    strABV: joi.string().optional().allow(null),
  })
  .optional();

export const ingredientContract = joi.object({
  ingredients: joi.array().allow(ingredient).allow(null),
}).required();


