import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';

const DialogDelete = ({
    fetchDeleteData,
    children,
    className,
    id = null,
    itemName = '全部資料',
    disabled = false,
}) => {
    const dispatch = useDispatch();
    const handleDelete = () => {
        const title = `你是否要刪除 ${itemName} ? `;

        Swal.fire({
            title,
            text: '刪除後，無法恢復此操作！',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '確定刪除！',
            cancelButtonText: '取消',
        }).then(async result => {
            if (result.isConfirmed) {
                try {
                    await dispatch(fetchDeleteData(id));
                } catch (error) {
                    Swal.fire({
                        title: 'Error!',
                        text: '刪除項目時發生錯誤...請與管理員聯繫',
                        icon: 'error',
                    });
                    throw error;
                }
            }
        });
    };

    return (
        <button
            type="button"
            className={`btn dialog_delete ${className}`}
            onClick={handleDelete}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

DialogDelete.propTypes = {
    fetchDeleteData: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    id: PropTypes.string.isRequired,
    itemName: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
};

export default DialogDelete;
