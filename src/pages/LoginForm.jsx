import axios from 'axios';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import FormInput from '@components/common/FormInput';

const { VITE_BASE_URL: baseURL } = import.meta.env;

const LoginForm = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async data => {
        const { email: username, password } = data;
        try {
            const res = await axios.post(`${baseURL}/admin/signin`, {
                username,
                password,
            });
            const { expired, token } = res.data;
            document.cookie = `reactToken=${token}; expires=${new Date(
                expired
            )}`;
            navigate('/admin');
            reset();
        } catch (error) {
            // Todo... 吐司訊息串接 api 回傳結果
            console.log(error);
        }
    };

    useEffect(() => {
        if (localStorage.getItem('isLoggedIn') === 'true') {
            navigate('/admin');
        }
    }, [navigate]);

    return (
        <>
            <div className="login_form">
                <div className="login">
                    <form onSubmit={handleSubmit(onSubmit)} className="form">
                        <h2 className="login_title">後台管理者登入系統</h2>
                        <FormInput
                            register={register}
                            errors={errors}
                            labelText="帳號 UserName"
                            id="email"
                            icon="email"
                            type="email"
                            placeholder="kuku@example.com"
                            rules={{
                                required: '郵件信箱必填 *’ｰ’*',
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: '郵件信箱格式錯誤 *’ｰ’*',
                                },
                            }}
                        />
                        <FormInput
                            register={register}
                            errors={errors}
                            labelText="密碼 Password"
                            id="password"
                            icon="regularUser"
                            type="password"
                            placeholder="kuku"
                            rules={{
                                required: '密碼不能留空白 ´・ω・`',
                                minLength: {
                                    value: 6,
                                    message: '密碼長度至少為 6 個字元',
                                },
                            }}
                        />

                        <div className="d-flex justify-content-between mt-3">
                            <button
                                type="submit"
                                className="btn btn-primary btn-sm"
                            >
                                登入
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary btn-sm"
                                onClick={() => reset()}
                            >
                                取消
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default LoginForm;
