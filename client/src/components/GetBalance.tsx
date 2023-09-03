import { Button, Form, Input, Radio } from "antd";
import { useContext } from "react";
import { toast } from "react-toastify";
import { StoreContext, actions } from "../StoreContext.tsx";
type FieldType = {
  companyname?: string;
  companyid?: string;
  year?: string;
  type?: "xero" | "myob" | "other";
};
const GetBalance = () => {
  const { dispatch } = useContext(StoreContext);
  const fetchBalance = async () => {
    const toastId = toast.loading("Submitting loan request");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/balance`
      );

      if (!response.ok) {
        toast.update(toastId, {
          render:
            "Got bad response from the server. Check error log to troubleshoot.",
          type: "error",
          isLoading: false,
          closeOnClick: true,
        });
        console.error("response not ok", response.status, response.statusText);
        return;
      }
      const { data } = await response.json();
      dispatch({ type: actions.SET_BALANCES, payload: data });
      toast.update(toastId, {
        type: toast.TYPE.SUCCESS,
        isLoading: false,
        closeOnClick: true,
        autoClose: 1000,
      });
    } catch (err) {
      toast.update(toastId, {
        render: "Cannot get balances from server. Is server down?",
        type: "error",
        isLoading: false,
        closeOnClick: true,
        autoClose: 1000,
      });
      console.error(err);
    }
  };
  const onFinish = (values: any) => {
    fetchBalance();
  };

  const onFinishFailed = (errorInfo: any) => {
    const toastId = toast.loading("Submitting loan request");
    toast.update(toastId, {
      render: "Fill the field",
      type: toast.TYPE.ERROR,
      isLoading: false,
      closeOnClick: true,
      autoClose: 1000,
    });
  };
  return (
    <div className="balancePage">
      <h1>Fill company details</h1>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Company Name"
          name="companyname"
          rules={[
            { required: true, message: "Please input your Company Name!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Company ID"
          name="companyid"
          rules={[{ required: true, message: "Please input your Company ID!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Financial Year"
          name="year"
          rules={[
            { required: true, message: "Please input the Financial Year!" },
          ]}
        >
          <Input
            type="number"
            maxLength={4}
            max={new Date().getFullYear()}
            min={2000}
          />
        </Form.Item>

        <Form.Item<FieldType> label="Radio" name="type">
          <Radio.Group defaultValue={"xero"}>
            <Radio value="xero"> Xero </Radio>
            <Radio value="myob"> MYOB </Radio>
            <Radio value="other"> Other </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default GetBalance;
