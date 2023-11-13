import {Button, Checkbox, Form, InputNumber, message} from "antd";
import {RecaptchaVerifier} from "firebase/auth";
import {auth} from '../../utils/firebase.js'
import {signInWithPhoneNumber} from "firebase/auth";
import {useDispatch} from "react-redux";
import {appActions} from "../../redux/slices/app.js";


const LoginForm = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const handleGenerateRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                console.log(response)
                // ...
            }
        });
    }


    /**
     * @param {{phone: string}} values
     */
    const onSignInSubmit = async (values) => {
        console.log(values)
        const VNPhone = "+84" + values.phone
        //tạo recaptcha
        handleGenerateRecaptcha();
        //gửi otp
        signInWithPhoneNumber(auth, VNPhone, window.recaptchaVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                message.success('SMS sent');
                window.confirmationResult = confirmationResult;
                // chuyên hướng sang trang nhập otp
                dispatch(appActions.setIsSending(true))

            }).catch((error) => {
            console.log(error)
            // Error; SMS not sent
            message.error('SMS not sent');
            // ...
        });
    }


    return (
        <>


            <Form
                name="basic"
                initialValues={{remember: true}}
                onFinish={onSignInSubmit}
                form={form}
            >
                <Form.Item
                    name="phone"
                    rules={[
                        {required: true, message: "Please input your phone number!"},
                    ]}
                >
                    <InputNumber
                        type={`tel`}
                        // onBlur={generateRecaptcha}
                        style={{width: "100%"}}
                        size="large"
                        addonBefore={'+84'}
                        controls
                        placeholder="Phone"/>
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked">
                    <Checkbox>
                        I agree the{" "}
                        <a href="#" className="font-bold text-dark">
                            Terms and Conditions
                        </a>
                    </Checkbox>
                </Form.Item>
                <div id="recaptcha-container"></div>
                <Form.Item>
                    <Button
                        style={{width: "100%"}}
                        type="primary"
                        htmlType="submit"
                    >
                        Gửi OTP
                    </Button>

                </Form.Item>
            </Form>
        </>
    )
}


export default LoginForm