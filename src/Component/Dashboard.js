import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
// import data from './../db.json';

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

  // const downloadPDF = (user) => {
  //   const doc = new jsPDF();
  //   const columns = Object.keys(user);
  //   const tableData = [Object.values(user)];

  //   doc.autoTable({
  //     head: [columns],
  //     body: tableData
  //   });

  //   doc.save('dashboard.pdf');
  // };
/////////////////////////////
  const downloadPDF = async () => {
    if (userData.length > 0) {
      const doc = new jsPDF();
      const response = await fetch('https://jsonplaceholder.typicode.com/comments');
      const jsonData = await response.json();

      const columns = Object.keys(jsonData[0]);
      const tableData = jsonData.map((item) => Object.values(item));

      doc.autoTable({
        head: [columns],
        body: tableData
      });

      doc.save('dashboard.pdf');
    }
  };

  // const downloadPDF = () => {
  //   const doc = new jsPDF();
  //   const columns = Object.keys(data.job_data[0]);
  //   const tableData = data.job_data.map((item) => Object.values(item));

  //   doc.autoTable({
  //     head: [columns],
  //     body: tableData,
  //   });

  //   doc.save('dashboard.pdf');
  // };

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
              <th >Action</th>
            </tr>
          </thead>
          <tbody>
            {userData.slice(0, currentIndex + 1).map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td className='btn'>
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
