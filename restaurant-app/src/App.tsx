import './App.css';
import { Container, Row } from 'react-bootstrap';
import { NavbarWrapper } from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import { RestaurantsList } from './pages/RestaurantsList';
import { Home } from './pages/Home';
import { RestaurantDetails } from './pages/RestaurantDetails';
import { AddRestaurant } from './pages/AddRestaurant';
import { EditRestaurantList } from './pages/EditRestaurantList';
import { EditRestaurantDetails } from './pages/EditRestaurantDetails';


function App() {

	return (
		<>
			<NavbarWrapper />
			<Container className='mt-5'>
				<Row>
					<Routes>
						<Route path={'/'} element={<Home />}  />
						<Route path={'/restaurants'} element={<RestaurantsList />}  />
						<Route path={'/restaurants/:id'} element={<RestaurantDetails />}  />
						<Route path='/admin'>
							<Route path='' element={<AddRestaurant />} />
							<Route path='list' element={<EditRestaurantList />} />
							<Route path='restaurant/:id' element={<EditRestaurantDetails />} />
						</Route>
					</Routes>
				</Row>
			</Container>
		</>
	);
}

export default App;
