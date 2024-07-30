import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";

const Home = () => {
  const [transactionList, setTransactionList] = useState([]);

  const apiUrl = "https://selfless-wholeness-production.up.railway.app/";
  const getdata = async () => {
    try {
      const dataList = await axios.get(apiUrl);
      setTransactionList(dataList.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Office Transactions</th>
            <th></th>
            <th>Credit</th>
            <th>Debit</th>
            <th>Running Balance</th>
          </tr>
        </thead>
        <tbody>
          {transactionList.map((item) => {
            if (item.type === "credit") {
              return (
                <tr>
                  <td>{item.exe_date}</td>
                  <td>{item.description}</td>
                  <td>{item.amount}</td>
                  <td></td>
                  <td>{item.balance}</td>
                </tr>
              );
            }
            return (
              <tr>
                <td>{item.exe_date}</td>
                <td>{item.description}</td>
                <td></td>
                <td>{item.amount}</td>
                <td>{item.balance}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Link className="link-add-transaction" to="/add">
        Add Transaction
      </Link>
    </div>
  );
};

export default Home;
