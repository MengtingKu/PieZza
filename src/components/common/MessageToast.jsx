import { useSelector, useDispatch } from 'react-redux';
import { removeMessage } from '@slices/messageSlice';
import Icon from '@helper/FontAwesomeIcon';

const MessageToast = () => {
    const messages = useSelector(state => state.message);
    const dispatch = useDispatch();

    const handleRemoveMessage = id => {
        dispatch(removeMessage(id));
    };

    return (
        <div
            className="toast-container position-fixed"
            style={{ top: '15px', right: '15px' }}
        >
            {messages.map(msg => {
                return (
                    <div
                        key={msg.id}
                        className="toast show"
                        role="alert"
                        aria-live="assertive"
                        aria-atomic="true"
                        data-delay="1000"
                    >
                        <div className={`d-flex text-${msg.type}`}>
                            <div className="toast-body">
                                <Icon icon={msg.icon} className="me-3" />
                                {msg.text}
                            </div>
                            <button
                                type="button"
                                className="btn-close me-2 m-auto"
                                data-bs-dismiss="toast"
                                aria-label="Close"
                                onClick={() => handleRemoveMessage(msg.id)}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default MessageToast;
