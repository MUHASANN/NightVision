import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDataHistoryType, getDataDeviceByGuid } from "../../Api/service/service";
import Card from './card';
import { ClockCounterClockwise, Calendar } from "@phosphor-icons/react";
import TablePagination from '@mui/material/TablePagination';
import TableContainer from '@mui/material/TableContainer';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Modal from '../History-Camera/modal';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';

const columns = [
  { id: 'tanggal', label: 'Tanggal', minWidth: 170 },
  { id: 'waktu', label: 'Waktu', minWidth: 100 },
  { id: 'status', label: 'Status', minWidth: 170 },
];

const Banner = () => {
  const { guid_device } = useParams();
  const [deviceData, setDeviceData] = useState({});
  const [historyData, setHistoryData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [formattedDate, setFormattedDate] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);

  const [isModalOpen, setModalOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      try {
        const deviceResponse = await getDataDeviceByGuid(guid_device);
        setDeviceData(deviceResponse.data);

        if (deviceResponse.data.type === "Sensor") {
          await fetchHistoryData("2024-09-01", "2024-09-30");
        }

        const formattedDate = new Date(deviceResponse.data.updatedAt).toLocaleDateString("id-ID", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        setFormattedDate(formattedDate);
      } catch (error) {
        setError("Failed to fetch data.");
      }
    };

    fetchData();
  }, [guid_device]);

  const fetchHistoryData = async (start, end) => {
    try {
      const tableResponse = await getDataHistoryType(1, 10, guid_device, start, end);
      setTableData(Array.isArray(tableResponse.data.data) ? tableResponse.data.data : []);
      
      const historyResponse = await getDataHistoryType(1, 1, guid_device, start, end);
      setHistoryData(Array.isArray(historyResponse.data.data) ? historyResponse.data.data : []);
    } catch (error) {
      setError("Gagal memuat data histori.");
    }
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  
  const handleDateSelection = (start, end) => {
    setStartDate(start);
    setEndDate(end);
    fetchHistoryData(start, end);
    setModalOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const renderCards = historyData.map((item, index) => (
    <div key={index} className="mb-6 transition-all duration-300 ease-in-out">
      <Card
        Content1={
          <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200 relative transition-all duration-300 ease-in-out">
            <div className="text-center mb-2">
              <h1 className="text-2xl font-bold text-gray-900">{deviceData.name}</h1>
              <p className="text-gray-600 text-semibold text-sm">
                Catatan histori lengkap mengenai aktivitas Aktuator
              </p>
            </div>
          </div>
        }
        Content2={
          <div className="flex items-center justify-between mb-6 transition-all duration-300 ease-in-out">
            <div className="flex items-center space-x-2">
              <button
                onClick={handleOpenModal}
                className="flex items-center px-4 py-1 bg-white text-sm text-gray-500 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100"
              >
                <Calendar size={24} weight="duotone" className="mr-1" />
                {startDate && endDate ? (
                  `${new Date(startDate).toLocaleDateString('id-ID')} - ${new Date(endDate).toLocaleDateString('id-ID')}`
                ) : (
                  'pilih tanggal...'
                )}
              </button>
            </div>
            <div className="bg-white p-2 rounded-lg shadow-md flex items-center text-gray-700 text-sm">
              <ClockCounterClockwise size={18} color="#094462" weight="duotone" className="mr-2" />
              <span>
                Today ( {new Date().toLocaleDateString('id-ID')} )
              </span>
            </div>
          </div>
        }        
        CardContent3={
          <Paper className="overflow-hidden w-full transition-all duration-300 ease-in-out">
            <TableContainer className="max-h-[480px]">
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell key={column.id} style={{ fontSize: '15px', fontWeight: 'bold' }}>
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((tableItem, index) => {
                    const formattedDate = new Date(tableItem.datetime).toLocaleDateString("id-ID");
                    const formattedTime = new Date(tableItem.datetime).toLocaleTimeString("sv-SE", {
                      hour: "2-digit",
                      minute: "2-digit",
                    });
                    const status = Number(tableItem.value) === 1 ? "Aktif" : "Non-aktif";
        
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        <TableCell align="left" >{formattedDate}</TableCell>
                        <TableCell align="left" >{formattedTime}</TableCell>
                        <TableCell align="left" >{status}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 20, 50]}
              component="div"
              count={tableData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        }
      />
    </div>
  ));

  return (
    <div className="p-3 transition-all duration-300 ease-in-out">
      {renderCards}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onDateSelect={(start, end) => handleDateSelection(start, end)}
      />
    </div>
  );
};

export default Banner;
