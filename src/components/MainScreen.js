import React, { useState, useCallback } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const MainScreen = () => {
  const [currentBalance, setCurrentBalance] = useState(0);
  const [depositValue, setDepositValue] = useState(0);
  const [transactionHistoryArray, setTransactionHistoryArray] = useState([]);

  const renderHeader = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <h1>MONEY MANAGEMENT SYSTEM</h1>
      </div>
    );
  };

  const renderCurrentBalanceSection = () => {
    return (
      <div>
        <Card sx={{ maxWidth: 845, backgroundColor: "#CACAFF" }}>
          <CardContent>
            <h1>Current Balance : $ {currentBalance}</h1>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderAtmCardSection = () => {
    return (
      <div>
        <Card sx={{ maxWidth: 845, backgroundColor: "#FFC1C1" }}>
          <CardContent>
            <h1>ATM card</h1>
            {currentBalance < 50 ? (
              <div>Can't withdraw $ 50</div>
            ) : (
              <Button
                variant="contained"
                onClick={() => {
                  setCurrentBalance(currentBalance - 50);
                  addToTransactionHistory("withdraw", 50);
                }}
              >
                Withdraw $ 50
              </Button>
            )}

            {currentBalance < 100 ? (
              <div>Can't withdraw $ 100</div>
            ) : (
              <Button
                style={{marginLeft: 16}}
                variant="contained"
                onClick={() => {
                  setCurrentBalance(currentBalance - 100);
                  addToTransactionHistory("withdraw", 100);
                }}
              >
                Withdraw $ 100
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderMOneyDepositSection = () => {
    return (
      <div>
        <Card sx={{ maxWidth: 845, backgroundColor: "#B5FFB9" }}>
          <CardContent>
            <h1>Deposit</h1>
            <input
              onChange={(e) => setDepositValue(parseInt(e.target.value))}
              style={{ marginRight: "100px" }}
            />
            <Button
              variant="contained"
              onClick={() => {
                setCurrentBalance(currentBalance + depositValue);
                addToTransactionHistory("deposit", depositValue);
              }}
            >
              Deposit
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  };

  const addToTransactionHistory = useCallback(
    (type, amount) => {
      const newTransaction = {
        type: type,
        amount: amount,
        balance: currentBalance,
        timeStamp: new Date().toLocaleString(),
      };

      setTransactionHistoryArray((prevTransactions) => [
        ...prevTransactions,
        newTransaction,
      ]);
    },
    [currentBalance]
  );

  const renderTransactionHistorySection = () => {
    return (
      <div>
        <Card sx={{ maxWidth: 845, backgroundColor: "#F6FFB7" }}>
          <CardContent>
            <h1>Transaction history</h1>
            {transactionHistoryArray.map((transaction, index) => (
              <div
                style={{
                  color: transaction.type === "deposit" ? "green" : "red",
                }}
                key={index}
              >
                Transaction {index + 1}: Type - {transaction.type}, Amount -{" "}
                {transaction.amount}, Time - {transaction.timeStamp}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div>
      <div>{renderHeader()}</div>
      <div style={{ marginLeft: "300px" }}>
        <div>{renderCurrentBalanceSection()}</div>
        <div style={{ marginTop: 100 }}>{renderAtmCardSection()}</div>
        <div style={{ marginTop: 100 }}>{renderMOneyDepositSection()}</div>
        <div style={{ marginTop: 100, paddingBottom: 100 }}>
          {renderTransactionHistorySection()}
        </div>
      </div>
    </div>
  );
};

export default MainScreen;
