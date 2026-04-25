import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';

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

const reportRows = [
    { id: 1, quarter: 'Q1', sales: 35, returns: 12, growth: '12%' },
    { id: 2, quarter: 'Q2', sales: 44, returns: 6, growth: '18%' },
    { id: 3, quarter: 'Q3', sales: 24, returns: 10, growth: '8%' },
    { id: 4, quarter: 'Q4', sales: 34, returns: 7, growth: '14%' },
];

const reportColumns = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'quarter', headerName: 'Quarter', width: 120 },
    { field: 'sales', headerName: 'Sales', width: 120, type: 'number' },
    { field: 'returns', headerName: 'Returns', width: 120, type: 'number' },
    { field: 'growth', headerName: 'Growth', width: 120 },
];

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

const channelData = [
    { id: 0, value: 38, label: 'Organic', color: '#4f46e5' },
    { id: 1, value: 34, label: 'Ads', color: '#f59e0b' },
    { id: 2, value: 28, label: 'Social', color: '#f43f5e' },
];

const reportCards = [
    { label: 'Monthly Sales', value: '12.4k' },
    { label: 'Open Reports', value: '08' },
    { label: 'Conversion Rate', value: '67%' },
];

const ReportsPage = () => {
    return (
        <>
            <Typography component="h1" sx={{ ...sectionHeadingSx, fontSize: '2rem', mb: 3 }}>
                Reports
            </Typography>

            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 4 }}>
                {reportCards.map((card) => (
                    <Card key={card.label} sx={{ ...cardSx, flex: 1 }}>
                        <CardContent>
                            <Typography sx={statLabelSx}>
                                {card.label}
                            </Typography>
                            <Typography sx={{ mt: 1, fontSize: '2rem', fontWeight: 700, color: '#18181b' }}>
                                {card.value}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Stack>

            <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3} sx={{ mb: 4 }}>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography sx={sectionHeadingSx} gutterBottom>
                        Revenue Trend
                    </Typography>
                    <LineChart
                        height={320}
                        margin={{ top: 20, right: 20, bottom: 35, left: 50 }}
                        xAxis={[{ scaleType: 'point', data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] }]}
                        series={[
                            { data: [2200, 3100, 2800, 3900, 4200, 5100], color: '#4f46e5', label: '2026' },
                            { data: [1800, 2400, 2600, 3000, 3500, 4300], color: '#f59e0b', label: '2025' },
                        ]}
                    />
                </Box>

                <Box sx={{ width: { xs: '100%', lg: 320 } }}>
                    <Typography sx={sectionHeadingSx} gutterBottom>
                        Traffic Sources
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', pt: 1 }}>
                        <PieChart
                            series={[
                                {
                                    data: channelData,
                                },
                            ]}
                            width={260}
                            height={260}
                        />
                    </Box>
                </Box>
            </Stack>

            <Typography sx={sectionHeadingSx} gutterBottom>
                Quarterly Summary
            </Typography>
            <Box sx={{ height: 400, width: '100%', mb: 2}}>
                <DataGrid
                    rows={reportRows}
                    columns={reportColumns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 4,
                            },
                        },
                    }}
                    pageSizeOptions={[4]}
                    disableRowSelectionOnClick
                    sx={dataGridSx}
                />
            </Box>
        </>
    );
};

export default ReportsPage;