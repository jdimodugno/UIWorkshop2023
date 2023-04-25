import React, { useCallback, useEffect, useMemo, useState } from 'react';

import 'bulma/css/bulma.min.css';
import './App.css';
import IngredientForm from '../components/IngredientForm/IngredientForm';
import useIngredients from '../hooks/useIngredients';
import IngredientCard from '../components/IngredientCard/IngredientCard';
import { IngredientDTO, IngredientEntity } from '../types/ingredient';
import { Block, Box, Columns, Content, Heading, Modal } from 'react-bulma-components';
import CustomNavbar from '../components/Navbar/CustomNavbar';

const App = () => {
  const [ingredients, setIngredients] = useState<IngredientEntity[]>([]);
  const [selected, setSelected] = useState<IngredientEntity>();
  const [modalOpen, setModalOpen] = useState(false);

  const { read, create, update, remove } = useIngredients();

  const getData = async () => {
    const data: IngredientEntity[] = await read();
    setIngredients(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const updateIngredient = useCallback(
    (data: IngredientDTO) => {
      if (selected) update(selected.id, data);
    }, [selected],
  );

  const formMethod = useMemo(() => selected ? updateIngredient : create, [selected]);

  const handleSubmit = useCallback(async (data: IngredientDTO) => {
    setModalOpen(false);
    await formMethod(data);
    getData();
  }, [formMethod])

  const renderForm = useMemo(() => (
    <IngredientForm data={selected} onSubmit={handleSubmit} onClear={() => setSelected(undefined)} />
  ), [selected, formMethod]);

  const handleItemCreation = () => {
    setSelected(undefined);
    setModalOpen(true);
  }

  const handleItemSelection = (item: IngredientEntity) => {
    setSelected(item);
    setModalOpen(true);
  }

  const handleItemRemoval = (id: string) => {
    remove(id);
    getData();
  }

  return (
    <div className='App'>
      <CustomNavbar createNewIngredient={handleItemCreation} />
      <Content>
        <Box style={{ padding: 10, marginTop: 16, marginLeft: 16, marginRight: 16 }}>
          <Block>
            <Heading size={5}>
              My Ingredients
            </Heading>
            <Heading subtitle size={6}>
              You'll see all your ingredients here
            </Heading>
          </Block>

          <Columns className="IngredientsList">
            {ingredients.map((item) => (
              <Columns.Column size={3}>
                <IngredientCard
                  key={item.id}
                  ingredient={item}
                  onSelect={handleItemSelection}
                  onDelete={(ingredient) => handleItemRemoval(ingredient.id)}
                />
              </Columns.Column>
            ))}
          </Columns>
        </Box>

        <Modal
          showClose
          closeOnEsc
          closeOnBlur
          show={modalOpen}
          onClose={() => setModalOpen(false)}
        >
          <Modal.Content>
            {renderForm}
          </Modal.Content>
        </Modal>
      </Content>
    </div>
  );
}

export default App;
