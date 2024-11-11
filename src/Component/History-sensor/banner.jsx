import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDataHistoryType, getDataDeviceByGuid } from "../../Api/service/service";
import Card from './card';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Modal from '../History-Camera/modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const columns = [
  { id: 'tanggal', label: 'Tanggal & Waktu', minWidth: 170 },
  { id: 'status', label: 'Status', minWidth: 170 },
];

const Banner = () => {
  const { guid_device } = useParams();
  const [deviceData, setDeviceData] = useState({});
  const [tableData, setTableData] = useState([]);
  const [formattedDate, setFormattedDate] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDeviceData = async () => {
      try {
        const deviceResponse = await getDataDeviceByGuid(guid_device);
        setDeviceData(deviceResponse.data);

        setFormattedDate(new Date(deviceResponse.data.updatedAt).toLocaleDateString("id-ID", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }));
        if (deviceResponse.data.type === "Sensor") {
          await fetchHistoryData(startDate || "2024-09-01", endDate || "2024-09-30");
        }
      } catch (error) {
        setError("Failed to fetch device data.");
      }
    };
    fetchDeviceData();
  }, [guid_device, startDate, endDate]);

  const fetchHistoryData = async (start, end) => {
    try {
      const tableResponse = await getDataHistoryType(1, rowsPerPage, guid_device, start, end);
      setTableData(Array.isArray(tableResponse.data.data) ? tableResponse.data.data : []);
    } catch (error) {
      setError("Failed to fetch history data.");
    }
  };

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  
  const handleDateSelection = (start, end) => {
    setStartDate(start);
    setEndDate(end);
    handleCloseModal();
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="bg-slate-100 min-h-screen w-full p-8">
      <div className="flex items-center mb-6">
        <a href="#" className="text-gray-600 hover:text-gray-800">
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2 mt-2" />
        </a>
        <h1 className="text-2xl font-semibold text-gray-900">Sensor History</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-sm transition-all">
        <Card
          Content1={
            <div className="mb-4 flex justify-between">
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{deviceData.name}</h1>
                <p className="text-gray-500 text-sm">View device activity records.</p>
              </div>
              <button
                onClick={handleOpenModal}
                className="mt-4 inline-flex items-center bg-gray-600 text-white text-sm font-medium px-4 py-2 rounded-lg shadow hover:bg-gray-700 transition"
              >
                Filter Tanggal
              </button>
            </div>
          }
         CardContent3={
          <div className="overflow-hidden rounded-lg border border-gray-200 transition-all">
            <table className="min-w-full bg-white rounded-lg shadow-md">
              <thead>
                <tr className="border-b text-gray-900 text-left text-sm">
                  {columns.map((column) => (
                    <th key={column.id} className="py-3 px-6 font-medium">
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((tableItem, index) => {
                  const status = Number(tableItem.value) === 1 ? "On" : "Off";
                  const waktu = tableItem.datetime;
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={index}
                      className="transition duration-300 ease-in-out hover:bg-gray-100"
                    >
                      <TableCell align="left" className="py-3 px-6">
                        {waktu}
                      </TableCell>
                      <TableCell align="left" className="py-3 px-6">
                      <span
                        className={`px-3 py-1 ${status === "On" ? "text-blue-500" : "text-red-500"}`}
                      >
                        {status}
                      </span>
                    </TableCell>
                    </TableRow>
                  );
                })}
              </tbody>
            </table>
          </div>
        }
        />
        <div className="p-2 mr-4 flex justify-end transition-all">
          <TablePagination
            rowsPerPageOptions={[10, 20, 50]}
            component="div"
            count={tableData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onDateSelect={handleDateSelection}
      />

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default Banner;
