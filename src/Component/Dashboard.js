import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import 'jspdf-autotable';

const Dashboard = () => {
  const [userData, setUserData] = useState([]);
  const [csvData, setCsvData] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
        fetchData();
        fetchDataa();
    
        const intervalId = setInterval(() => {
          setCurrentIndex((prevIndex) => prevIndex + 1);
        }, 5 * 1000); // 10-second interval
    
        return () => clearInterval(intervalId);
      }, []);
    

  const fetchData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const jsonData = await response.json();
      setUserData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchDataa = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000");
      const data = await response.json();
      const csvData = JSON.stringify(data, null, 2);
      setCsvData(csvData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const downloadCSV = () => {
    const href = `data:text/csv;charset=utf-8,${encodeURIComponent(
      csvData
    )}`;
    const a = document.createElement('a');
    a.href = href;
    a.download = 'filename.csv';
    a.click();
  };

  const formatCSV = (csvData) => {
    const lines = csvData.split('\n');
    const formattedLines = [];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const formattedLine = line.split(',');
      formattedLine = formattedLine.map((cell) => {
        return cell.trim();
      });
      formattedLines.push(formattedLine);
    }
    return formattedLines.join('\n');
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      {userData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userData.slice(0, currentIndex + 1).map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    onClick={() => {
                      downloadCSV();
                    }}
                    className="btn"
                  >
                    download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;



// // Jitnaw office mey hoa tha yay wo code hey.

// import React, { useEffect, useState } from 'react';
// import './Dashboard.css';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';


// const Dashboard = () => {
//   const [userData, setUserData] = useState([]);
//   const [dataInCSV, setDataInCSV] = useState("");
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     fetchData();
//     fetchDataa();

//     const intervalId = setInterval(() => {
//       setCurrentIndex((prevIndex) => prevIndex + 1);
//     }, 5 * 1000); // 10-second interval

//     return () => clearInterval(intervalId);
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await fetch('https://jsonplaceholder.typicode.com/users');
//       const jsonData = await response.json();
//       setUserData(jsonData);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };
//   const fetchDataa = async () => {
//     try {
//       const response = await fetch("http://127.0.0.1:5000");
//       const data = await response.text();
//       setDataInCSV(data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   return (
//     <div className="dashboard">
//       <h1>Dashboard</h1>
//       {userData.length > 0 ? (
//         <table>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Username</th>
//               <th>Email</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {userData.slice(0, currentIndex + 1).map((user, index) => (
//               <tr key={index}>
//                 <td>{user.name}</td>
//                 <td>{user.username}</td>
//                 <td>{user.email}</td>
//                 <td className="btn">
                  
//                   {dataInCSV && (
//                     <a
//                       href={`data:text/csv;charset=utf-8,${encodeURIComponent(dataInCSV)}`}
//                       download="filename.csv"
//                     >
//                       download
//                     </a>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default Dashboard;

////////////////////
// import React, { useEffect, useState } from 'react';
// import './Dashboard.css';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';

// const Dashboard = () => {
//   const [userData, setUserData] = useState([]);
//   const [csvData, setCsvData] = useState("");
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     fetchData();
//     fetchDataa();

//     const intervalId = setInterval(() => {
//       setCurrentIndex((prevIndex) => prevIndex + 1);
//     }, 5 * 1000); // 10-second interval

//     return () => clearInterval(intervalId);
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await fetch('https://jsonplaceholder.typicode.com/users');
//       const jsonData = await response.json();
//       setUserData(jsonData);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };
  //............................................................. koi ek chalao
  // const fetchDataa = async () => {
  //   try {
  //     const response = await fetch("http://127.0.0.1:5000");
  //     const data = await response.text();
  //     setDataInCSV(data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };
  // const downloadCSV = () => {
  //   const href = `data:text/csv;charset=utf-8,${encodeURIComponent(dataInCSV)}`;
  //   const a = document.createElement('a');
  //   a.href = href;
  //   a.download = 'filename.csv';
  //   a.click();
  // };
  
//...................................................
// const fetchDataa = async () => {
//   try {
//     const response = await fetch("http://127.0.0.1:5000");
//     const data = await response.json();
//     const csvData = JSON.stringify(data, null, 2);
//     const formattedData = formatCSV(csvData);
//     csvData = formattedData;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// };

// const downloadCSV = () => {
//   const href = `data:text/csv;charset=utf-8,${encodeURIComponent(
//     csvData
//   )}`;
//   const a = document.createElement('a');
//   a.href = href;
//   a.download = 'filename.csv';
//   a.click();
// };

// const formatCSV = (csvData) => {
//   const lines = csvData.split('\n');
//   const formattedLines = [];
//   for (let i = 0; i < lines.length; i++) {
//     const line = lines[i];
//     const formattedLine = line.split(',');
//     formattedLine = formattedLine.map((cell) => {
//       return cell.trim();
//     });
//     formattedLines.push(formattedLine);
//   }
//   return formattedLines.join('\n');
// };

  //....................................................
//   return (
//     <div className="dashboard">
//       <h1>Dashboard</h1>
//       {userData.length > 0 ? (
//         <table>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Username</th>
//               <th>Email</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {userData.slice(0, currentIndex + 1).map((user, index) => (
//               <tr key={index}>
//                 <td>{user.name}</td>
//                 <td>{user.username}</td>
//                 <td>{user.email}</td>
//                 <td>
//                   <button
//                     onClick={() => {
//                       downloadCSV();
//                     }}
//                     className="btn"
//                   >
//                     download
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };


// export default Dashboard;
