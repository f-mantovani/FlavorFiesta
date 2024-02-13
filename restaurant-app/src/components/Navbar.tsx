import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import AdminBar from './AdminBar';

export const NavbarWrapper = () => {
	const { pathname } = useLocation();

	return (
		<Navbar variant='dark' bg='dark'>
			<Container>
				<Navbar.Brand>
					<Link to={'/'}>
						<h4>FlavorFiesta</h4>
					</Link>
				</Navbar.Brand>
				{pathname.includes('/admin') && <AdminBar />}
				<Nav.Item>
					<Link to={'/restaurants'}>
						<h5>Restaurant List</h5>
					</Link>
				</Nav.Item>
			</Container>
		</Navbar>
	);
};
