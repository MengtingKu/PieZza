import PropTypes from 'prop-types';

const FormTextarea = ({ register, id, labelText, placeholder }) => {
    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label">
                {labelText}
            </label>
            <textarea
                {...register(id)}
                className="form-control"
                name={id}
                id={id}
                rows="4"
                placeholder={placeholder}
            ></textarea>
        </div>
    );
};

FormTextarea.propTypes = {
    register: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    labelText: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
};

export default FormTextarea;
