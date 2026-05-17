import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Typography, Card, CardContent } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { DataGrid } from '@mui/x-data-grid';
import { Gauge } from '@mui/x-charts/Gauge';
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

const grainBackground = `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

const cardSx = {
    border: '2px solid #18181b',
    borderRadius: '18px',
    backgroundColor: '#f5f5f4',
    boxShadow: 'none',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
        content: '""',
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        opacity: 0.18,
        mixBlendMode: 'multiply',
        backgroundImage: grainBackground,
    },
    '& > *': {
        position: 'relative',
        zIndex: 1,
    },
};

const panelSx = {
    ...cardSx,
    backgroundColor: '#fafaf9',
};

const chartPalette = {
    primary: '#18181b',
    accent: '#5b3b8c',
    secondary: '#71717a',
    neutral: '#d6d3d1',
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

const chartSx = {
    '& .MuiChartsAxis-line, & .MuiChartsAxis-tick': {
        stroke: '#78716c',
    },
    '& .MuiChartsAxis-tickLabel': {
        fill: '#57534e',
        fontSize: '0.75rem',
    },
    '& .MuiChartsLegend-label': {
        fill: '#57534e',
        fontSize: '0.75rem',
    },
};

function DashboardPage() {
    const firstName = localStorage.getItem('firstName') || 'there';
    const averageAge = (
        userRows.reduce((sum, row) => sum + (row.age || 0), 0) /
        userRows.filter((row) => row.age !== null).length
    ).toFixed(1);
    const metrics = [
        { label: 'Total Users', value: userRows.length, note: '+12% from last month' },
        { label: 'Average Age', value: averageAge, note: 'Across active records' },
        { label: 'Open Reports', value: '18', note: '5 need urgent review' },
        { label: 'Published', value: '27', note: 'Articles and resources' },
    ];

    return (
        <Box sx={{ width: '100%', minWidth: 0 }}>
            <Card
                sx={{
                    ...cardSx,
                    mb: 2,
                    backgroundColor: '#18181b',
                    color: '#fafaf9',
                    overflow: 'hidden',
                    position: 'relative',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        inset: 0,
                        pointerEvents: 'none',
                        opacity: 0.24,
                        mixBlendMode: 'screen',
                        backgroundImage: grainBackground,
                    },
                }}
            >
                <CardContent
                    sx={{
                        p: { xs: 2.5, md: 3 },
                        minHeight: { xs: 210, md: 190 },
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        position: 'relative',
                        zIndex: 1,
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            right: -70,
                            top: -90,
                            width: 240,
                            height: 240,
                            border: '2px solid rgba(250, 250, 249, 0.2)',
                            borderRadius: '50%',
                        },
                    }}
                >
                    <Typography
                        sx={{
                            width: 'fit-content',
                            mb: 1.5,
                            px: 1.2,
                            py: 0.55,
                            border: '1px solid rgba(250, 250, 249, 0.55)',
                            borderRadius: '999px',
                            fontSize: '0.62rem',
                            fontWeight: 700,
                            letterSpacing: '0.18em',
                            textTransform: 'uppercase',
                            color: '#fafaf9',
                        }}
                    >
                        Typed Overview
                    </Typography>
                    <Typography
                        component="h1"
                        sx={{
                            maxWidth: 760,
                            fontSize: { xs: '2rem', md: '2.7rem' },
                            lineHeight: 1.07,
                            fontWeight: 900,
                            color: '#fafaf9',
                        }}
                    >
                        Welcome back, {firstName}!
                    </Typography>
                    <Typography sx={{ mt: 1.5, maxWidth: 720, fontSize: '0.96rem', lineHeight: 1.7, color: '#d6d3d1' }}>
                        Manage user records, reports, and articles from the Typed Admin Dashboard. Get insights into user activity, content performance, and system health all in one place.
                    </Typography>
                </CardContent>
            </Card>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: 'repeat(2, minmax(0, 1fr))',
                        xl: 'repeat(4, minmax(0, 1fr))',
                    },
                    gap: 2,
                    mb: 2,
                }}
            >
                {metrics.map((metric) => (
                    <Card key={metric.label} sx={{ ...cardSx, minHeight: 116, position: 'relative', overflow: 'hidden' }}>
                        <CardContent sx={{ p: 2.25 }}>
                            <Typography sx={statLabelSx}>{metric.label}</Typography>
                            <Typography sx={{ mt: 0.75, fontSize: '2rem', fontWeight: 850, color: '#18181b' }}>
                                {metric.value}
                            </Typography>
                            <Typography sx={{ mt: 0.25, fontSize: '0.78rem', color: '#57534e' }}>
                                {metric.note}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', xl: 'minmax(0, 1.55fr) minmax(340px, 0.85fr)' },
                    gap: 2,
                    mb: 3,
                    alignItems: 'stretch',
                }}
            >
                <Card sx={panelSx}>
                    <CardContent sx={{ p: { xs: 2, md: 2.5 } }}>
                        <Typography sx={{ fontSize: '1.15rem', fontWeight: 850, color: '#18181b' }}>
                            Quarterly Summary
                        </Typography>
                        <Typography sx={{ mt: 0.5, mb: 1.5, fontSize: '0.82rem', color: '#57534e' }}>
                            Compare task output across the last four quarters.
                        </Typography>
                        <Box sx={{ height: 345, minWidth: 0 }}>
                            <BarChart
                                series={[
                                    { data: [35, 44, 24, 34], label: 'Completed', color: chartPalette.primary },
                                    { data: [21, 16, 29, 30], label: 'Pending', color: chartPalette.accent },
                                ]}
                                height={345}
                                margin={{ top: 28, right: 22, bottom: 42, left: 45 }}
                                categoryGapRatio={0.35}
                                barGapRatio={0.12}
                                xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band', label: 'Quarters' }]}
                                sx={chartSx}
                            />
                        </Box>
                    </CardContent>
                </Card>

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))', xl: '1fr' },
                        gap: 2,
                    }}
                >
                    <Card sx={panelSx}>
                        <CardContent sx={{ p: 2, minHeight: 290, display: 'flex', flexDirection: 'column' }}>
                            <Typography sx={{ fontSize: '1.15rem', fontWeight: 850, color: '#18181b' }}>
                                Progress Snapshot
                            </Typography>
                            <Stack
                                direction="row"
                                spacing={2}
                                sx={{
                                    flex: 1,
                                    mt: 2.5,
                                    alignItems: 'center',
                                    justifyContent: 'space-evenly',
                                }}
                            >
                                <Box sx={{ textAlign: 'center' }}>
                                    <Gauge
                                        width={160}
                                        height={160}
                                        value={78}
                                        sx={{
                                            '& .MuiGauge-valueArc': { fill: chartPalette.accent },
                                            '& .MuiGauge-referenceArc': { fill: '#e7e5e4' },
                                            '& .MuiGauge-valueText': { fill: chartPalette.primary, fontWeight: 850 },
                                        }}
                                    />
                                    <Typography sx={{ mt: 1, fontSize: '0.74rem', fontWeight: 700, color: '#57534e' }}>
                                        Completion Rate
                                    </Typography>
                                </Box>
                                <Box sx={{ textAlign: 'center' }}>
                                <Gauge
                                    width={160}
                                    height={160}
                                    value={64}
                                    sx={{
                                        '& .MuiGauge-valueArc': { fill: chartPalette.secondary },
                                        '& .MuiGauge-referenceArc': { fill: '#e7e5e4' },
                                        '& .MuiGauge-valueText': { fill: chartPalette.primary, fontWeight: 850 },
                                    }}
                                />
                                    <Typography sx={{ mt: 1, fontSize: '0.74rem', fontWeight: 700, color: '#57534e' }}>
                                        Response Rate
                                    </Typography>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>

                    <Card sx={panelSx}>
                        <CardContent sx={{ p: 2 }}>
                            <Typography sx={{ fontSize: '1.15rem', fontWeight: 850, color: '#18181b' }}>
                                Category Share
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'center', minHeight: 220 }}>
                                <PieChart
                                    series={[
                                        {
                                            data: [
                                                { id: 0, value: 14, label: 'Users', color: chartPalette.primary },
                                                { id: 1, value: 10, label: 'Reports', color: chartPalette.accent },
                                                { id: 2, value: 8, label: 'Articles', color: chartPalette.neutral },
                                            ],
                                            innerRadius: 48,
                                        },
                                    ]}
                                    width={300}
                                    height={220}
                                    sx={chartSx}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Box>

            <Typography sx={sectionHeadingSx} gutterBottom>
                Users Overview
            </Typography>
            <Box sx={{ height: 400, width: '100%', mb: 3 }}>
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
        </Box>
    );
}

export default DashboardPage;
