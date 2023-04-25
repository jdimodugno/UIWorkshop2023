import { API_URL } from '../config/http';

const RESOURCE = 'ingredients';
export const ENDPOINT_URL = `${API_URL}/${RESOURCE}`;

export type IngredientDTO = {
  name: string;
  price: string;
}

export type IngredientEntity = {
  id: string;
} & IngredientDTO;