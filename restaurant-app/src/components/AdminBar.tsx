import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdminBar = () => {
	return (
		<>
			<Nav.Item>
				<Link to={'/admin'}>Add Restaurant</Link>
			</Nav.Item>
			<Nav.Item>
				<Link to={'/admin/list'}>Edit Restaurant</Link>
			</Nav.Item>
		</>
	);
};
export default AdminBar;
