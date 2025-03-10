import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCart } from '@slices/cartSlice';
import { createMessage } from '@helper/stringAndDataHelpers';
import DialogBasic from '@components/common/DialogBasic';
import frontApi from '@api/frontApi';
import Icon from '../../helper/FontAwesomeIcon';

const DialogCouponContent = () => {
    const dispatch = useDispatch();
    const [code, setCode] = useState('');
    const [coupons] = useState(['折價券10元', '折價券20元', '折價券50元']);
    const [selectedCouponIndex, setSelectedCouponIndex] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleInputChange = e => {
        setCode(e.target.value);
    };
    const selectCoupon = async index => {
        if (!disabled) {
            setSelectedCouponIndex(index);
            setDisabled(true);
            await handlePostCoupon();
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handlePostCoupon = async () => {
        if (selectedCouponIndex !== null) {
            const selectedCoupon = coupons[selectedCouponIndex];
            setCode(selectedCoupon);
            try {
                const res = await frontApi.coupon.postCoupon({
                    data: { code: 'testCode' },
                });
                createMessage(dispatch, res.data.success, res.data.message);
                dispatch(getCart());
            } catch (error) {
                createMessage(dispatch, false, error?.response?.data?.message);
            }
        }
        closeModal();
    };

    return (
        <>
            <div className="input-group input-group-sm my-1">
                <input
                    type="text"
                    className="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-sm"
                    value={code}
                    onChange={handleInputChange}
                />
            </div>
            <button
                type="button"
                className="btn btn-link btn-sm text-success text-decoration-none"
                onClick={() => {
                    setShowModal(true);
                    setSelectedCouponIndex(null);
                    setDisabled(false);
                }}
            >
                <Icon icon="handRight" className="fa-bounce" />
                點我抽優惠券
            </button>

            {showModal && (
                <DialogBasic
                    modalTitle="抽獎時刻"
                    closeModal={closeModal}
                    handleTarget={handlePostCoupon}
                    showModal={showModal}
                >
                    <div className="container">
                        <div className="row">
                            {coupons.map((coupon, index) => (
                                <div
                                    className="col-md-4"
                                    key={index}
                                    onClick={() => {
                                        selectCoupon(index);
                                    }}
                                >
                                    <div
                                        className={`card rounder-0 border-0 ${
                                            disabled &&
                                            selectedCouponIndex !== index
                                                ? 'bg-light'
                                                : ''
                                        } ${
                                            selectedCouponIndex === index
                                                ? 'border-success'
                                                : ''
                                        }`}
                                        style={{
                                            cursor: disabled
                                                ? 'not-allowed'
                                                : 'pointer',
                                            transform: disabled
                                                ? 'none'
                                                : 'scale(1.07)',
                                        }}
                                    >
                                        <div className="light"></div>
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                <img
                                                    src="https://i.imgur.com/Fg3i4QW.png"
                                                    className=""
                                                    alt="pizza-coupon"
                                                />
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </DialogBasic>
            )}
        </>
    );
};

export default DialogCouponContent;
