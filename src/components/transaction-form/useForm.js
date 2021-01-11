import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function useForm() {
  const initialState = {
    amount: "",
    account_id: "",
  };

  const [formValues, setFormValues] = useState(initialState);
  const [transactionList, setTransactionList] = useState([]);
  const [warningMsg, setWaringMsg] = useState(false);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const addNewTransaction = async (url, data) => {
    console.log(data);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Transaction-Id": data.id,
      },
      body: JSON.stringify(data),
    });
    console.log(response);
    if (response.status === 200) {
      return true;
    } else {
      console.log("Transaction Was Not Added Succesfully");
    }
  };

  const checkForDuplicateTrans = (transaction) => {
    transactionList.forEach((trans) => {
      const matchingAccId = trans.account_id === transaction.account_id;
      const transTimeDiff = transaction.transTime - trans.transTime;
      console.log(transTimeDiff);
      if (matchingAccId && transTimeDiff <= 5) {
        setWaringMsg(true);
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //create new Transaction with Timestamp
    const newTransWithTimeStamp = {
      id: uuidv4(),
      ...formValues,
      transTime: new Date().getSeconds(),
    };

    //check for duplicate transactions
    if (transactionList.length > 0) {
      checkForDuplicateTrans(newTransWithTimeStamp);
    }

    //create new Transaction without Timestamp
    const newTransWithNoTimeStamp = {
      id: uuidv4(),
      ...formValues,
    };
    // send the Transaction data without Timestamp data to the server
    const url = "http://localhost:12000/amount";
    const sentTransDateToDb = addNewTransaction(url, newTransWithNoTimeStamp);

    // If the Transaction data was sent Succesfully to the server add a new transction
    if (sentTransDateToDb) {
      setTransactionList([newTransWithTimeStamp, ...transactionList]);
      //clear form
      //setFormValues(initialState);
    }
  };
  return {
    handleChange,
    handleSubmit,
    formValues,
    transactionList,
    warningMsg,
  };
}

export default useForm;
