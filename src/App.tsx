import React from "react";
import TableComponent from "./components/table";
import { cropAverages, yearlyData } from "./utils/data";

const App: React.FC = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Agriculture Data Analytics</h1>
      <TableComponent yearlyData={yearlyData} cropAverages={cropAverages} />
    </div>
  );
};

export default App;
