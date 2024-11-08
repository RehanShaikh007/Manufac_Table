import React from "react";
import { Table } from "@mantine/core";
import "../App.css";

interface YearlyData {
  year: number;
  maxCrop: string;
  minCrop: string;
}

interface CropAverageData {
  crop: string;
  avgYield: number;
  avgCultivationArea: number;
}

interface TableComponentProps {
  yearlyData: YearlyData[];
  cropAverages: CropAverageData[];
}

const TableComponent: React.FC<TableComponentProps> = ({
  yearlyData,
  cropAverages,
}) => {
  return (
    <div className="table-container">
      <div className="table1">
        <h2>Yearly Max/Min Crop Production</h2>
        <Table className="custom-table">
          <thead>
            <tr>
              <th>Year</th>
              <th>Crop with Maximum Production in that Year</th>
              <th>Crop with Minimum Production in that Year</th>
            </tr>
          </thead>
          <tbody>
            {yearlyData.map((item) => (
              <tr key={item.year}>
                <td>{item.year}</td>
                <td>{item.maxCrop}</td>
                <td>{item.minCrop}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div className="table2">
        <h2>Crop Average Yield and Cultivation Area (1950-2020)</h2>
        <Table className="custom-table">
          <thead>
            <tr>
              <th>Crop</th>
              <th>Average Yield of the Crop between 1950-2020</th>
              <th>Average Cultivation Area of the Crop between 1950-2020</th>
            </tr>
          </thead>
          <tbody>
            {cropAverages.map((item) => (
              <tr key={item.crop}>
                <td>{item.crop}</td>
                <td>{item.avgYield}</td>
                <td>{item.avgCultivationArea}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default TableComponent;
