import { Card, Col } from 'react-bootstrap';
import { Dish } from '../types';

export const DishCard = ({ name, price, description }: Dish) => {
	return (
		<Col xs={12} md={6}>
			<Card style={{minHeight: '8rem'}} className='my-2 me-auto'>
				<Card.Body className='d-flex flex-column align-items-start justify-content-start'>
					<div className='d-flex justify-content-between align-items-baseline w-100'>
						<Card.Title>{name}</Card.Title>
						<Card.Subtitle className='text-muted'>$ {price}</Card.Subtitle>
					</div>
					<Card.Text className='text-start mt-3'>{description}</Card.Text>
				</Card.Body>
			</Card>
		</Col>
	);
};
