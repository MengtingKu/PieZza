import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DialogCouponContent = ({
    modalType,
    templateData,
    handleModalInputChange,
    handleDatePickerChange,
}) => {
    if (modalType === 'delete') {
        return (
            <>
                你是否要刪除
                <span className="text-danger fw-bold ms-3">
                    {templateData.title}
                </span>
            </>
        );
    }

    if (modalType === 'read') {
        return (
            <>
                <div className="card mb-3 border-0">
                    {[
                        { key: 'title', label: '活動名稱' },
                        { key: 'percent', label: '折扣' },
                        { key: 'code', label: '優惠碼' },
                        { key: 'due_date', label: '到期日期' },
                        { key: 'is_enabled', label: '停啟用' },
                    ].map(item => {
                        return (
                            <div className="d-flex mb-3" key={item.key}>
                                <span
                                    className="d-block"
                                    style={{ width: '25%' }}
                                >
                                    {item.label}
                                </span>
                                <span
                                    className="d-block"
                                    style={{ width: '75%' }}
                                >
                                    {item.key === 'due_date' ? (
                                        <span
                                            className={`${
                                                dayjs(
                                                    templateData.due_date
                                                ).format('YYYY-MM-DD') ===
                                                dayjs().format('YYYY-MM-DD')
                                                    ? 'text-danger'
                                                    : ''
                                            }`}
                                        >
                                            {dayjs(
                                                templateData.due_date
                                            ).format('YYYY-MM-DD')}
                                        </span>
                                    ) : (
                                        templateData[item.key]
                                    )}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </>
        );
    }

    return (
        <div className="container">
            <div className="mb-3">
                <label htmlFor="title" className="form-label">
                    活動名稱
                </label>
                <input
                    name="title"
                    id="title"
                    type="text"
                    className="form-control"
                    placeholder="請輸入活動名稱"
                    defaultValue={templateData.title}
                    onChange={handleModalInputChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="percent" className="form-label">
                    折扣 (%)
                </label>
                <input
                    name="percent"
                    id="percent"
                    type="number"
                    className="form-control"
                    placeholder="請輸入折扣"
                    defaultValue={templateData.percent}
                    onChange={handleModalInputChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="code" className="form-label">
                    優惠碼設定
                </label>
                <input
                    name="code"
                    id="code"
                    type="text"
                    className="form-control"
                    placeholder="請設定優惠碼"
                    defaultValue={templateData.code}
                    onChange={handleModalInputChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="code" className="me-2">
                    到期日期
                </label>
                <DatePicker
                    selected={templateData.due_date}
                    onChange={date => handleDatePickerChange(date)}
                    dateFormat="yyyy-MM-dd"
                />
            </div>
            <div className="form-check">
                <input
                    name="is_enabled"
                    type="checkbox"
                    className="form-check-input"
                    id="is_enabled"
                    defaultChecked={templateData.is_enabled}
                    onChange={handleModalInputChange}
                />
                <label className="form-check-label" htmlFor="is_enabled">
                    是否啟用
                </label>
            </div>
        </div>
    );
};

DialogCouponContent.propTypes = {
    modalType: PropTypes.string.isRequired,
    templateData: PropTypes.object.isRequired,
    handleModalInputChange: PropTypes.func.isRequired,
    handleDatePickerChange: PropTypes.func.isRequired,
};

export default DialogCouponContent;
