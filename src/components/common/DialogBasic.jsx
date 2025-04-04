import PropTypes from 'prop-types';
import { Modal } from 'bootstrap';
import { useEffect, useRef } from 'react';

const modalTitles = {
	read: '查看',
	create: '新增',
	edit: '編輯',
	delete: '刪除',
};

const DialogBasic = ({
	modalType = '',
	topic = '商品',
	closeModal,
	handleTarget,
	children,
	showModal,
	className,
	modalTitle,
}) => {
	const modalRef = useRef(null);
	const modalInstance = useRef(null);

	const getModalButtonClass = () => {
		switch (modalType) {
			case 'delete':
				return 'btn btn-danger';
			case 'edit':
				return 'btn btn-warning';
			case 'create':
				return 'btn btn-primary';
			case 'read':
				return 'btn btn-success';
			default:
				return `btn ${className}`;
		}
	};

	useEffect(() => {
		if (!modalInstance.current) {
			modalInstance.current = new Modal(modalRef.current, {
				backdrop: false,
			});
		}
	}, []);

	useEffect(() => {
		if (!modalInstance.current) return;

		if (showModal) {
			modalInstance.current.show();
		} else {
			modalInstance.current.hide();
		}
	}, [showModal]);

	const handleClose = () => {
		if (modalInstance.current) {
			modalInstance.current.hide();
		}

		closeModal();
	};

	const handleSubmit = () => {
		handleTarget();
		handleClose();
	};

	return (
		<div
			ref={modalRef}
			className="modal"
			tabIndex="-1"
			style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
		>
			<div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-xl">
				<div className="modal-content border-0 shadow">
					<div className="modal-header border-bottom">
						<h5 className="modal-title fs-4">
							{modalTitles[modalType]
								? `${modalTitles[modalType]}${topic}`
								: modalTitle}
						</h5>
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
							onClick={handleClose}
						/>
					</div>
					<div className="modal-body p-4">{children}</div>
					<div className="modal-footer border-top">
						<button
							type="button"
							className="btn btn-outline-secondary"
							data-bs-dismiss="modal"
							onClick={closeModal}
						>
							取消
						</button>
						<button
							type="button"
							className={getModalButtonClass()}
							onClick={() => handleSubmit()}
						>
							{modalTitles[modalType]
								? `確認${modalTitles[modalType]}${topic}`
								: modalTitle}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

DialogBasic.propTypes = {
	modalType: PropTypes.string.isRequired,
	topic: PropTypes.string,
	closeModal: PropTypes.func.isRequired,
	handleTarget: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired,
	showModal: PropTypes.bool.isRequired,
	className: PropTypes.string,
	modalTitle: PropTypes.string,
};

export default DialogBasic;
