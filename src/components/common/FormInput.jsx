import PropTypes from 'prop-types';
import Icon from '@helper/FontAwesomeIcon';

const FormInput = ({
    register,
    errors,
    labelText,
    id,
    type,
    placeholder,
    rules,
    icon = '',
}) => {
    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label">
                <span className="text-danger me-1">*</span> {labelText}{' '}
                <Icon icon={icon} size="xs" />
            </label>
            <input
                {...register(id, rules)}
                id={id}
                type={type}
                className={`form-control ${errors[id] && 'is-invalid'}`}
                placeholder={placeholder}
            />
            {errors[id] && (
                <small className="invalid-feedback text-danger my-2 d-block">
                    {errors?.[id]?.message}
                </small>
            )}
        </div>
    );
};

FormInput.propTypes = {
    register: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    labelText: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    rules: PropTypes.object.isRequired,
    icon: PropTypes.string.isRequired,
};

export default FormInput;
