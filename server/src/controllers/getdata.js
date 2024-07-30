const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const dbPath = path.join(__dirname, "../db/transactions.db");

let db = null;

const getdata = async (req, res, next) => {
  db = await open({ filename: dbPath, driver: sqlite3.Database });
  try {
    const queryResult = await db.all(
      `select * from offtransaction order by id desc `
    );
    res.send(queryResult);
    console.log("get requeisted");
  } catch (error) {
    res.send(error);
  }
};
const addtransaction = async (req, res, next) => {
  //console.log(req.body);
  const reqData = req.body;

  try {
    db = await open({ filename: dbPath, driver: sqlite3.Database });

    const preQuery = "select * from offtransaction";
    const preQueryRes = await db.all(preQuery);

    const preQueryTwo = await db.all(
      `select * from offtransaction order by  id desc limit 1`
    );

    if (preQueryRes.length === 0 && reqData.amountType === "credit") {
      //console.log("one");
      const query = `insert into offtransaction(type,amount,description,exe_date,balance) 
      values("${reqData.amountType}", ${reqData.amount},"${reqData.desc}","${reqData.currDate}",${reqData.amount})`;
      await db.run(query);
    } else if (reqData.amountType === "credit") {
      //console.log("two");
      const query = `insert into offtransaction(type,amount,description,exe_date,balance) 
      values("${reqData.amountType}", ${reqData.amount},"${reqData.desc}","${reqData.currDate}",${reqData.amount} + ${preQueryTwo[0].balance})`;
      await db.run(query);
    } else if (preQueryTwo[0].balance - reqData.amount >= 1) {
      //console.log("three");
      const query = `insert into offtransaction(type,amount,description,exe_date,balance) 
      values("${reqData.amountType}", ${reqData.amount},"${reqData.desc}","${reqData.currDate}",${preQueryTwo[0].balance}-${reqData.amount})`;
      await db.run(query);
    }

    const resss = await db.all(preQuery);
    console.log(resss.length);
    res.send(resss);
  } catch (err) {
    res.send(err);
  }
  db.close();
};

module.exports = { getdata, addtransaction };
