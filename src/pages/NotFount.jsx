import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonLink from '@components/common/ButtonLink';

const NotFount = () => {
	const navigate = useNavigate();
	useEffect(() => {
		setTimeout(() => navigate('/'), 3000);
	}, [navigate]);

	return (
		<div className="not_fount">
			<div className="content">
				<h2>Oops!</h2>
				<p>為什麼找不到 PieZza...</p>
				<ButtonLink
					className="btn btn-link text-warning p-3 my-3 animate_on"
					to="/"
				>
					Back To Home
				</ButtonLink>
			</div>
			<img
				className="img-fluid only_cheesePie"
				src="./cheese-pizza.png"
				alt="only-cheesePie"
			/>
			<h3 className="text">
				<span className="4">4</span>
				<img
					className="img-fluid only_ring"
					src="./pizza-ring.png"
					alt="only-ring"
				/>
				<span className="4">4</span>
			</h3>
		</div>
	);
};

export default NotFount;
