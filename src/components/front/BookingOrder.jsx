import { useForm } from 'react-hook-form';
import Icon from '@helper/FontAwesomeIcon';
import FormInput from '@components/common/FormInput';
import FormSelect from '@components/common/FormSelect';

const BookingOrder = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = data => {
        console.log(data);
        reset();
    };

    return (
        <div className="container">
            <div className="title_group" style={{ color: '#ffc107' }}>
                <h3 className="title text-center">
                    無論何時，總有一片在等你...
                </h3>
                <h6 className="subtitle text-center">
                    Fresh From PieZzn - Booking Now
                </h6>
            </div>

            <div className="row g-3 mb-3 justify-content-between">
                <div className="col-md-5 mb-5 google_map">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d646.4314777849138!2d133.92497610399946!3d34.6694049573083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3554063805f57057%3A0x8ac788c67d16e8c0!2zMmYsIDItY2jFjW1lLTItMTYgVG9uZGFjaMWNLCBLaXRhIFdhcmQsIE9rYXlhbWEsIDcwMC0wODE25pel5pys!5e0!3m2!1szh-TW!2stw!4v1740663370301!5m2!1szh-TW!2stw"
                        style={{ border: 0 }}
                        height="300px"
                        width="100%"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className=""
                    ></iframe>
                    <p className="my-3 text-dark">
                        <Icon icon="address" className="text-danger" />{' '}
                        岡山県岡山市北区富田町2-2-16 2F
                    </p>
                    <button
                        type="button"
                        className="btn btn-dark rounded-0 py-3 px-5 d-block my-3 call_meBtn"
                    >
                        <Icon icon="phoneRing" />{' '}
                        <span className="ms-2">0911-111111</span>
                    </button>
                </div>
                <div className="col-md-6 order_form">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <fieldset>
                            <FormInput
                                register={register}
                                errors={errors}
                                labelText="姓名"
                                id="name"
                                icon="user"
                                type="text"
                                placeholder="kuku"
                                rules={{
                                    required: '姓名必填 ´・ω・`',
                                }}
                            />
                            <FormInput
                                register={register}
                                errors={errors}
                                labelText="電話"
                                id="tel"
                                icon="phone"
                                type="tel"
                                placeholder="0911111111"
                                rules={{
                                    required: '電話必填 ๑•́ ₃ •̀๑',
                                    pattern: {
                                        value: /^(0[2-8]\d{7}|09\d{8})$/,
                                        message: '電話號碼格式錯誤 ๑•́ ₃ •̀๑',
                                    },
                                }}
                            />
                            <FormInput
                                register={register}
                                errors={errors}
                                labelText="郵件信箱"
                                id="email"
                                icon="email"
                                type="text"
                                placeholder="kuku@example.com"
                                rules={{
                                    required: '郵件信箱必填 *’ｰ’*',
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: '郵件信箱格式錯誤 *’ｰ’*',
                                    },
                                }}
                            />
                            <FormSelect
                                register={register}
                                errors={errors}
                                labelText="人數"
                                id="people"
                                rules={{
                                    required: {
                                        value: true,
                                        message: '人數必填',
                                    },
                                }}
                            >
                                {new Array(10).fill(0).map((_, index) => {
                                    return (
                                        <option value={1} key={index + 1}>
                                            {index + 1}
                                        </option>
                                    );
                                })}
                            </FormSelect>
                            <div className="text-end my-5">
                                <button
                                    type="button"
                                    className="btn btn-outline-warning me-2"
                                    onClick={() => reset()}
                                >
                                    <span className="mx-2">取消</span>
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-warning"
                                >
                                    <span className="mx-2">訂位</span>
                                </button>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingOrder;
