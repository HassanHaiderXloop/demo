// import React, { useEffect, useState } from 'react';
// import './Dashboard.css';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';

// const Dashboard = () => {
//   const [userData, setUserData] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     fetchData();

//     const intervalId = setInterval(() => {
//       setCurrentIndex((prevIndex) => prevIndex + 1);
//     }, 2 * 1000); // 10-second interval

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


//   const downloadPDF = async () => {
//     if (userData.length > 0) {
//       const doc = new jsPDF();
//       const response = await fetch('http://192.168.4.252:5000/');
//       const jsonData = await response.json();

//       const columns = Object.keys(jsonData[0]);
//       const tableData = jsonData.map((item) => Object.values(item));

//       doc.autoTable({
//         head: [columns],
//         body: tableData
//       });

//       doc.save('dashboard.pdf');
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
//               <th >Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {userData.slice(0, currentIndex + 1).map((user, index) => (
//               <tr key={index}>
//                 <td>{user.name}</td>
//                 <td>{user.username}</td>
//                 <td>{user.email}</td>
//                 <td className='btn'>
//                   <button onClick={() => downloadPDF(user)}>Download</button>
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
 

///////////////////////////////////////////////////////////////////

// Jitnaw office mey hoa tha yay wo code hey.

import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


const Dashboard = () => {
  const [userData, setUserData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 2 * 1000); // 10-second interval

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


  const downloadPDF = async (user) => {
    if (userData.length > 0) {
      const doc = new jsPDF();
  
      try {
        const response = await fetch('http://172.190.91.62:5000/');
        const textData = await response.text();
  
        if (textData) {
          let jsonDataa = JSON.parse(textData);
          const jsonData = jsonDataa.job_data;
  
          if (Array.isArray(jsonData) && jsonData.length > 0) {
            const columns = Object.keys(jsonData[0]);
            const tableData = jsonData.map((item) => Object.values(item));
  
            doc.autoTable({
              head: [columns],
              body: tableData,
            });
  
            doc.save('dashboard.pdf');
          } else {
            console.error('Invalid data from API');
          }
        } else {
          console.error('Empty response from API');
        }
      } catch (error) {
        console.error('Error fetching PDF data:', error);
      }
    }
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
                <td className="btn">
                  <button onClick={() => downloadPDF(user)}>Download</button>
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


////////

// FOR THE CSV


// import React, { useState } from 'react';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';

// const Dashboard = ({ userData }) => {
//   const downloadCSV = async (user) => {
//     if (userData && userData.length > 0) {
//       try {
//         const response = await fetch('http://192.168.4.252:5000/');
//         const jsonData = await response.json();

//         if (Array.isArray(jsonData) && jsonData.length > 0) {
//           const csvData = convertJSONtoCSV(jsonData);

//           // Download the CSV file
//           const blob = new Blob([csvData], { type: 'text/csv' });
//           const url = URL.createObjectURL(blob);
//           const link = document.createElement('a');
//           link.href = url;
//           link.setAttribute('download', 'data.csv');
//           document.body.appendChild(link);
//           link.click();
//         } else {
//           console.error('Invalid data from API');
//         }
//       } catch (error) {
//         console.error('Error fetching JSON data:', error);
//       }
//     }
//   };

//   const convertJSONtoCSV = (jsonData) => {
//     const columns = Object.keys(jsonData[0]);
//     const csvRows = [];
//     csvRows.push(columns.join(','));

//     for (const item of jsonData) {
//       const values = columns.map((column) => item[column]);
//       csvRows.push(values.join(','));
//     }

//     return csvRows.join('\n');
//   };

//   return (
//     <div className="dashboard">
//       <h1>Dashboard</h1>
//       {userData && userData.length > 0 ? (
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
//             {userData.map((user, index) => (
//               <tr key={index}>
//                 <td>{user.name}</td>
//                 <td>{user.username}</td>
//                 <td>{user.email}</td>
//                 <td className="btn">
//                   <button onClick={() => downloadCSV(user)}>Download</button>
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
