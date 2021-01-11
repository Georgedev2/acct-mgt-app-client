import "./transaction-list.css";

const TransactionList = ({ transactionList }) => {
  const checkTransType = (amount) => {
    const newAmount = parseFloat(amount);
    if (newAmount > 0) {
      return "Transferred";
    } else {
      return "Widthdraw";
    }
  };

  return (
    <div>
      {transactionList.length > 0 && (
        <div className="transactions-header">
          Recently Submitted Transactions
        </div>
      )}
      <div data-type="transactions">
        {transactionList.map((trans, i) => {
          return (
            <div className="transaction" key={i}>
              <div>
                <span data-amount="transaction-amount">
                  {" "}
                  <span>{checkTransType(trans.amount)} </span> {trans.amount}
                </span>{" "}
                <span>to</span>{" "}
                <span data-account-id="transaction-account-id">
                  {trans.account_id}'s <br />
                </span>
              </div>

              <div>
                <span>current</span>{" "}
                <span data-account-id="transaction-account-id">
                  {trans.account_id}'s{" "}
                </span>
                <span>Balance is</span>{" "}
                <span data-balance="current-account-balance">
                  {" "}
                  {trans.amount}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TransactionList;
