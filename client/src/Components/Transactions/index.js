import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./index.css";
import { useState } from "react";
const Transactions = (props) => {
  const navigate = useNavigate();

  const [amountType, setAmountType] = useState("debit");
  const [amountValue, setAmountValue] = useState(0);
  const [desc, setDesc] = useState();
  const [errorMesg, setErrorMesg] = useState("");

  const onSuccess = async () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const currDate = `${day}/${month}/${year}`;

    const data = {
      amountType,
      amount: parseInt(amountValue),
      desc,
      currDate,
    };

    console.log(data);
    try {
      const response = await axios.post(
        "https://selfless-wholeness-production.up.railway.app/add",
        data
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    setAmountType(amountType);
    setAmountValue("");
    setDesc("");
    navigate("/", { replace: true });
  };

  const save = (event) => {
    event.preventDefault();
    if (amountType === undefined || amountValue === "" || desc === undefined) {
      setErrorMesg("**Some Fields are missing");
    } else {
      setErrorMesg("");
      onSuccess();
    }
  };

  const cancel = () => {
    navigate("/", { replace: true });
  };

  const selectAmountType = (event) => setAmountType(event.target.value);

  const onAmountChange = (event) => setAmountValue(event.target.value);

  const onDescChange = (event) => setDesc(event.target.value);

  return (
    <div className="main-container">
      <form>
        <h1>Transaction</h1>
        <div className="trns-type-container">
          <label htmlFor="transaction-type">Transaction Type</label>
          <select
            onChange={selectAmountType}
            value={amountType}
            id="transaction-type"
          >
            <option value="debit" selected>
              Debit
            </option>
            <option value="credit">Credit</option>
          </select>
        </div>

        <div className="amount-container">
          <label htmlFor="amount">Amout</label>
          <input
            onChange={onAmountChange}
            value={amountValue}
            className="amount-input"
            type="number"
            id="amount"
          />
        </div>

        <div className="description-container">
          <label htmlFor="description">Description</label>
          <textarea onChange={onDescChange} value={desc} id="description" />
        </div>

        <div className="button-container">
          <button onClick={save} type="submit">
            Save
          </button>
          <button onClick={cancel} type="button">
            Cancel
          </button>
        </div>
        <p className="error-mesg">{errorMesg}</p>
      </form>
    </div>
  );
};

export default Transactions;
