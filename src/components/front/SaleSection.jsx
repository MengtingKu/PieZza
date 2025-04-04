import ModalImage from 'react-modal-image';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useWindowSize } from 'react-use';
import Icon from '@helper/FontAwesomeIcon';
import ButtonLink from '@components/common/ButtonLink';

const SaleSection = ({ specialProducts }) => {
	const navigate = useNavigate();
	const { width } = useWindowSize();

	return (
		<div className="container px-5">
			<div className="title_group">
				<h3 className="title text-center">好康的在這裡！！！</h3>
				<h6 className="subtitle text-center">see today best deal!!!</h6>
			</div>
			<div className="row">
				{specialProducts.map(pro => {
					return (
						<div className="col-3 lightbox_group" key={pro.id}>
							<ModalImage
								small={pro.imageUrl}
								medium={pro.imageUrl}
								alt={pro.title}
								className="swiper_image my-3"
							/>
							<div className="text-center">
								<button
									type="button"
									className="btn btn-link text-warning opacity-50 px-3 go_shoppingBtn"
									onClick={() => {
										navigate(`/product/${pro.id}`);
									}}
								>
									{' '}
									{width > 787 ? (
										<span>
											點我看降價 <Icon icon="down" />{' '}
											{`${pro.origin_price - pro.price}`}
										</span>
									) : (
										'點我'
									)}
								</button>
							</div>
						</div>
					);
				})}
			</div>
			<div className="see_more">
				<ButtonLink
					className="btn-sm btn-warning go_shoppingBtn"
					to="/products"
				>
					更多美食
				</ButtonLink>
			</div>
		</div>
	);
};

SaleSection.propTypes = {
	specialProducts: PropTypes.array,
};

export default SaleSection;
