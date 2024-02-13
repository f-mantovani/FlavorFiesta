import axios from 'axios';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Alert, Button, Col, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils';
import { Restaurant } from '../types';

export const AddRestaurant = () => {
	const [newRestaurant, setNewRestaurant] = useState({
		name: '',
		cuisine: '',
		rating: '',
		location: '',
		price_range: '',
	});
	const [error, setError] = useState('');

	const navigate = useNavigate();

	const handleChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
		setNewRestaurant((previous) => ({ ...previous, [name]: value }));
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setError('');
		if (
			!newRestaurant.name ||
			!newRestaurant.cuisine ||
			!newRestaurant.location ||
			Number(newRestaurant.price_range) === 0 ||
			Number(newRestaurant.rating) === 0
		) {
			setError('All fields are mandatory');
			return;
		}
		try {
			const resto = {
				...newRestaurant,
				price_range: '$'.repeat(Number(newRestaurant.price_range)),
				rating: Number(newRestaurant.rating)
			};
			const { data } = await axios.post<string, { data: Restaurant }>(
				`${BASE_URL}/restaurants`,
				resto
			);

			const newMenu = {
				restaurantId: data.id,
				entrance: [],
				main_dishes: [],
				dessert: [],
			};
			await axios.post(`${BASE_URL}/menu`, newMenu);
			navigate('/admin/list');
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Form onSubmit={handleSubmit}>
			<Col>
				<h1>Add a Restaurant</h1>
				<Form.Group controlId='formBasicName' className='mt-2'>
					<Form.Label>Name*:</Form.Label>
					<Form.Control
						type='text'
						placeholder='Sizzling place'
						name='name'
						value={newRestaurant.name}
						onChange={handleChange}
					/>
				</Form.Group>

				<Form.Group controlId='formBasicCuisine' className='mt-2'>
					<Form.Label>Cuisine*:</Form.Label>
					<Form.Control
						type='text'
						placeholder='Chinese'
						name='cuisine'
						value={newRestaurant.cuisine}
						onChange={handleChange}
					/>
				</Form.Group>

				<Form.Group controlId='formBasicRating' className='mt-2'>
					<Form.Label>Rating*:</Form.Label>
					<Form.Control
						type='number'
						placeholder=''
						name='rating'
						value={newRestaurant.rating}
						onChange={handleChange}
						min={0}
						max={5}
					/>
				</Form.Group>

				<Form.Group controlId='formBasicLocation' className='mt-2'>
					<Form.Label>Location*:</Form.Label>
					<Form.Control
						type='text'
						placeholder='Downtown'
						name='location'
						value={newRestaurant.location}
						onChange={handleChange}
					/>
				</Form.Group>

				<Form.Group controlId='formBasicPrice' className='mt-2'>
					<Form.Label>Price*:</Form.Label>
					<Form.Control
						type='number'
						placeholder=''
						name='price_range'
						value={newRestaurant.price_range}
						onChange={handleChange}
						min={1}
						max={5}
					/>
				</Form.Group>

				{error && <Alert variant='danger' className='my-2'>{error}</Alert>}
				<div className='d-flex flex-column align-items-end mt-2'>
					<Form.Text className='text-muted'>Fields with the * symbol are mandatory</Form.Text>
					<Form.Group as={'div'} className='my-2 d-flex w-100 justify-content-end gap-2'>
						<Button type='submit'>Save</Button>
						<Button type='reset' variant='danger'>
							Cancel
						</Button>
					</Form.Group>
				</div>
			</Col>
		</Form>
	);
};
