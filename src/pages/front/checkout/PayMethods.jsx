// 先放著，到時候再看看怎麼解決實例問題，真的不行就換方向
import { Collapse } from 'bootstrap';
import { useState, useEffect, useRef } from 'react';

const PayMethods = () => {
	const [selectedPayment, setSelectedPayment] = useState('greenPoint');
	const [isAccordionOpen, setIsAccordionOpen] = useState(false);
	const collapseRef = useRef(null);
	const collapseInstance = useRef(null);

	const handlePaymentChange = event => {
		setSelectedPayment(event.target.value);
	};

	useEffect(() => {
		collapseInstance.current = new Collapse(collapseRef.current, {
			backdrop: false,
		});

		if (isAccordionOpen) {
			collapseInstance.current.show();
		} else {
			collapseInstance.current.hide();
		}

		return () => {
			if (collapseInstance.current) {
				collapseInstance.current.dispose();
			}
		};
	}, [isAccordionOpen]);

	return (
		<div className="container my-4 cart_list checkout">
			<div
				className="accordion accordion-flush"
				id="accordionPanelsStayOpenExample"
				ref={collapseRef}
			>
				<div className="accordion-item">
					<h2 className="accordion-header">
						<button
							className="accordion-button"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#paymentMethodCollapse"
							aria-expanded={isAccordionOpen ? true : false}
							onClick={() => setIsAccordionOpen(!isAccordionOpen)}
						>
							選擇付款方式
						</button>
					</h2>
					<div
						id="paymentMethodCollapse"
						className={`accordion-collapse collapse ${
							isAccordionOpen ? 'show' : ''
						}`}
					>
						<div className="accordion-body">
							<div className="form-check">
								<input
									type="radio"
									className="form-check-input"
									id="greenPoint"
									name="paymentMethod"
									value="greenPoint"
									checked={selectedPayment === 'greenPoint'}
									onChange={handlePaymentChange}
								/>
								<label
									className="form-check-label"
									htmlFor="greenPoint"
								>
									綠點付款
								</label>
							</div>

							<div className="form-check">
								<input
									type="radio"
									className="form-check-input"
									id="bankTransfer"
									name="paymentMethod"
									value="bankTransfer"
									checked={selectedPayment === 'bankTransfer'}
									onChange={handlePaymentChange}
								/>
								<label
									className="form-check-label"
									htmlFor="bankTransfer"
								>
									現金匯款
								</label>
							</div>

							<div className="form-check">
								<input
									type="radio"
									className="form-check-input"
									id="paypal"
									name="paymentMethod"
									value="paypal"
									checked={selectedPayment === 'paypal'}
									onChange={handlePaymentChange}
								/>
								<label
									className="form-check-label"
									htmlFor="paypal"
								>
									PayPal
								</label>
							</div>
							{selectedPayment === 'greenPoint' && (
								<div className="mt-3">
									<strong>綠點付款</strong>
									<p>請使用綠點付款系統進行支付。</p>
								</div>
							)}

							{selectedPayment === 'bankTransfer' && (
								<div className="mt-3">
									<strong>現金匯款</strong>
									<p>請匯款至以下銀行帳號：</p>
									<pre>銀行名稱：ABC 銀行</pre>
									<pre>帳號：123456789</pre>
								</div>
							)}

							{selectedPayment === 'paypal' && (
								<div className="mt-3">
									<strong>PayPal 付款</strong>
									<p>請使用 PayPal 完成付款。</p>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PayMethods;
