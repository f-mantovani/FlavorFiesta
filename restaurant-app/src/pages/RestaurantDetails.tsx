import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Row, Spinner, Table } from 'react-bootstrap';
import axios from 'axios';
import { BASE_URL } from '../utils';
import { Dish, Restaurant } from '../types';
import { DishCard } from '../components/DishCard';

export const RestaurantDetails = () => {
	const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
	const { id } = useParams();

	const getOneRestaurant = useCallback(async () => {
		try {
			const { data } = await axios.get(`${BASE_URL}/restaurants/${id}?_embed=menu`);
			setRestaurant(data);
		} catch (error) {
			console.error(error);
		}
	}, [id]);

	useEffect(() => {
		getOneRestaurant();
	}, [getOneRestaurant]);

	const generateDishCard = (array: Dish[]) => {
		if (array.length) {
			return array.map((dish) => <DishCard key={`${dish.name}${dish.price}`} {...dish} />);
		}
		return <p>No dishes in this category yet</p>
	}

	return (
		<Col className='text-center'>
			{restaurant ? (
				<>
					<Row>
						<h1>{restaurant.name}</h1>
					</Row>
					<Row>
						<Table bordered className='my-5'>
							<thead>
								<tr>
									<th>Cuisine</th>
									<th>Location</th>
									<th>Rating</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>{restaurant.cuisine}</td>
									<td>{restaurant.location}</td>
									<td>{restaurant.rating}</td>
								</tr>
							</tbody>
						</Table>
					</Row>

					{restaurant?.menu ? (
						<>
							<Row className='me-auto my-3'>
								<h4>Appetizers</h4>
								{generateDishCard(restaurant.menu[0].entrance)}
							</Row>
							<Row className='me-auto my-3'>
								<h4>Main Dish</h4>
								{generateDishCard(restaurant.menu[0].main_dishes)}
							</Row>
							<Row className='me-auto my-3'>
								<h4>Dessert</h4>
								{generateDishCard(restaurant.menu[0].dessert)}
							</Row>
						</>
					) : null}
				</>
			) : (
				<Spinner />
			)}
		</Col>
	);
};
