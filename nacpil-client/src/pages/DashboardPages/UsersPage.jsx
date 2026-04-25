import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';

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

const UsersPage = () => {
    const activeUsers = userRows.filter((user) => user.age !== null && user.age < 50).length;
    const unknownAge = userRows.filter((user) => user.age === null).length;

    return (
        <>
            <Typography component="h1" sx={{ ...sectionHeadingSx, fontSize: '2rem', mb: 3 }}>
                Users
            </Typography>

            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 4 }}>
                <Card sx={{ ...cardSx, flex: 1 }}>
                    <CardContent>
                        <Typography sx={statLabelSx}>
                            Total Users
                        </Typography>
                        <Typography sx={{ mt: 1, fontSize: '2rem', fontWeight: 700, color: '#18181b' }}>
                            {userRows.length}
                        </Typography>
                    </CardContent>
                </Card>
                <Card sx={{ ...cardSx, flex: 1 }}>
                    <CardContent>
                        <Typography sx={statLabelSx}>
                            Age Under 50
                        </Typography>
                        <Typography sx={{ mt: 1, fontSize: '2rem', fontWeight: 700, color: '#18181b' }}>
                            {activeUsers}
                        </Typography>
                    </CardContent>
                </Card>
                <Card sx={{ ...cardSx, flex: 1 }}>
                    <CardContent>
                        <Typography sx={statLabelSx}>
                            Unknown Age
                        </Typography>
                        <Typography sx={{ mt: 1, fontSize: '2rem', fontWeight: 700, color: '#18181b' }}>
                            {unknownAge}
                        </Typography>
                    </CardContent>
                </Card>
            </Stack>

            <Typography sx={sectionHeadingSx} gutterBottom>
                User Directory
            </Typography>
            <Box sx={{ height: 400, width: '100%', mb: 2 }}>
                <DataGrid
                    rows={userRows}
                    columns={userColumns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    disableRowSelectionOnClick
                    sx={dataGridSx}
                />
            </Box>
        </>
    );
};

export default UsersPage;