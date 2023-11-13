import {Button, Form} from "antd";
import {InputOTP} from "antd-input-otp";
import {useState} from "react";


const OTPForm = () => {

    const onVerifyOtp = (values) => {


        if (values?.otp.length === 6) {
            const value = values.otp.join('')
            console.log(value)
            // verifu otp
            let confirmationResult = window.confirmationResult;
            confirmationResult.confirm(value).then((result) => {
                // User signed in successfully.
                let user = result.user;
                console.log(user);
                alert('User signed in successfully');

                // ...
            }).catch((error) => {
                // User couldn't sign in (bad verification code?)
                // ...
                alert('User couldn\'t sign in (bad verification code?)');
            });
        }
    }

    return (
        <Form
            name="basic"
            initialValues={{remember: true}}
            onFinish={onVerifyOtp}
            className="row-col"
        >
            <Form.Item
                name="otp"
                className="center-error-message"
                rules={[
                    {required: true, message: "Please input your otp!"},
                ]}
            >
                <InputOTP
                    autoFocus inputType="numeric" length={6}/>
            </Form.Item>
            <div id="recaptcha-container"></div>
            <Form.Item>
                <Button
                    style={{width: "100%"}}
                    type="primary"
                    htmlType="submit"
                >
                    Xác nhận
                </Button>

            </Form.Item>
        </Form>
    )
}

export default OTPForm