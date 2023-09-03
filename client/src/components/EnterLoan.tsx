import { Button, Form, Input, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useContext } from "react";
import { toast } from "react-toastify";
import { StoreContext } from "../StoreContext.tsx";

type RequestLoanDto = {
  balanceSheet: any[];
  loanAmount: number;
};

const EnterLoan = () => {
  const { state } = useContext(StoreContext);
  const requestLoan = async (amount: string) => {
    const isValid = /\d+/.test(amount);
    if (!isValid) {
      toast(`Only numbers allowed. Your input: ${amount}`, { type: "warning" });
      return;
    }

    const payload: RequestLoanDto = {
      loanAmount: Number(amount),
      balanceSheet: state.balances,
    };

    const toastId = toast.loading("Submitting loan request");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/loan_request`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) {
        toast.update(toastId, {
          render:
            "Got bad response from the server. Check error log to troubleshoot.",
          type: "error",
          isLoading: false,
          closeOnClick: true,
          autoClose: 1000,
        });
        console.error("response not ok:", response.status, response.statusText);
        return;
      }

      const { answer, assessment } = await response.json();
      const msg = `The decision is: answer: ${answer}, assessment score: ${assessment}`;
      toast.update(toastId, {
        render: msg,
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
  const onAmountFinish = (values: AmountFieldType) => {
    requestLoan(values.amount as string);
  };
  const onAmountFinishFailed = (errorInfo: any) => {
    const toastId = toast.loading("Submitting loan request");
    toast.update(toastId, {
      render: "Fill all the fields",
      type: toast.TYPE.ERROR,
      isLoading: false,
      closeOnClick: true,
    });
  };
  type AmountFieldType = {
    amount?: string;
  };

  interface TableDataType {
    year: number;
    month: number;
    profitOrLoss: number;
    assetsValue: number;
  }

  const columns: ColumnsType<TableDataType> = [
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      render: (year) => <div style={{ color: "blue" }}>{year}</div>,
    },
    {
      title: "Month",
      dataIndex: "month",
      key: "month",
      render: (month) => <div>{month}</div>,
    },
    {
      title: "Profit Or Loss",
      dataIndex: "profitOrLoss",
      key: "profitOrLoss",
      render: (_, { profitOrLoss }) => {
        return profitOrLoss < 0 ? (
          <div style={{ color: "red" }}>{profitOrLoss}</div>
        ) : (
          <div style={{ color: "green" }}>{profitOrLoss}</div>
        );
      },
    },
    {
      title: "Assets Value",
      dataIndex: "assetsValue",
      key: "assetsValue",
      render: (assetsValue) => <div>{assetsValue}</div>,
    },
  ];

  const data: TableDataType[] = [
    {
      year: 2020,
      month: 12,
      profitOrLoss: 250000,
      assetsValue: 1234,
    },
    {
      year: 2021,
      month: 11,
      profitOrLoss: 1150,
      assetsValue: 5789,
    },
    {
      year: 2022,
      month: 10,
      profitOrLoss: 2500,
      assetsValue: 22345,
    },
    {
      year: 2023,
      month: 9,
      profitOrLoss: -187000,
      assetsValue: 223452,
    },
  ];
  return (
    <div className="balancePage">
      <h1 className={"animate__animated animate__rubberBand"}>Balance</h1>
      <div className={"animate__animated animate__fadeInUp"}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onAmountFinish}
          onFinishFailed={onAmountFinishFailed}
          autoComplete="off"
        >
          <Form.Item<AmountFieldType>
            label="Loan Amount"
            name="amount"
            rules={[{ required: true, message: "Please input loan amount!" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>

        <div>
          <Table columns={columns} dataSource={data} />
        </div>
      </div>
    </div>
  );
};

export default EnterLoan;
