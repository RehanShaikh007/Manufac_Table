import data from "../assets/Manufac _ India Agro Dataset.json";

interface CropData {
  year: number;
  crop: string;
  yield: number;
  cultivationArea: number;
  production: number;
}

interface YearlyData {
  year: number;
  maxCrop: string;
  minCrop: string;
}

interface CropAverageData {
  crop: string;
  avgYield: number;
  avgCultivation: number;
}

const parseData = (data: any[]): CropData[] => {
  return data.map((item) => ({
    year: parseInt(item["Year"].match(/\d{4}/)?.[0] || "0"),
    crop: item["Crop Name"],
    yield:
      parseFloat(item["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"]) || 0,
    cultivationArea:
      parseFloat(item["Area Under Cultivation (UOM:Ha(Hectares))"]) || 0,
    production: parseFloat(item["Crop Production (UOM:t(Tonnes))"]) || 0,
  }));
};

const getYearlyData = (data: CropData[]): YearlyData[] => {
  const yearlyDataMap: Record<
    number,
    {
      maxCrop: string;
      minCrop: string;
      maxProduction: number;
      minProduction: number;
    }
  > = {};

  data.forEach((item) => {
    if (!yearlyDataMap[item.year]) {
      yearlyDataMap[item.year] = {
        maxCrop: item.crop,
        minCrop: item.crop,
        maxProduction: item.production,
        minProduction: item.production,
      };
    } else {
      if (item.production > yearlyDataMap[item.year].maxProduction) {
        yearlyDataMap[item.year].maxProduction = item.production;
        yearlyDataMap[item.year].maxCrop = item.crop;
      }
      if (item.production < yearlyDataMap[item.year].minProduction) {
        yearlyDataMap[item.year].minProduction = item.production;
        yearlyDataMap[item.year].minCrop = item.crop;
      }
    }
  });

  return Object.entries(yearlyDataMap).map(([year, { maxCrop, minCrop }]) => ({
    year: Number(year),
    maxCrop,
    minCrop,
  }));
};

export const getCropAverages = (data: CropData[]): CropAverageData[] => {
  const cropDataMap: Record<
    string,
    { totalYield: number; totalArea: number; count: number }
  > = {};

  data.forEach((item) => {
    if (!cropDataMap[item.crop]) {
      cropDataMap[item.crop] = {
        totalYield: item.yield,
        totalArea: item.cultivationArea,
        count: 1,
      };
    } else {
      cropDataMap[item.crop].totalYield += item.yield;
      cropDataMap[item.crop].totalArea += item.cultivationArea;
      cropDataMap[item.crop].count += 1;
    }
  });

  return Object.entries(cropDataMap).map(
    ([crop, { totalYield, totalArea, count }]) => ({
      crop,
      avgYield: parseFloat((totalYield / count).toFixed(3)),
      avgCultivationArea: parseFloat((totalArea / count).toFixed(3)),
    })
  );
};

const parsedData = parseData(data);
export const yearlyData = getYearlyData(parsedData);
export const cropAverages = getCropAverages(parsedData);
