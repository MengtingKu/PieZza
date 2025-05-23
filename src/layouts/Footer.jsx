import { Link } from 'react-router-dom';
import Icon from '@helper/FontAwesomeIcon';

const Footer = () => {
	return (
		<>
			<div className="footer_top_bg">
				<img src="./customer-top-bg.png" alt="footer-top-bg" />
			</div>
			<div className="container mt-5 mb-3 px-4 overflow-hidden">
				<div className="row gx-5">
					<div className="col-md-4">
						<div className="brand_block">
							<Link to="/">
								<img
									src="./pie-zza.webp"
									alt="logo"
									className="logo"
								/>
							</Link>
							<div className="brands_group">
								<a
									href="javascript:void(0)"
									className="facebook_bg"
								>
									<Icon icon="facebook" />
								</a>
								<a
									href="javascript:void(0)"
									className="line_bg"
								>
									<Icon icon="line" />
								</a>
								<a
									href="javascript:void(0)"
									className="threads_bg"
								>
									<Icon icon="threads" />
								</a>
							</div>
						</div>
					</div>
					<div className="col-md-4 contact_block">
						<div className="block_title">
							<span>聯絡方法</span>
						</div>
						<ul className="contact_text">
							<li>
								<span className="item_title">
									<Icon icon="address" />
								</span>
								-
								<span className="m-2">
									岡山県岡山市北区富田町2-2-16 2F
								</span>
							</li>
							<li>
								<span className="item_title">
									<Icon icon="phone" />
								</span>
								- <a href="tel:1234567890">0911-111111</a>,
								<a href="tel:1234567890">0922-222222</a>
							</li>
							<li>
								<span className="item_title">
									<Icon icon="email" />
								</span>
								-{' '}
								<a href="mailto:nowhere@piezza.com">
									nowhere@piezza.com
								</a>
							</li>
						</ul>
					</div>
					<div className="col-md-4 opening_block">
						<div className="block_title">
							<span>營業時間</span>
						</div>
						<ul className="contact_text">
							<li>
								<span className="item_title">週一 ~ 周六</span>
								<span>： 17:00 ~ 21:00</span>
							</li>
							<li>
								<span className="item_title">週日(含假日)</span>
								<span>： 休息</span>
								<span className="ms-3">
									<Icon icon="rest" color="red" />
								</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<hr />
			<div className="copyright_text">
				&copy; 2025 PieZza. All Rights Reserved. Designed by{' '}
				<Link
					to="https://github.com/MengtingKu/PieZza"
					className="fw-bold"
					style={{ color: '#fff3cd' }}
					target="_blank"
				>
					kuku
				</Link>
				.
				<Link to="/login" className="admin_login">
					<Icon icon="login" />
					<span className="ms-2">員工頻道</span>
				</Link>
			</div>
		</>
	);
};

export default Footer;
