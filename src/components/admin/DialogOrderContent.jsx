import PropTypes from 'prop-types';
import {
	splitText,
	formatTimestamp,
	transformTableData,
} from '@helper/stringAndDataHelpers';

const DialogOrderContent = ({
	modalType,
	templateData,
	handleModalInputChange,
}) => {
	if (modalType === 'delete') {
		return (
			<>
				你是否要刪除訂單：
				<span className="text-danger fw-bold ms-3">
					{templateData.id}
				</span>
			</>
		);
	}

	if (modalType === 'read') {
		return (
			<div className="container">
				<div className="header_group">
					<h6 className="border-bottom fs-6 fw-bold py-2">
						訂單編號：{templateData.id}
					</h6>
					<small
						className={
							templateData.is_paid
								? 'text-success'
								: 'text-danger'
						}
					>
						<span className="d-block">
							訂單成立時間：
							{formatTimestamp(templateData.create_at)}
						</span>
						<span className="d-block">
							消費金額：{templateData.total.toLocaleString()}
						</span>
						<span className="d-block">
							訂單狀態：
							{templateData.is_paid ? '已付款' : '未付款'}
						</span>
					</small>
				</div>
				<div className="order_info my-3">
					<h6 className="border-bottom fs-6 fw-bold py-2">
						訂單內容
					</h6>
					<div>
						{transformTableData(
							Object.values(templateData.products)
						).map(pro => {
							return (
								<div
									className="card mb-3 border-0 rounded-0"
									key={pro.product_id}
								>
									<div className="row g-0">
										<div className="col-md-4">
											<img
												src={pro.product_imageUrl}
												className="img-fluid rounded-0"
												alt={pro.product_title}
											/>
										</div>
										<div className="col-md-8">
											<div className="card-body">
												<span className="card-text">
													{
														splitText(
															pro.product_title
														).chineseText
													}{' '}
													x {pro.qty}
												</span>
											</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
				<div className="my-3">
					<h6 className="border-bottom fs-6 fw-bold py-2">
						訂購人訊息
					</h6>
					{[
						{ key: 'name', label: '姓名' },
						{ key: 'email', label: '電子信箱' },
						{ key: 'tel', label: '電話' },
						{ key: 'address', label: '地址' },
					].map(item => {
						return (
							<div className="d-flex" key={item.key}>
								<span className="d-block w-25">
									{item.label}
								</span>
								<span className="d-block w-75">
									{templateData.user[item.key]}
								</span>
							</div>
						);
					})}
				</div>
			</div>
		);
	}

	return (
		<div className="container">
			<div className="header_group">
				<h6 className="border-bottom fs-6 fw-bold py-2">
					訂單編號：{templateData.id}
				</h6>
				<small
					className={
						templateData.is_paid ? 'text-success' : 'text-danger'
					}
				>
					<span className="d-block">
						訂單成立時間：
						{formatTimestamp(templateData.create_at)}
					</span>
					<span className="d-block">
						消費金額：{templateData.total.toLocaleString()}
					</span>
					<span>
						訂單狀態：
						<div className="form-check form-switch ms-1 d-inline-block">
							<input
								name="is_paid"
								type="checkbox"
								className="form-check-input"
								id="is_paid"
								role="switch"
								defaultChecked={templateData.is_paid}
								onChange={handleModalInputChange}
							/>
							<label
								className="form-check-label"
								htmlFor="is_paid"
							>
								已付款
							</label>
						</div>
					</span>
				</small>
			</div>
			<div className="order_info my-3">
				<h6 className="border-bottom fs-6 fw-bold py-2">訂單內容</h6>
				<div>
					{transformTableData(
						Object.values(templateData.products)
					).map(pro => {
						return (
							<div
								className="card mb-3 border-0 rounded-0"
								key={pro.product_id}
							>
								<div className="row g-0">
									<div className="col-md-4">
										<img
											src={pro.product_imageUrl}
											className="img-fluid rounded-0"
											alt={pro.product_title}
										/>
									</div>
									<div className="col-md-8">
										<div className="card-body">
											<div className="card-text">
												{
													splitText(pro.product_title)
														.chineseText
												}{' '}
												x {pro.qty}
											</div>
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
			<div className="my-3">
				<h6 className="border-bottom fs-6 fw-bold py-2">訂購人訊息</h6>
				{[
					{ key: 'name', label: '姓名' },
					{ key: 'email', label: '電子信箱' },
					{ key: 'tel', label: '電話' },
					{ key: 'address', label: '地址' },
				].map(item => {
					return (
						<div className="d-flex" key={item.key}>
							<span className="d-block w-25">{item.label}</span>
							<span className="d-block w-75">
								{templateData.user[item.key]}
							</span>
						</div>
					);
				})}
			</div>
		</div>
	);
};

DialogOrderContent.propTypes = {
	modalType: PropTypes.string.isRequired,
	templateData: PropTypes.object.isRequired,
	handleModalInputChange: PropTypes.func.isRequired,
};

export default DialogOrderContent;
