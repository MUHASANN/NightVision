import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDataHistoryType, getDataDeviceByGuid } from "../../Api/service/service";
import { FcElectricalSensor } from "react-icons/fc";
import { MdOutlineSensors } from "react-icons/md";
import Card from './card';
import TablePagination from '@mui/material/TablePagination';
import TableContainer from '@mui/material/TableContainer';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Modal from '../History-perangkat/modal';
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
  const [tabel, setTabel] = useState([]);
  const [formattedDate, setFormattedDate] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const [isModalOpen, setModalOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const deviceResponse = await getDataDeviceByGuid(guid_device);
        const deviceData = deviceResponse.data;
        setDeviceData(deviceData);

        if (deviceData.type === "Aktuator") {
          let tabelResponse = await getDataHistoryType(1, 20, guid_device);
          setTabel(Array.isArray(tabelResponse.data.data) ? tabelResponse.data.data : []);

          let historyResponse = await getDataHistoryType(1, 1, guid_device);
          setHistoryData(Array.isArray(historyResponse.data.data) ? historyResponse.data.data : []);
        }

        const formattedDate = new Date(deviceData.updatedAt).toLocaleDateString("id-ID", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        setFormattedDate(formattedDate);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [guid_device]);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  const handleDateSelection = (start, end) => {
    setStartDate(start);
    setEndDate(end);
    setModalOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const renderCards = historyData.map((index) => (
    <div key={index} className="mb-4">
      <Card
        Content1={
          <div className="p-3 px-4 bg-white rounded-lg shadow-sm border border-gray-200 relative">
            <div className="flex flex-col">
              <div className="flex items-center mb-1">
                <FcElectricalSensor className="text-gray-700 text-5xl mr-2" />
                <h1 className="text-3xl font-bold text-gray-900">Histori {deviceData.name}</h1>
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
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">{deviceData.name}</h1>
                  <p className="text-gray-500 text-sm">{guid_device} | Tanggal {formattedDate}</p>
                </div>
              </div>
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
                  {tabel.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((tabel, index) => {
                    const formattedDate = new Date(tabel.datetime).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    });
                    const formattedTime = new Date(tabel.datetime).toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                    });
                    const status = tabel.value === 1 ? "aktif" : "non-aktif";

                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        <TableCell align="left">{formattedDate}</TableCell>
                        <TableCell align="left">{formattedTime}</TableCell>
                        <TableCell align="left">{status}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 20, 50]}
              component="div"
              count={tabel.length}
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
    <div>
      {renderCards}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onDateSelect={handleDateSelection}
      />
    </div>
  );
};

export default Banner;
