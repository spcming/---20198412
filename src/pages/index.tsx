import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.min.css';
import axios from 'axios';

export default function IndexPage() {
  const [url, setUrl] = useState('127.0.0.1');
  const [port, setPort] = useState('37');
  const [result, setResult] = useState('');

  const handleUrl = (value: any) => {
    setUrl(value);
  };

  const handlePort = (value: any) => {
    console.log();
    setPort(value);
  };

  const sendRequest = async () => {
    const { data }: any = await axios.get(
      `http://localhost:3001/?url=${url}&port=${port}`,
    );
    const timeDiff1970And1900 = 2208989143;
    const curTime = moment(
      (parseInt(data) - timeDiff1970And1900) * 1000,
    ).format('YYYY/MM/DD hh:mm:ss');
    setResult(
      `time协议返回值为:${data}, 当前time服务器返回值对应时间为:${curTime}`,
    );
  };
  return (
    <div style={{marginTop:48}}>
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}
        autoComplete="off"
      >
        <Form.Item
          label="url"
          rules={[{ required: true, message: 'Please input your url!' }]}
        >
          <Input
            onChange={(e) => {
              handleUrl(e.target.value);
            }}
            value={url}
            required
          ></Input>
        </Form.Item>

        <Form.Item
          label="post"
          rules={[{ required: true, message: 'Please input your post!' }]}
        >
          <Input
            onChange={(e) => {
              handlePort(e.target.value);
            }}
            value={port}
            required
          ></Input>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 16, offset: 6 }} >
        <Button
            onClick={() => {
              sendRequest();
            }}
          >
            send
          </Button>
        </Form.Item>
        <Form.Item
          label="result"
        >
          <Input.TextArea disabled value={result} />
        </Form.Item>
      </Form>
      {/* <Form style={{ width: '60%', margin: '40px auto' }}>
        <Form.Item label="url">
          <Input
            onChange={(e) => {
              handleUrl(e.target.value);
            }}
            value={url}
            required
          ></Input>
        </Form.Item>
        <Form.Item label="port">
          <Input
            onChange={(e) => {
              handlePort(e.target.value);
            }}
            value={port}
            required
          ></Input>
        </Form.Item>
        <Form.Item>
          <Button
            onClick={() => {
              sendRequest();
            }}
          >
            send
          </Button>
        </Form.Item>
        <Form.Item label="result">
          <Input.TextArea disabled value={result} />
        </Form.Item>
      </Form> */}
    </div>
  );
}
