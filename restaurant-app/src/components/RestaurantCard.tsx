import { Button, Card, Col, Row, Stack } from 'react-bootstrap';
import { Restaurant } from '../types';
import { CardInfo } from './CardInfo';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils';
import { Dispatch, SetStateAction } from 'react';

export const RestaurantCard = ({
	id,
	cuisine,
	name,
	price_range,
	rating,
	refreshList,
	setLoading,
	loading,
}: Restaurant & {
	refreshList?: () => Promise<void>;
	loading?: boolean;
	setLoading?: Dispatch<SetStateAction<boolean>>;
}) => {
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const deleteRestaurant = async (id: number) => {
		try {
			if (setLoading) {
				setLoading((prev) => !prev);
			}
			await axios.delete(`${BASE_URL}/restaurants/${id}`);
			if (refreshList) {
				await refreshList();
			}
		} catch (error) {
			console.log(error);
		} finally {
			if (setLoading) {
				setLoading((prev) => !prev);
			}
		}
	};

	return (
		<Card className='my-4 mx-1 ' style={{ minHeight: '16rem' }}>
			<Card.Body className='d-flex flex-column justify-content-between'>
				<div className='d-flex flex-row justify-content-between align-items-baseline '>
					<Card.Title>{name}</Card.Title>
					<Card.Subtitle className='text-muted'>
						{[...Array(...price_range).map(() => '$')]}
					</Card.Subtitle>
				</div>
				<Row>
					<Stack gap={3}>
						<CardInfo label='Cuisine' info={cuisine} />
						<CardInfo label='Rating' info={rating} />
					</Stack>
				</Row>

				<div className='d-flex flex-lg-row gap-2 flex-column'>
					<Button
						onClick={() => {
							if (pathname.includes('/admin')) {
								return navigate(`/admin/restaurant/${id}`);
							}
							navigate(`/restaurants/${id}`);
						}}
					>
						{pathname.includes('/admin') ? 'Edit this restaurant' : 'Check the menu'}
					</Button>
					{pathname.includes('/admin') && (
						<Button
							disabled={loading}
							onClick={() => deleteRestaurant(id)}
							variant='danger'
						>
							Delete
						</Button>
					)}
				</div>
			</Card.Body>
		</Card>
	);
};
