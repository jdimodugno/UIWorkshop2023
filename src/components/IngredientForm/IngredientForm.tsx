import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import './IngredientForm.css';
import { Button, Card, Form } from 'react-bulma-components';
import { IngredientDTO } from '../../types/ingredient';

interface IngredientFormProps {
  data?: IngredientDTO;
  onSubmit: (data: IngredientDTO) => void;
  onClear: () => void;
}

const IngredientForm = ({ data, onSubmit, onClear }: IngredientFormProps) => {
  const [formData, setFormData] = useState(data || {
    name: '',
    price: '',
  });

  useEffect(() => {
    if (data) setFormData({ ...data })
  }, [data])

  const handleDataChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  const title = useMemo(() => `${data ? 'Update' : 'New'} Ingredient`, [data])

  const handleSubmit = () => onSubmit(formData);

  const handleClear = () => {
    if (data) onClear();
    setFormData({ name: '', price: ''})
  }

  const isClearDisabled = !formData.name && !formData.price;
  const isSubmitDisabled = !formData.name || !formData.price;

  return (
    <Card className='IngredientForm'>
      <Card.Header.Title>{title}</Card.Header.Title>
      <Card.Content>
        <Form.Field>
          <Form.Label>Name</Form.Label>
          <Form.Control>
            <Form.Input placeholder="Eggs" name="name" value={formData.name} onChange={handleDataChange} />
          </Form.Control>
        </Form.Field>
        <Form.Field>
          <Form.Control>
            <Form.Label>Unit</Form.Label>
            <Form.Input placeholder="Price (in Dollars)" name="price" value={formData.price} onChange={handleDataChange} />
          </Form.Control>
        </Form.Field>
        <Button.Group align='right'>
          <Button color="secondary" onClick={handleClear} disabled={isClearDisabled}>Clear</Button>
          <Button color="primary" onClick={handleSubmit} disabled={isSubmitDisabled}>Submit</Button>
        </Button.Group>
      </Card.Content>
    </Card>
  );
}

export default IngredientForm;