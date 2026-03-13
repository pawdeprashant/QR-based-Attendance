import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardHome from './DashboardHome';
import QRGenerator from './QRGenerator';
import AttendanceView from './AttendanceView';
import StudentList from './StudentList';

const TeacherDashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardHome />} />
      <Route path="/qr-generate" element={<QRGenerator />} />
      <Route path="/attendance" element={<AttendanceView />} />
      <Route path="/students" element={<StudentList />} />
    </Routes>
  );
};

export default TeacherDashboard; 