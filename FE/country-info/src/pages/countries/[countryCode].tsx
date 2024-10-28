import React, { useEffect, useState } from "react";
import "@/app/globals.css";
import { useRouter } from "next/router";
import Link from "next/link";
import { fetchCountryInfo } from "@/services/countryService";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { FaSpinner } from "react-icons/fa"; 

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CountryDetail: React.FC = () => {
  const router = useRouter();
  const { countryCode } = router.query;
  const [countryDetails, setCountryDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false); 

  useEffect(() => {
    const getCountryDetails = async () => {
      if (countryCode) {
        setLoading(true); 
        try {
          const details = await fetchCountryInfo(countryCode as string);
          console.log("Country Details:", details); 
          setCountryDetails(details);
        } catch (error) {
          console.error(`Error fetching country info for ${countryCode}:`, error);
        } finally {
          setLoading(false); 
        }
      }
    };

    getCountryDetails();
  }, [countryCode]);


  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <FaSpinner className="animate-spin text-4xl text-blue-600" />
        <p className="ml-4 text-lg text-gray-600">Loading country...</p> 
      </div>
    );
  }


  if (!countryDetails) {
    return (
      <div className="flex items-center justify-center h-screen">
        <FaSpinner className="animate-spin text-4xl text-blue-600" />
      </div>
    );
  }


  const populationData = {
    labels: countryDetails.populationData.map((data: { year: number }) => data.year),
    datasets: [
      {
        label: "Population Over Time",
        data: countryDetails.populationData.map((data: { value: number }) => data.value),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" as const },
      title: { display: true, text: `Population of ${countryDetails.commonName}` },
    },
    scales: {
      x: { title: { display: true, text: "Year" } },
      y: { title: { display: true, text: "Population" } },
    },
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-md max-w-2xl mx-auto mt-12">
      <h1 className="text-5xl font-bold mb-6 text-center text-blue-800">
        {countryDetails.commonName || "No common name available"}
      </h1>
      {countryDetails.flagUrl ? (
        <img
          src={countryDetails.flagUrl}
          alt={`Flag of ${countryDetails.commonName || "Unknown Country"}`}
          className="w-48 h-auto mx-auto mb-8 border border-gray-300 rounded-lg shadow-sm"
        />
      ) : (
        <div className="flex justify-center items-center mb-8">
          <span className="text-6xl text-gray-400">❓</span> 
        </div>
      )}

      <div className="space-y-4 text-xl">
        <p className="text-gray-800">
          <span className="font-semibold">Official Name:</span> {countryDetails.officialName}
        </p>
        <p className="text-gray-800">
          <span className="font-semibold">Region:</span> {countryDetails.region}
        </p>
        <p className="text-gray-800">
          <span className="font-semibold">Borders:</span>{" "}
          {Array.isArray(countryDetails.borders) && countryDetails.borders.length > 0 ? (
            <div className="flex flex-wrap gap-3 mt-3">
              {countryDetails.borders.map((border: { countryCode: string; commonName: string }) => (
                <Link
                  key={border.countryCode}
                  href={`/countries/${border.countryCode}`}
                  className="text-blue-700 hover:underline bg-blue-100 px-3 py-1 rounded-lg shadow-sm"
                >
                  {border.commonName || "No name available"}
                </Link>
              ))}
            </div>
          ) : (
            "No borders available"
          )}
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">Population Over Time</h2>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          {countryDetails.populationData && countryDetails.populationData.length > 0 ? (
            <Line data={populationData} options={options} />
          ) : (
            <p className="text-center text-gray-600">No population data available.</p> 
          )}
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;
