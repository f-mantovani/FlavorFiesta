import { Card, Col, Stack } from 'react-bootstrap';

export const CardInfo = ({ label, info }: { label: string; info: string | number }) => {
	return (
		<Col>
			<Stack direction='horizontal' gap={1}>
				<Card.Text as={'span'}>{label}:</Card.Text>
				<Card.Text as={'span'}>{info}</Card.Text>
			</Stack>
		</Col>
	);
};
