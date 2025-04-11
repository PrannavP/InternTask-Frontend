import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AttendanceForm = () => {
    const [employees, setEmployees] = useState([]);
    const [dates, setDates] = useState([]);
    const [monthYearOptions, setMonthYearOptions] = useState([]);
    const [selectedMonthYear, setSelectedMonthYear] = useState("");
    const [attendance, setAttendance] = useState({});
    const [isSaveDisabled, setIsSaveDisabled] = useState(true); // New state to manage button disable

    const notify = () => toast.success("Employee Atttendance Success", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        theme: "light"
    });

    // Generate months and years
    useEffect(() => {
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const currentYear = new Date().getFullYear();
        const years = [currentYear];

        const options = [];
        years.forEach((year) => {
            months.forEach((month) => {
                options.push(`${month} ${year}`);
            });
        });
        setMonthYearOptions(options);
    }, []);

    // Fetch employees for the select option
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const res = await axios.get("http://localhost:5147/api/Employee/GetAllEmployees");
                setEmployees(res.data);
            } catch (err) {
                console.error("Error fetching employees:", err);
            }
        };
        fetchEmployees();
    }, []);

    // Update the save button state whenever attendance changes
    useEffect(() => {
        const hasCheckedEntries = Object.values(attendance).some((checked) => checked);
        setIsSaveDisabled(!hasCheckedEntries);
    }, [attendance]);

    const monthMapping = {
        January: 1,
        February: 2,
        March: 3,
        April: 4,
        May: 5,
        June: 6,
        July: 7,
        August: 8,
        September: 9,
        October: 10,
        November: 11,
        December: 12
    };

    const handleMonthYearChange = async (e) => {
        const selected = e.target.value;
        setSelectedMonthYear(selected);

        const [month, year] = selected.split(" ");
        const monthIndex = monthMapping[month];

        if (monthIndex && year) {
            const daysInMonth = new Date(year, monthIndex, 0).getDate();
            const generatedDates = Array.from({ length: daysInMonth }, (_, i) => i + 1);
            setDates(generatedDates);

            try {
                const response = await axios.get(`http://localhost:5147/api/Attendance/GetByMonth`, {
                    params: { month: monthIndex, year: year }
                });
                const attendanceData = response.data;

                const attendanceMap = {};
                attendanceData.forEach(item => {
                    const date = new Date(item.attendance_date);
                    const day = date.getDate();
                    const key = `${item.employee_id}_${day}`;
                    attendanceMap[key] = item.status === "Present";
                });

                setAttendance(attendanceMap);
            } catch (err) {
                console.error("Error loading attendance:", err);
            }
        }
    };


    // whenever the checbox is checked this function is called.
    // this
    const handleCheckboxChange = (employeeId, date) => {
        setAttendance(prev => {
            console.log
            const key = `${employeeId}_${date}`;
            return {
                ...prev,
                [key]: !prev[key]
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const checkedEntries = Object.entries(attendance)
            .filter(([_, checked]) => checked)
            .map(([key]) => {
                const [employeeIdStr, dateStr] = key.split("_");
                const employeeId = parseInt(employeeIdStr);
                const date = parseInt(dateStr);
                const [monthName, yearStr] = selectedMonthYear.split(" ");
                const year = parseInt(yearStr);
                const monthIndex = new Date(`${monthName} 1, ${year}`).getMonth();

                if (isNaN(employeeId) || isNaN(date) || isNaN(monthIndex) || isNaN(year)) {
                    console.warn("Skipping invalid entry:", key);
                    return null;
                };

                const fullDate = new Date(year, monthIndex, date);
                if (isNaN(fullDate.getTime())) {
                    console.warn("Invalid date object:", fullDate, "for key:", key);
                    return null;
                };

                return {
                    employee_id: employeeId,
                    status: "Present",
                    attendance_date: `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`
                };
            })
            .filter(entry => entry !== null);

        try {
            const response = await axios.post("http://localhost:5147/api/Attendance/AddBulk", checkedEntries);
            notify();
        } catch (err) {
            console.error("Error saving attendance:", err);
        }
    };

    return (
        <div className="AttendanceForm-Container">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                newestOnTop={true}
                closeOnClick={true}
                rtl={false}
                theme="light"
            />
            <form onSubmit={handleSubmit}>
                <div className="dropdown-container">
                    <label htmlFor="monthYear">Select Month and Year:</label>
                    <select
                        id="monthYear"
                        value={selectedMonthYear}
                        onChange={handleMonthYearChange}
                        className="dropdown"
                    >
                        <option value="">-- Select Month and Year --</option>
                        {monthYearOptions.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="save-button-container">
                    <button type="submit" disabled={isSaveDisabled}>Save</button>
                </div>

                <div className="employees-attendance-table-container">
                    <div className="attendance-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Employee Name</th>
                                    {dates.map((date) => (
                                        <th key={date}>{date}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((employee) => (
                                    <tr key={employee.id}>
                                        <td>{employee.name}</td>
                                        {dates.map((date) => {
                                            const key = `${employee.id}_${date}`;
                                            return (
                                                <td key={date}>
                                                    <input
                                                        type="checkbox"
                                                        checked={!!attendance[key]}
                                                        onChange={() => handleCheckboxChange(employee.id, date)}
                                                    />
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AttendanceForm;