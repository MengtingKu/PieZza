import PropTypes from 'prop-types';

const FormCheckboxRadio = ({
    register,
    errors,
    type,
    name,
    id,
    value,
    rules,
    labelText,
}) => {
    return (
        <div className="form-check">
            <input
                className={`form-check-input ${errors[name] && 'is-invalid'}`}
                type={type}
                name={name}
                id={id}
                value={value}
                {...register(name, rules)}
            />
            <label className="form-check-label" htmlFor={id}>
                {labelText}
            </label>
            {errors[name] && (
                <div className="invalid-feedback">{errors[name]?.message}</div>
            )}
        </div>
    );
};

FormCheckboxRadio.propTypes = {
    register: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    value: PropTypes.bool.isRequired,
    rules: PropTypes.object.isRequired,
    labelText: PropTypes.string.isRequired,
};

export default FormCheckboxRadio;
