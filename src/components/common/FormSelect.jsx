import PropTypes from 'prop-types';

const FormSelect = ({
    register,
    errors,
    labelText,
    id,
    rules,
    children,
    disabled = false,
}) => {
    return (
        <>
            <label htmlFor="city" className="form-label">
                <span className="text-danger me-1">*</span> {labelText}
            </label>
            <select
                id={id}
                className={`form-select ${errors[id] && 'is-invalid'}`}
                disabled={disabled}
                {...register(id, rules)}
            >
                <option value="">請選擇{labelText}</option>
                {children}
            </select>
            {errors[id] && (
                <div className="invalid-feedback">{errors[id]?.message}</div>
            )}
        </>
    );
};

FormSelect.propTypes = {
    register: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    labelText: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    rules: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
    disabled: PropTypes.bool,
};

export default FormSelect;
