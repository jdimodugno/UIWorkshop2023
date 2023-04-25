import React from 'react';
import { IngredientEntity } from '../../types/ingredient';
import { Block, Button, Card, Heading, Tag } from 'react-bulma-components';
import './IngredientCard.css';

interface IngredientCardProps {
  ingredient: IngredientEntity;
  onSelect: (ingredient: IngredientEntity) => void;
  onDelete: (ingredient: IngredientEntity) => void;
}



const IngredientCard = ({ ingredient, onSelect, onDelete }: IngredientCardProps) => (
  <Block>
    <Card backgroundColor='light' className='IngredientCard'>
      <Button className="removeButton" remove onClick={() => onDelete(ingredient)}/>
      <Card.Content>
        <Heading size={6}>{ingredient.name}</Heading>
        <Tag color="success">Price: ${ingredient.price}</Tag>
      </Card.Content>
      <Button.Group align='right'>
        <Button size="small" color="secondary" onClick={() => onSelect(ingredient)}>Select</Button>
      </Button.Group>
    </Card>
  </Block>
);

export default IngredientCard;