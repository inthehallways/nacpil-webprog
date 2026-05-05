import { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { BarChart } from '@mui/x-charts/BarChart';
import { Gauge } from '@mui/x-charts/Gauge';
import { DataGrid } from '@mui/x-data-grid';
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

const actionButtonSx = {
    minWidth: 120,
    minHeight: 40,
    border: '2px solid #18181b',
    borderRadius: '14px',
    px: 1.4,
    py: 0.25,
    fontSize: '0.625rem',
    fontWeight: 600,
    letterSpacing: '0.24em',
    textTransform: 'uppercase',
    lineHeight: 1.2,
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

const columns = [
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

const rows = [
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

const ReportsPage = () => {
    const printRef = useRef(null);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
    });

    const handlePrint = () => {
        const printContent = printRef.current;

        if (!printContent) {
            return;
        }

        const printWindow = window.open('', '_blank', 'width=1200, height=900');

        if (!printWindow) {
            return;
        }

        const headMarkup = Array.from(
            document.querySelectorAll('style, link[rel="stylesheet"]')
        )

            .map((node) => node.outerHTML)
            .join('');

        const exportedAt = new Intl.DateTimeFormat('en-US', {
            dateStyle: 'long',
            timeStyle: 'long',
        }).format(new Date());

        const printableContent = printContent.cloneNode(true);
        const gridRoot = printableContent.querySelector('.MuiDataGrid-root');
        const printableRows = rows.slice(
            paginationModel.page * paginationModel.pageSize,
            paginationModel.page * paginationModel.pageSize + paginationModel.pageSize
        );

        if (gridRoot) {
            const tableWrapper = document.createElement('div');
            tableWrapper.className = 'print-table-wrapper';
            tableWrapper.innerHTML = `
                <table class="print-report-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Full Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${printableRows
                            .map(
                                (row) => `
                                    <tr>
                                        <td>${row.id}</td>
                                        <td>${row.firstName || ''}</td>
                                        <td>${row.lastName || ''}</td>
                                        <td>${row.age ?? ''}</td>
                                        <td>${`${row.firstName || ''} ${row.lastName || ''}`.trim()}</td>
                                    </tr>
                                `
                            )
                            .join('')}
                    </tbody>
                </table>
            `;

            const gridContainer = gridRoot.parentElement;
            (gridContainer || gridRoot).replaceWith(tableWrapper);
        }

        printWindow.document.write(`
            <!DOCTYPE html>
            <html lang ="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                    <title>Print Report</title>
                    ${headMarkup}
                    <style>
                        @page {
                            size: A4;
                            margin: 12mm;
                        }
                        * {
                            box-sizing: border-box;
                        }

                        body {
                            margin: 0;
                            font-family: "Segoe UI", Arial, Helvetica, sans-serif;
                            background: #f5f5f4;
                            color: #18181b;
                        }
                        .report-shell {
                            min-height: 100vh;
                            padding: 0;
                            background:
                                linear-gradient(rgba(24, 24, 27, 0.035) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(24, 24, 27, 0.035) 1px, transparent 1px),
                                #fafaf9;
                            background-size: 26px 26px;
                            border: 2px solid #18181b;
                        }
                        .report-header {
                            margin-bottom: 14px;
                            padding: 14px 16px 12px;
                            border-bottom: 2px solid #18181b;
                            background: #f5f5f4;
                        }
                        .report-header h1 {
                            margin: 0 0 4px;
                            font-size: 28px;
                            line-height: 1.15;
                            font-weight: 900;
                            letter-spacing: -0.01em;
                        }
                        .report-header p {
                            margin: 0;
                            max-width: 560px;
                            font-size: 11.5px;
                            color: #57534e;
                            line-height: 1.4;
                        }
                        .report-kicker {
                            display: inline-block;
                            margin-bottom: 8px;
                            padding: 4px 8px;
                            border: 1.5px solid #18181b;
                            border-radius: 999px;
                            font-size: 9px;
                            font-weight: 700;
                            letter-spacing: 0.24em;
                            text-transform: uppercase;
                            background: #18181b;
                            color: #fafaf9;
                        }
                        .report-meta {
                            margin-top: 7px;
                            color: #18181b;
                            font-size: 10px;
                            font-weight: 700;
                        }
                        .report-content {
                            display: block;
                            padding: 0 16px 12px;
                        }
                        .report-content .MuiStack-root {
                            gap: 12px !important;
                        }
                        .report-content .MuiCard-root {
                            box-shadow: none !important;
                            border: 2px solid #18181b !important;
                            border-radius: 16px !important;
                            background: #f5f5f4 !important;
                            break-inside: avoid;
                            page-break-inside: avoid;
                        }
                        .report-content .MuiCardContent-root {
                            padding: 12px !important;
                        }
                        .report-content .MuiTypography-root {
                            color: #18181b;
                        }
                        .report-content .MuiTypography-body2,
                        .report-content .MuiTypography-body1 {
                            color: #57534e !important;
                        }
                        .report-content .MuiTypography-h1,
                        .report-content .MuiTypography-h2,
                        .report-content .MuiTypography-h3,
                        .report-content .MuiTypography-h4,
                        .report-content .MuiTypography-h5,
                        .report-content .MuiTypography-h6 {
                            line-height: 1.2;
                        }
                        .report-content .MuiCardContent-root > .MuiTypography-root:first-child {
                            display: inline-block;
                            margin-bottom: 2px !important;
                            padding: 3px 7px;
                            border: 1.5px solid #18181b;
                            border-radius: 999px;
                            background: #18181b;
                            color: #fafaf9 !important;
                            font-size: 7.5px !important;
                            letter-spacing: 0.2em !important;
                        }
                        .report-content .MuiDataGrid-root {
                            border: 2px solid #18181b !important;
                            border-radius: 16px !important;
                            background: #fafaf9 !important;
                            overflow: hidden;
                            break-inside: avoid;
                            page-break-inside: avoid;
                        }
                        .report-content .MuiDataGrid-columnHeaders {
                            background: #fafaf9 !important;
                            border-bottom: 2px solid #18181b !important;
                            min-height: 26px !important;
                            max-height: 26px !important;
                            height: 26px !important;
                            line-height: 26px !important;
                        }
                        .report-content .MuiDataGrid-columnHeaderTitle {
                            font-weight: 700 !important;
                            letter-spacing: 0.08em;
                            text-transform: uppercase;
                            font-size: 9px !important;
                        }
                        .report-content .MuiDataGrid-columnHeaderTitleContainer,
                        .report-content .MuiDataGrid-cellContent {
                            overflow: visible !important;
                            white-space: nowrap;
                            height: 100% !important;
                            display: flex !important;
                            align-items: center !important;
                            line-height: 1.2 !important;
                        }
                        .report-content .MuiDataGrid-footerContainer,
                        .report-content .MuiDataGrid-columnSeparator,
                        .report-content .MuiDataGrid-menuIcon,
                        .report-content .MuiCheckbox-root,
                        .report-content input[type="checkbox"] {
                            display: none !important;
                        }
                        .report-content .MuiDataGrid-cellCheckbox,
                        .report-content .MuiDataGrid-columnHeaderCheckbox,
                        .report-content [data-field="__check__"] {
                            display: none !important;
                            width: 0 !important;
                            min-width: 0 !important;
                            max-width: 0 !important;
                            padding: 0 !important;
                            border: 0 !important;
                        }
                        .report-content .MuiDataGrid-cell,
                        .report-content .MuiDataGrid-columnHeader {
                            display: flex !important;
                            min-height: 30px !important;
                            max-height: 30px !important;
                            font-size: 9px !important;
                            align-items: center !important;
                            padding-top: 0 !important;
                            padding-bottom: 0 !important;
                        }
                        .report-content .MuiDataGrid-columnHeader {
                            min-height: 26px !important;
                            max-height: 26px !important;
                            height: 26px !important;
                        }
                        .report-content .MuiDataGrid-main {
                            overflow: hidden !important;
                        }
                        .report-content .MuiDataGrid-virtualScroller {
                            overflow: hidden !important;
                        }
                        .report-content .MuiDataGrid-row {
                            min-height: 30px !important;
                            max-height: 30px !important;
                        }
                        .report-content .MuiDataGrid-row:not(:last-of-type) {
                            border-bottom: 1px solid #d6d3d1 !important;
                        }
                        .report-content .MuiBox-root[style*="height: 400px"] {
                            height: 215px !important;
                            min-height: 215px !important;
                            margin-bottom: 0 !important;
                            break-inside: avoid;
                            page-break-inside: avoid;
                        }
                        .report-content .MuiDataGrid-viewport,
                        .report-content .MuiDataGrid-virtualScrollerContent,
                        .report-content .MuiDataGrid-virtualScrollerRenderZone {
                            height: auto !important;
                        }
                        .report-content .MuiDataGrid-footerContainer {
                            min-height: 0 !important;
                            padding: 0 !important;
                        }
                        .report-content svg {
                            max-width: 100%;
                        }
                        .report-content .MuiChartsLegend-root text,
                        .report-content .MuiChartsAxis-root text {
                            font-size: 9px !important;
                        }
                        .report-content .MuiChartsSurface-root {
                            max-height: 190px !important;
                        }
                        .print-table-wrapper {
                            overflow: hidden;
                            border: 2px solid #18181b;
                            border-radius: 16px;
                            background: #fafaf9;
                            break-inside: avoid;
                            page-break-inside: avoid;
                        }
                        .print-report-table {
                            width: 100%;
                            border-collapse: collapse;
                            table-layout: fixed;
                            font-size: 10px;
                            color: #18181b;
                        }
                        .print-report-table th {
                            height: 36px;
                            padding: 0 10px;
                            border-bottom: 2px solid #18181b;
                            font-size: 9px;
                            font-weight: 800;
                            letter-spacing: 0.14em;
                            text-align: left;
                            text-transform: uppercase;
                            vertical-align: middle;
                            background: #fafaf9;
                        }
                        .print-report-table td {
                            height: 34px;
                            padding: 0 10px;
                            border-bottom: 1px solid #d6d3d1;
                            vertical-align: middle;
                            background: #fafaf9;
                        }
                        .print-report-table tbody tr:last-child td {
                            border-bottom: 0;
                        }
                        .print-report-table th:first-child,
                        .print-report-table td:first-child {
                            width: 70px;
                        }
                        .print-report-table th:nth-child(4),
                        .print-report-table td:nth-child(4) {
                            width: 70px;
                            text-align: right;
                        }
                        .report-footer {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            margin: 0 16px;
                            padding: 9px 0 0;
                            border-top: 2px solid #18181b;
                            text-align: right;
                            font-size: 9px;
                            color: #78716c;
                            letter-spacing: 0.08em;
                            text-transform: uppercase;
                        }
                        @media print {
                            @page {
                                size: A4;
                                margin: 16mm 12mm 12mm;
                            }
                            body {
                                background: #fff;
                            }
                            body::before {
                                content: "";
                                position: fixed;
                                inset: 0;
                                border: 2px solid #18181b;
                                pointer-events: none;
                            }
                            .report-shell {
                                border: 0;
                            }
                            .report-content .completion-rate-card {
                                position: relative !important;
                                top: 10mm !important;
                                margin-bottom: 10mm !important;
                            }
                        }
                    </style>
                </head>
                <body>
                    <main class ="report-shell">
                        <header class="report-header">
                            <span class="report-kicker">Typed Report Export</span>
                            <h1>Reports Summary</h1>
                            <p>Analytics overview for generated reports, category breakdown, and completion performance.</p>
                            <div class="report-meta">Prepared ${exportedAt}</div>
                        </header>
                        <section class="report-content">
                            ${printableContent.innerHTML}
                        </section>
                        <footer class="report-footer">
                            <span>Typed Dashboard Report</span>
                            <span>Generated from Reports Page</span>
                        </footer>
                    </main>
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    };

    return (
        <Box>
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                sx={{ mb: 4, alignItems: { xs: 'flex-start', sm: 'flex-start' } }}
            >
                <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography component="h1" sx={{ ...sectionHeadingSx, fontSize: '2rem', mb: 1 }}>
                        Reports
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 680 }}>
                        Report analytics overview showing generated reports, category breakdown, and current completion performance.
                    </Typography>
                </Box>

                <Stack
                    direction="row"
                    spacing={1.5}
                    useFlexGap
                    sx={{
                        ml: { xs: 0, sm: 'auto' },
                        mt: { xs: 2, sm: 0 },
                        pt: { xs: 0, sm: 6.5 },
                        flexWrap: 'wrap',
                        justifyContent: { xs: 'flex-start', sm: 'flex-end' },
                    }}
                >
                    <Button
                        variant="outlined"
                        sx={{
                            ...actionButtonSx,
                            backgroundColor: '#fafaf9',
                            color: '#18181b',
                            '&:hover': {
                                backgroundColor: '#f5f5f4',
                                borderColor: '#18181b',
                            },
                        }}
                    >
                        Generate
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handlePrint}
                        sx={{
                            ...actionButtonSx,
                            backgroundColor: '#18181b',
                            color: '#fafaf9',
                            boxShadow: 'none',
                            '&:hover': {
                                backgroundColor: '#27272a',
                                boxShadow: 'none',
                            },
                        }}
                    >
                        Export PDF
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{
                            ...actionButtonSx,
                            backgroundColor: '#fafaf9',
                            color: '#18181b',
                            '&:hover': {
                                backgroundColor: '#f5f5f4',
                                borderColor: '#18181b',
                            },
                        }}
                    >
                        Filter
                    </Button>
                </Stack>
            </Stack>

            <Stack ref={printRef} spacing={3}>
                <Card sx={cardSx}>
                    <CardContent>
                        <Typography sx={statLabelSx}>Monthly Output</Typography>
                        <Typography sx={{ mt: 1, mb: 1, fontSize: '1.5rem', fontWeight: 700, color: '#18181b' }}>
                            Monthly Report Output
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                This chart compares how many reports were generated and how many were completed across the last four months.
                        </Typography>
                        <BarChart
                            series={[
                                { data: [18, 24, 20, 27 ], label: 'Generated' },
                                { data: [12, 19, 17, 23], label: 'Completed'},
                            ]}
                            height={300}
                            xAxis={[
                                {
                                    data: ['January', 'February', 'March', 'April'],
                                    scaleType: "band",
                                    label: "Months",
                                },
                            ]}
                        />
                    </CardContent>
                </Card>

                <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3}>
                    <Card sx={{ ...cardSx, flex: 1 }}>
                        <CardContent>
                            <Typography sx={statLabelSx}>Breakdown</Typography>
                            <Typography sx={{ mt: 1, mb: 1, fontSize: '1.5rem', fontWeight: 700, color: '#18181b' }}>
                                Report Category Share
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                    This chart shows the distribution of report requests by category for the current reporting method.
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <PieChart
                                    series={[
                                        {
                                            data: [
                                                { id: 0, value: 14, label: 'Sales' },
                                                { id: 1, value: 10, label: 'Users' },
                                                { id: 2, value: 8, label: 'Inventory' },
                                                { id: 3, value: 6, label: 'Finance' },
                                            ],
                                        },
                                    ]}
                                    width={280}
                                    height={220}
                                />
                            </Box>
                        </CardContent>
                    </Card>

                    <Card className="completion-rate-card" sx={{ ...cardSx, flex: 1 }}>
                        <CardContent>
                            <Typography sx={statLabelSx}>Performance</Typography>
                            <Typography sx={{ mt: 1, mb: 1, fontSize: '1.5rem', fontWeight: 700, color: '#18181b' }}>
                                Completion Rate
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3}}>
                                    The gauge highlights the current percentage of reports completed on time based on the latest reporting cycle.
                            </Typography>
                            <Box sx={{ minHeight: 220, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Gauge width={180} height={180} value={78}/>
                            </Box>
                        </CardContent>
                    </Card>
                </Stack>

                <Typography sx={sectionHeadingSx} gutterBottom>
                    Reports Overview
                </Typography>
                <Box sx={{ height: 400, width: '100%', mb: 2, mt: 1 }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        experimentalFeatures={{ newEditingApi: true }}
                        initialState={{
                            pagination: {
                                paginationModel,
                            },
                        }}
                        paginationModel={paginationModel}
                        onPaginationModelChange={setPaginationModel}
                        pageSizeOptions={[5]}
                        checkboxSelection
                        disableRowSelectionOnClick
                        sx={dataGridSx}
                    />
                </Box>
            </Stack>
        </Box>
    );
};

export default ReportsPage;