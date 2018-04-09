import React from 'react';
import ReactEmoji from 'react-emoji';
import {Form, Input, Button, message} from 'antd';

const {TextArea} = Input;
const FormItem = Form.Item;

class EmojiDemo extends React.Component {
    defaultProps = {
        text: "foo bar :100: :)"
    }

    constructor() {
        super();
    }

    submit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                message.success(ReactEmoji.emojify(values.comment), 10);
            }
        });
    }

    render() {
        const {getFieldDecorator, getFieldValue} = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 14},
            },
        };
        const commentVal = getFieldValue('comment');

        return (
            <Form onSubmit={this.submit}>
                <FormItem
                    {...formItemLayout}
                    label="意见"
                >
                    <span className="ant-form-text">{commentVal}</span>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                >
                    {getFieldDecorator('comment', {
                        rules: [{
                            required: true, message: '请留下你的意见！',
                        }],
                    })(
                        <TextArea/>
                    )}
                </FormItem>
                <FormItem
                    wrapperCol={{span: 12, offset: 6}}
                >
                    <Button type="primary" htmlType="submit">Submit</Button>
                </FormItem>
            </Form>
        )
        /* return (
             <div>
                 <span>{ReactEmoji.emojify(this.state.comment)}</span>
                 <textarea name="comment" value={this.state.comment} onChange={this.commentChange}></textarea>
                 <button onClick={this.submit}>提交</button>
             </div>
         )*/
    }
}

const WrapperEmojiDemo = Form.create()(EmojiDemo);
export default WrapperEmojiDemo;