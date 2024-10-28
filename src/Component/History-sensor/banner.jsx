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
      const tableResponse = await getDataHistoryType(1, 1, guid_device, start, end);
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
    <div key={index} className="mb-4 transition-all duration-300 ease-in-out">
      <Card
        Content1={
          <div className="p-3 px-4 bg-white rounded-lg shadow-md border border-gray-200 relative transition-all duration-300 ease-in-out">
            <div className="flex-col">
              <div className="flex items-center justify-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-1">{deviceData.name}</h1>
              </div>
              <p className="flex justify-center font-semibold text-gray-600 text-md ml-2">
                Catatan histori lengkap. tanggal - waktu - status sensor
              </p>
            </div>
            {/* <div className="absolute top-3 right-3 text-sm text-gray-600 bg-gray-100 px-2 py-2 rounded-lg">
              Today ( {new Date().toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })} )
            </div> */}
          </div>
        }
        Content2={
          <div>
            <div className="flex items-center justify-between mb-8 transition-all duration-300 ease-in-out">
              <div className='bg-gray-100 p-3 w-72 rounded-xl flex item-center font-semibold text-xl text-gray-800 mt-1'>
                <ClockCounterClockwise size={27} color="#094462" weight="duotone" className="mr-0.5 mt-0.5 transition-all duration-300 ease-in-out"/>
                Tabel histori
              </div>
              <div>
                <div className="flex">
                    <Calendar size={24} weight="duotone" className="transition-all duration-300 ease-in-out"/>
                    <p className="mb-1 ml-1">Pilih tanggal:</p>
                  </div>
                <button
                  onClick={handleOpenModal}
                  className="px-4 py-1 bg-gray-200 text-sm text-gray-500 border-blue-100 border-[1px] rounded-xl hover:bg-gray-300 transition duration-300 ease-in-out"
                > 
                  {startDate && endDate ? (
                    `${new Date(startDate).toLocaleDateString('id-ID', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })} - ${new Date(endDate).toLocaleDateString('id-ID', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })}`
                  ) : (
                    'pilih...'
                  )}
                </button>
              </div>
            </div>
              <hr className='mb-5 transition-all duration-300 ease-in-out' />
          </div>
        }
        CardContent3={
          <Paper className="overflow-hidden w-full transition-all duration-300 ease-in-out">
            <TableContainer className="max -h-[440px] transition-all duration-300 ease-in-out">
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align="left"
                        className="font-semibold transition-all duration-300 ease-in-out"
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((tableItem, index) => {
                    const formattedDate = new Date(tableItem.datetime).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    });
                    const formattedTime = new Date(tableItem.datetime).toLocaleTimeString("sv-SE", {
                      hour: "2-digit",
                      minute: "2-digit",
                    });
                    const status = tableItem.value === 1 ? "aktif" : "non-aktif";

                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        <TableCell align="left" className="transition-all duration-300 ease-in-out">{formattedDate}</TableCell>
                        <TableCell align="left" className="transition-all duration-300 ease-in-out">{formattedTime}</TableCell>
                        <TableCell align="left" className="transition-all duration-300 ease-in-out">{status}</TableCell>
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
    <div className="bg-gray-100 h-screen p-4 transition-all duration-300 ease-in-out">
      {renderCards}
      <Modal
        isOpen={isModalOpen}
        onClose={ handleCloseModal}
        onDateSelect={(start, end) => handleDateSelection(start, end)}
      />
    </div>
  );
};

export default Banner;