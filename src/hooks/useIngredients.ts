import type { IngredientEntity, IngredientDTO } from '../types/ingredient';
import { ENDPOINT_URL } from '../types/ingredient';
import useApi from './useApi';

interface IngredientsHook {
  // read: () => IngredientEntity[];
  // readOne: (id: string) => IngredientEntity;
  // create: (newData: IngredientDTO) => void;
  // update: (id: string, newData: IngredientDTO) => void;
  // remove: (id: string) => void;
};

const useIngredients = () => {
  const { callGet, callDelete, callPost, callPut, loading } = useApi();

  const read = () => callGet(ENDPOINT_URL);
  const readOne = (id: string) => callGet(`${ENDPOINT_URL}/${id}`);
  const create = (newData: IngredientDTO) => callPost(ENDPOINT_URL, newData);
  const update = (id: string, newData: IngredientDTO) => { callPut(`${ENDPOINT_URL}/${id}`, newData)};
  const remove = (id: string) => { callDelete(`${ENDPOINT_URL}/${id}`) };
  
  return {
    read,
    readOne,
    create,
    update,
    remove,
    loading,
  };
};

export default useIngredients;