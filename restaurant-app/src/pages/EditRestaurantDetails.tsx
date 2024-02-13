import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../utils';
import axios from 'axios';

export const EditRestaurantDetails = () => {
	const [newRestaurant, setNewRestaurant] = useState({
		name: '',
		cuisine: '',
		rating: '',
		location: '',
		price_range: '',
	});

	const { id } = useParams();
	const navigate = useNavigate();

	const handleChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
		setNewRestaurant((previous) => ({ ...previous, [name]: value }));
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
      const resto = { ...newRestaurant, price_range: '$'.repeat(Number(newRestaurant.price_range))}
			await axios.patch(`${BASE_URL}/restaurants/${id}`, resto);
      navigate('/admin/list')
		} catch (error) {
			console.log(error);
		}
	};

	const getOneRestaurant = useCallback(async () => {
		try {
			const { data } = await axios.get(`${BASE_URL}/restaurants/${id}`);
			const price_range = data.price_range.length;
			setNewRestaurant({ ...data, price_range });
		} catch (error) {
			console.log(error);
		}
	}, [id]);

	useEffect(() => {
		getOneRestaurant();
	}, [getOneRestaurant]);
  
	return (
		<Form onSubmit={handleSubmit}>
			<Col>
				<h1>Edit {newRestaurant.name}</h1>
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
