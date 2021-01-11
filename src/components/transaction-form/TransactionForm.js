import "./transaction-form.css";
import useForm from "./useForm";
import TransactionList from "../transaction-list/TransactionList";
import WarningMsg from "./warning-msg/WarningMsg";

function TransactionForm() {
  const {
    handleChange,
    handleSubmit,
    formValues,
    transactionList,
    warningMsg,
  } = useForm();

  return (
    <div>
      <div className="Transaction-form-wrapper">
        <div className="Transaction-form-title">
          <span>Submit New Transaction</span>
        </div>
        <form data-type="transaction-form" onSubmit={handleSubmit}>
          <div className="input-box">
            <label>Account ID :</label>
            <input
              type="text"
              data-type="account-id"
              name="account_id"
              required
              value={formValues.account_id}
              onChange={handleChange}
            />
          </div>
          <div className="input-box">
            <label>Amount :</label>
            <input
              type="text"
              data-type="amount"
              name="amount"
              required
              value={formValues.amount}
              onChange={handleChange}
            />
          </div>
          <button className="submit-btn">Submit</button>
        </form>
        <div>{warningMsg && <WarningMsg />}</div>

        <TransactionList transactionList={transactionList} />
      </div>
    </div>
  );
}

export default TransactionForm;
