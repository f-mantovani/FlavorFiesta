import { Col } from 'react-bootstrap';
import { RestaurantCard } from '../components/RestaurantCard';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils';
import { Restaurant } from '../types';

export const EditRestaurantList = () => {
	const [restaurants, setRestaurants] = useState<null | Restaurant[]>(null);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState<boolean>(false);

	const getRestaurants = useCallback(async () => {
		setError('');
		try {
			const { data } = await axios.get(`${BASE_URL}/restaurants`);
			setRestaurants(data);
		} catch (error) {
			console.error(error);
			setError('We got an error fetching the data');
		}
	}, []);

	useEffect(() => {
		getRestaurants();
	}, [getRestaurants]);

	return (
		<>
			<h1>Restaurants List</h1>
			{!restaurants ? (
				<p>Loading...</p>
			) : (
				<>
					{restaurants.map((restaurant) => (
						<Col xs={12} sm={6} md={4} lg={3} key={restaurant.id}>
							<RestaurantCard
								{...restaurant}
								refreshList={getRestaurants}
								loading={loading}
								setLoading={setLoading}
							/>
						</Col>
					))}
				</>
			)}
			{error && <p>{error}</p>}
		</>
	);
};
