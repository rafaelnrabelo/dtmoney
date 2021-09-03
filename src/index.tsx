import React from "react";
import ReactDOM from "react-dom";
import { createServer, Model } from "miragejs";
import { App } from "./App";

createServer({
  models: {
    transaction: Model,
  },
  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: "Desenvolvimento de website",
          amount: 12000,
          type: "deposit",
          category: "Desenvolvimento",
          createdAt: new Date(2021, 7, 26, 10, 22, 0),
        },
        {
          id: 2,
          title: "Aluguel",
          amount: 1000,
          type: "withdraw",
          category: "Casa",
          createdAt: new Date(2021, 8, 1, 10, 22, 0),
        },
      ],
    });
  },
  routes() {
    this.namespace = "api";

    this.get("/transactions", () => {
      return this.schema.all("transaction");
    });

    this.post("/transactions", (schema, req) => {
      const data = JSON.parse(req.requestBody);
      return schema.create("transaction", {
        ...data,
        createdAt: new Date(),
      });
    });
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
