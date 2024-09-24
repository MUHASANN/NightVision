import React, { useState } from 'react';
import { MdOutlineSensors } from "react-icons/md";
import { GiMovementSensor } from "react-icons/gi";
import Card from './card';
import 'react-datepicker/dist/react-datepicker.css';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Modal from '../History-perangkat/modal';

const columns = [
  { id: 'tanggal', label: 'Tanggal', minWidth: 170 },
  { id: 'waktu', label: 'Waktu', minWidth: 100 },
  { id: 'status', label: 'Status', minWidth: 170 },
];

const rows = [
  { tanggal: '2024-09-01', waktu: '12:00', status: 'Aktif' },
  { tanggal: '2024-09-02', waktu: '13:00', status: 'Non-Aktif' },
  { tanggal: '2024-09-03', waktu: '14:00', status: 'Aktif' },
  { tanggal: '2024-09-04', waktu: '15:00', status: 'Aktif' },
  { tanggal: '2024-09-05', waktu: '16:00', status: 'Non-Aktif' },
  { tanggal: '2024-09-06', waktu: '17:00', status: 'Aktif' },
  { tanggal: '2024-09-07', waktu: '18:00', status: 'Aktif' },
  { tanggal: '2024-09-08', waktu: '19:00', status: 'Non-Aktif' },
  { tanggal: '2024-09-09', waktu: '20:00', status: 'Aktif' },
  { tanggal: '2024-09-10', waktu: '21:00', status: 'Non-Aktif' },
];

const Banner = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isModalOpen, setModalOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleDateSelection = (start, end) => {
    setStartDate(start);
    setEndDate(end);
    setModalOpen(false); // Close modal after selecting dates
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <Card
        Content1={
          <div className="p-3 px-4 bg-white rounded-lg shadow-sm border border-gray-200 relative">
            <div className="flex flex-col">
              <div className="flex items-center mb-1">
                <GiMovementSensor className="text-gray-700 text-5xl mr-2" />
                <h1 className="text-3xl font-bold text-gray-900">Histori Sensor</h1>
              </div>
              <p className="text-gray-600 text-md ml-2">
                Data & Status catatan lengkap dan real-time mengenai aktivitas sensor
              </p>
            </div>
            <div className="absolute top-3 right-3 text-sm text-gray-600 bg-gray-100 px-2 py-2 rounded-lg">
              Today ( {new Date().toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric', 
              })} )
            </div>
          </div>
        }      
        Content2={
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <MdOutlineSensors className="text-blue-500 text-6xl mr-2" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">Sensor 1</h1>
                  <p className="text-gray-500 text-sm">Perangkat</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div>
                  <button
                    onClick={handleOpenModal}
                    className="px-4 py-1 bg-purple-200 text-sm text-purple-500 border-blue-100 border-[1px] rounded-xl hover:bg-purple-300 transition duration-300"
                  >
                    Pilih Tanggal
                  </button>
                  <div className="absolute right-11 text-sm text-gray-400 mt-2">
                    {startDate && endDate ? (
                      `Tanggal | ${new Date(startDate).toLocaleDateString('id-ID', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })} - ${new Date(endDate).toLocaleDateString('id-ID', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })}`
                    ) : (
                      'Tanggal | None'
                    )}
                  </div>
                </div>
              </div>
            </div>
            <hr className="mb-10" />
          </div>
        }      
        CardContent3={
          <Paper className="overflow-hidden w-full">
            <TableContainer className="max-h-[440px]">
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align="left"
                        className="font-semibold"
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.tanggal}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align="left">
                              {value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        }
      />
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onDateSelect={handleDateSelection}
      />
    </div>
  );
};

export default Banner;
