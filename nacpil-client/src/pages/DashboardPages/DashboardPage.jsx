import { BarChart } from '@mui/x-charts/BarChart';
import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Gauge } from '@mui/x-charts/Gauge';
import { Typography, Card, CardContent } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const userColumns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'firstName',
        headerName: 'First Name',
        width: 150,
        editable: true,
    },
    {
        field: 'lastName',
        headerName: 'Last Name',
        width: 150,
        editable: true,
    },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'fullName',
        headerName: 'Full Name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
];

const userRows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const sectionHeadingSx = {
    mb: 2,
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#18181b',
};

const statLabelSx = {
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: '#71717a',
};

const cardSx = {
    border: '2px solid #18181b',
    borderRadius: '20px',
    backgroundColor: '#f5f5f4',
    boxShadow: 'none',
};

const dataGridSx = {
    border: '2px solid #18181b',
    borderRadius: '20px',
    backgroundColor: '#fafaf9',
    '& .MuiDataGrid-columnHeaders': {
        backgroundColor: '#e7e5e4',
        borderBottom: '2px solid #18181b',
    },
    '& .MuiDataGrid-columnHeaderTitle': {
        fontWeight: 700,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
    },
};

function DashboardPage() {
    const averageAge = (
        userRows.reduce((sum, row) => sum + (row.age || 0), 0) /
        userRows.filter((row) => row.age !== null).length
    ).toFixed(1);

    return (
        <>
            <Typography component="h1" sx={{ ...sectionHeadingSx, fontSize: '2rem', mb: 3 }}>
                Dashboard
            </Typography>

            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 4 }} display="flex">
                <Card sx={cardSx}>
                    <CardContent>
                        <Typography sx={statLabelSx}>
                            Total Users
                        </Typography>
                        <Typography sx={{ mt: 1, fontSize: '2rem', fontWeight: 700, color: '#18181b' }}>
                            {userRows.length}
                        </Typography>
                    </CardContent>
                </Card>
                <Card sx={cardSx}>
                    <CardContent>
                        <Typography sx={statLabelSx}>
                            Average Age
                        </Typography>
                        <Typography sx={{ mt: 1, fontSize: '2rem', fontWeight: 700, color: '#18181b' }}>
                            {averageAge}
                        </Typography>
                    </CardContent>
                </Card>
            </Stack>

            <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ mb: 4 }}>
                <Box
                    sx={{
                        ...cardSx,
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Gauge
                        width={100}
                        height={100}
                        value={50}
                        sx={{
                            '& .MuiGauge-valueArc': {
                                fill: '#4f46e5',
                            },
                            '& .MuiGauge-referenceArc': {
                                fill: '#e7e5e4',
                            },
                            '& .MuiGauge-valueText': {
                                fill: '#18181b',
                                fontWeight: 700,
                            },
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        ...cardSx,
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Gauge
                        width={100}
                        height={100}
                        value={50}
                        valueMin={10}
                        valueMax={60}
                        sx={{
                            '& .MuiGauge-valueArc': {
                                fill: '#f59e0b',
                            },
                            '& .MuiGauge-referenceArc': {
                                fill: '#e7e5e4',
                            },
                            '& .MuiGauge-valueText': {
                                fill: '#18181b',
                                fontWeight: 700,
                            },
                        }}
                    />
                </Box>
            </Stack>

            <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ mb: 4 }}>
                <Box sx={{ p: 1, overflow: 'visible' }}>
                    <BarChart
                        series={[
                            { data: [35, 44, 24, 34], label: 'Series 1', color: '#4f46e5' },
                            { data: [51, 6, 49, 30], label: 'Series 2', color: '#f59e0b' },
                        ]}
                        height={290}
                        width={620}
                        margin={{ top: 20, right: 20, bottom: 40, left: 50 }}
                        categoryGapRatio={0.35}
                        barGapRatio={0.12}
                        xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band', label: 'Quarters' }]}
                        title="Quarterly Sales"
                    />
                </Box>
                <Box
                    sx={{
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <PieChart
                        series={[
                            {
                                data: [
                                    { id: 0, value: 10, label: 'Series A', color: '#4f46e5' },
                                    { id: 1, value: 15, label: 'Series B', color: '#f59e0b' },
                                    { id: 2, value: 20, label: 'Series C', color: '#f43f5e' },
                                ],
                            },
                        ]}
                        width={200}
                        height={200}
                    />
                </Box>
            </Stack>

            <Typography sx={sectionHeadingSx} gutterBottom>
                Users Overview
            </Typography>
            <Box sx={{ height: 400, width: '100%', mb: 2 }}>
                <DataGrid
                    rows={userRows}
                    columns={userColumns}
                    experimentalFeatures={{ newEditingApi: true }}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                    sx={dataGridSx}
                />
            </Box>

            <Typography sx={sectionHeadingSx} gutterBottom>
                Location Map
            </Typography>
            <Box
                sx={{
                    height: 500,
                    width: '100%',
                    overflow: 'hidden',
                    border: '2px solid #18181b',
                    borderRadius: '20px',
                }}
            >
                <MapContainer center={[14.604253, 120.994314]} zoom={13} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={[14.604253, 120.994314]}>
                        <Popup>
                            National University - Manila <br />
                            <p><i>551 M.F. Jhocson St., Sampaloc, Manila, 1008 Metro Manila</i></p>
                        </Popup>
                    </Marker>
                </MapContainer>
            </Box>
        </>
    );
}

export default DashboardPage;