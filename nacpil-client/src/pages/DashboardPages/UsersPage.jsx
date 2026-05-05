import { useState } from 'react';
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    IconButton,
    InputAdornment,
    MenuItem,
    Popover,
    Paper,
    Stack,
    Switch,
    TextField,
    Tooltip,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { DataGrid } from '@mui/x-data-grid';
import usersSeed from '../../data/users.json?raw';

const roles = ['admin', 'editor', 'viewer',];
const genders = ['male','female','other'];

const blankForm = {
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    contactNumber: '',
    email: '',
    role: 'editor',
    username: '',
    password: '',
    address: '',
    isActive: true,
};

const labelize = (value) => 
    value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : '';

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
    minWidth: 96,
    minHeight: 36,
    border: '2px solid #18181b',
    borderRadius: '12px',
    px: 1.3,
    py: 0.15,
    fontSize: '0.625rem',
    fontWeight: 600,
    letterSpacing: '0.24em',
    textTransform: 'uppercase',
    lineHeight: 1.2,
    boxShadow: 'none',
};

const dataGridSx = {
    minWidth: 0,
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
    '& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader': {
        outline: 'none',
    },
};

const modalPaperSx = {
    border: '2px solid #18181b',
    borderRadius: { xs: 0, sm: '24px' },
    backgroundColor: '#fafaf9',
    boxShadow: '8px 8px 0 rgba(24, 24, 27, 0.18)',
    display: 'flex',
    maxHeight: { xs: '100vh', sm: 'calc(100vh - 32px)' },
    overflow: 'hidden',
};

const modalFieldSx = {
    '& .MuiInputLabel-root': {
        color: '#57534e',
        fontWeight: 500,
    },
    '& .MuiOutlinedInput-root': {
        borderRadius: '14px',
        backgroundColor: '#f5f5f4',
        '& fieldset': {
            border: '2px solid #d6d3d1',
        },
        '&:hover fieldset': {
            borderColor: '#18181b',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#18181b',
        },
    },
    '& .MuiFormHelperText-root': {
        mx: 0,
        fontWeight: 600,
    },
};

const dashboardFieldSx = {
    '& .MuiInputLabel-root.Mui-focused': {
        color: '#18181b',
    },
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            borderColor: '#18181b',
        },
    },
};

const loadUsers = () => {
    try {
        return {
            users: JSON.parse(usersSeed).map((user, index) => ({
                id: Number(user.id) || index + 1,
                firstName: String(user.firstName ?? '').trim(),
                lastName: String(user.lastName ?? '').trim(),
                age: String(user.age ?? '').trim(),
                gender: genders.includes(String(user.gender ?? '').trim().toLowerCase()) 
                    ? String(user.gender ?? '').trim().toLowerCase()
                    : '',
                contactNumber: String(user.contactNumber ?? '').trim(),
                email: String(user.email ?? '').trim().toLowerCase(),
                role: roles.includes(String(user.role ?? '').trim().toLowerCase()) 
                    ? String(user.role ?? '').trim().toLowerCase()
                    : 'editor',
                username: String(user.username ?? '').trim().toLowerCase(),
                password: String(user.password ?? ''),
                address: String(user.address ?? '').trim(),
                isActive: typeof user.isActive === 'boolean' ? user.isActive : true, 
            })),
            error: '',
        };
    } catch {
        return {
            users: [],
            error: 'Unable to read users from src/data/users.json',
        };
    }
};

const seed = loadUsers();

const UsersPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [users, setUsers] = useState(seed.users);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        role: '',
        gender: '',
        status: '',
    });
    const [filterAnchorEl, setFilterAnchorEl] = useState(null);
    const [modal, setModal] = useState({ open: false, id: null});
    const [form, setForm] = useState(blankForm);
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const resetForm = () => {
        setForm({ ...blankForm });
        setErrors({});
    };

    const openModal = (user) => {
        setModal({ open: true, id: user?.id ?? null });
        setForm(user ? { ...blankForm, ...user } : { ...blankForm });
        setErrors({});
    };

    const closeModal = () => {
        setModal({ open: false, id: null });
        setShowPassword(false);
        resetForm();
    };

    const handleChange = ({ target: { name, value, checked, type }}) => {
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const nextErrors = {};
        const age = form.age.trim();
        const contactNumber = form.contactNumber.trim();
        const email = form.email.trim().toLowerCase();
        const username = form.username.trim().toLowerCase();
        const rawUsername = form.username.trim();
        const password = form.password;
        [
            ['firstName', 'First Name'],
            ['lastName', 'Last Name'],
            ['age', 'Age'],
            ['gender', 'Gender'],
            ['contactNumber', 'Contact Number'],
            ['email', 'Email'],
            ['role', 'Role'],
            ['username', 'Username'],
            ['password', 'Password'],
            ['address', 'Address'],
        ].forEach(([key, label]) => {
            if (!String(form[key]).trim()) {
                nextErrors[key] = `${label} is required.`;
            }
        });

        if (!nextErrors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            nextErrors.email = 'Enter a valid email address.';
        }

        if (!nextErrors.age && !/^\d+$/.test(age)) {
            nextErrors.age = 'Age must contain numbers only.';
        }

        if (!nextErrors.contactNumber && !/^\d{11}$/.test(contactNumber)) {
            nextErrors.contactNumber = 'Contact number must be exactly 11 digits.';
        }

        if (!nextErrors.password && password.length < 8) {
            nextErrors.password = 'Password must be at least 8 characters.';
        }

        if (!nextErrors.username && /\s/.test(rawUsername)) {
            nextErrors.username = 'Username must not contain spaces.';
        }

        if (!nextErrors.email && users.some((user) => user.id !== modal.id && user.email === email)) {
            nextErrors.email = 'Email address already exists.';
        }

        if (!nextErrors.username && users.some((user) => user.id !== modal.id && user.username === username)) {
            nextErrors.username = 'Username already exists.';
        }

        return nextErrors;

    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const nextErrors = validate();

        if (Object.keys(nextErrors).length) {
            setErrors(nextErrors);
            return;
        }

        const nextUser = {
            firstName: form.firstName.trim(),
            lastName: form.lastName.trim(),
            age: form.age.trim(),
            gender: form.gender.trim().toLowerCase(),
            contactNumber: form.contactNumber.trim(),
            email: form.email.trim().toLowerCase(),
            role: form.role.trim().toLowerCase(),
            username: form.username.trim().toLowerCase(),
            password: form.password,
            address: form.address.trim(),
            isActive: form.isActive,
        };

        setUsers((prev) => 
            modal.id
                ? prev.map((user) => (user.id === modal.id ? { ...user, ...nextUser } : user))
                : [
                    ...prev,
                    {
                        id: prev.reduce((max, user) => Math.max(max, Number(user.id) || 0), 0) + 1,
                        ...nextUser,
                    },
                ]
        );
        closeModal();
    };

    const toggleStatus = (id) => {
        setUsers((prev) => 
            prev.map((user) => 
                user.id === id ? { ...user, isActive: !user.isActive } : user
            )
        );
    };

    const handleFilterChange = ({ target: { name, value } }) => {
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const openFilters = (event) => {
        setFilterAnchorEl(event.currentTarget);
    };

    const closeFilters = () => {
        setFilterAnchorEl(null);
    };

    const clearFilters = () => {
        setFilters({
            role: '',
            gender: '',
            status: '',
        });
    };

    const filteredUsers = users.filter((user) => {
        const normalizedSearch = searchTerm.trim().toLowerCase();
        const matchesSearch =
            !normalizedSearch ||
            user.firstName.toLowerCase().includes(normalizedSearch) ||
            user.lastName.toLowerCase().includes(normalizedSearch) ||
            user.email.toLowerCase().includes(normalizedSearch) ||
            user.username.toLowerCase().includes(normalizedSearch);

        const matchesRole = !filters.role || user.role === filters.role;
        const matchesGender = !filters.gender || user.gender === filters.gender;
        const matchesStatus =
            !filters.status ||
            (filters.status === 'active' && user.isActive) ||
            (filters.status === 'inactive' && !user.isActive);

        return matchesSearch && matchesRole && matchesGender && matchesStatus;
    });

    const activeFilterCount = Object.values(filters).filter(Boolean).length;

    const fieldProps = (name, label, extra = {}) => ({
        name,
        label,
        value: form[name],
        onChange: handleChange,
        error: Boolean(errors[name]),
        helperText: errors[name],
        fullWidth: true,
        sx: modalFieldSx,
        ...extra,
    });

    const columns = [
        { field: 'id', headerName: 'ID', width: 80 },
        {
            field: 'fullName',
            headerName: 'Full Name',
            flex: 1,
            minWidth: 170,
            valueGetter: (_, row) => `${row.firstName} ${row.lastName}`.trim(),
        },
        { field: 'username', headerName: 'Username', minWidth: 150 },
        { field: 'age', headerName: 'Age', width: 90 },
        {
            field: 'gender',
            headerName: 'Gender',
            minWidth: 120,
            valueGetter: (_, row) => labelize(row.gender),
        },
        { field: 'contactNumber', headerName: 'Contact Number', minWidth: 160 },
        { field: 'email', headerName: 'Email', flex: 1.1, minWidth: 220 },
        {
            field: 'role',
            headerName: 'Role',
            minWidth: 120,
            valueGetter: (_, row) => labelize(row.role),
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 120,
            sortable: false,
            renderCell: ({ row }) => (
                <Chip
                    size="small"
                    label={row.isActive ? 'Active' : 'Inactive'}
                    color={row.isActive ? 'success' : 'default'}
                    variant={row.isActive ? 'filled' : 'outlined'}
                    sx={{
                        minWidth: 84,
                        justifyContent: 'center',
                        '& .MuiChip-label': {
                            width: '100%',
                            textAlign: 'center',
                        },
                    }}
                />
            ),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 224,
            sortable: false,
            filterable: false,
            align: 'center',
            headerAlign: 'center',
            renderCell: ({ row }) => (
                <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                        width: '100%',
                        height: '100%',
                        py: 0.25,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Button
                        size="small"
                        variant="outlined"
                        onClick={() => openModal(row)}
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
                        Edit
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        onClick={() => toggleStatus(row.id)}
                        sx={{
                            ...actionButtonSx,
                            backgroundColor: row.isActive ? '#18181b' : '#fafaf9',
                            color: row.isActive ? '#fafaf9' : '#18181b',
                            '&:hover': {
                                backgroundColor: row.isActive ? '#27272a' : '#f5f5f4',
                                color: row.isActive ? '#fafaf9' : '#18181b',
                                boxShadow: 'none',
                            },
                        }}
                    >
                        {row.isActive ? 'Disable' : 'Activate'}
                    </Button>
                </Stack>
            ),
        },
    ];

    return (
        <Box sx={{ width: '100%', minWidth: 0 }}>
            <Box 
                sx={{
                    mb: 3,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 2,
                    flexWrap: 'wrap',
                }}
            >
                <Typography component="h1" sx={{ ...sectionHeadingSx, fontSize: '2rem', mb: 0 }}>
                    Users
                </Typography>
                <Button
                    variant="contained"
                    onClick={() => openModal()}
                    sx={{
                        ...actionButtonSx,
                        width: { xs: '100%', sm: 'auto' },
                        backgroundColor: '#18181b',
                        color: '#fafaf9',
                        '&:hover': {
                            backgroundColor: '#27272a',
                            boxShadow: 'none',
                        },
                    }}
                >
                    Add user
                </Button>
            </Box>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
                <TextField
                    label="Search Users"
                    placeholder="Search first name, last name, email, or username"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    fullWidth
                    sx={{ ...dashboardFieldSx, flex: 1 }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon fontSize="small" />
                                </InputAdornment>
                            ),
                        },
                    }}
                />
                <Tooltip title="Open filters">
                    <Button
                        variant={activeFilterCount ? 'contained' : 'outlined'}
                        onClick={openFilters}
                        startIcon={<FilterListIcon />}
                        sx={{
                            ...actionButtonSx,
                            minWidth: { xs: '100%', sm: 150 },
                            whiteSpace: 'nowrap',
                            backgroundColor: activeFilterCount ? '#18181b' : '#fafaf9',
                            color: activeFilterCount ? '#fafaf9' : '#18181b',
                            '&:hover': {
                                backgroundColor: activeFilterCount ? '#27272a' : '#f5f5f4',
                                borderColor: '#18181b',
                                boxShadow: 'none',
                            },
                        }}
                    >
                        {activeFilterCount ? `Filters (${activeFilterCount})` : 'Filters'}
                    </Button>
                </Tooltip>
            </Stack>

            <Popover
                open={Boolean(filterAnchorEl)}
                anchorEl={filterAnchorEl}
                onClose={closeFilters}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                slotProps={{
                    paper: {
                        sx: {
                            p: 2,
                            mt: 1,
                            width: 280,
                            borderRadius: 2,
                        },
                    },
                }}
            >
                <Stack spacing={2}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                        Filter Users
                    </Typography>
                    <TextField
                        select
                        label="Role"
                        name="role"
                        value={filters.role}
                        onChange={handleFilterChange}
                        fullWidth
                        sx={dashboardFieldSx}
                    >
                        <MenuItem value="">All Roles</MenuItem>
                        {roles.map((role) => (
                            <MenuItem key={role} value={role}>
                                {labelize(role)}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        select
                        label="Gender"
                        name="gender"
                        value={filters.gender}
                        onChange={handleFilterChange}
                        fullWidth
                        sx={dashboardFieldSx}
                    >
                        <MenuItem value="">All Genders</MenuItem>
                        {genders.map((gender) => (
                            <MenuItem key={gender} value={gender}>
                                {labelize(gender)}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        select
                        label="Status"
                        name="status"
                        value={filters.status}
                        onChange={handleFilterChange}
                        fullWidth
                        sx={dashboardFieldSx}
                    >
                        <MenuItem value="">All Status</MenuItem>
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="inactive">Inactive</MenuItem>
                    </TextField>
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <Button
                            onClick={clearFilters}
                            variant="outlined"
                            sx={{
                                ...actionButtonSx,
                                minWidth: 88,
                                backgroundColor: '#fafaf9',
                                color: '#18181b',
                                '&:hover': {
                                    backgroundColor: '#f5f5f4',
                                    borderColor: '#18181b',
                                },
                            }}
                        >
                            Clear
                        </Button>
                        <Button
                            variant="contained"
                            onClick={closeFilters}
                            sx={{
                                ...actionButtonSx,
                                minWidth: 88,
                                backgroundColor: '#18181b',
                                color: '#fafaf9',
                                '&:hover': {
                                    backgroundColor: '#27272a',
                                    boxShadow: 'none',
                                },
                            }}
                        >
                            Done
                        </Button>
                    </Stack>
                </Stack>
            </Popover>

            {seed.error ? (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {seed.error}
                </Alert>
            ) : null}

            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 4 }}>
                <Card sx={{ ...cardSx, flex: 1 }}>
                    <CardContent>
                        <Typography sx={statLabelSx}>Total Users</Typography>
                        <Typography sx={{ mt: 1, fontSize: '2rem', fontWeight: 700, color: '#18181b' }}>
                            {users.length}
                        </Typography>
                    </CardContent>
                </Card>
                <Card sx={{ ...cardSx, flex: 1 }}>
                    <CardContent>
                        <Typography sx={statLabelSx}>Filtered Users</Typography>
                        <Typography sx={{ mt: 1, fontSize: '2rem', fontWeight: 700, color: '#18181b' }}>
                            {filteredUsers.length}
                        </Typography>
                    </CardContent>
                </Card>
            </Stack>

            <Typography sx={sectionHeadingSx} gutterBottom>
                User Directory
            </Typography>

            <Paper sx={{ ...cardSx, p: { xs: 1.5, sm: 2 }, minWidth: 0, overflow: 'hidden', mb: 2 }}>
                {filteredUsers.length ? (
                    <Box sx={{ height: { xs: 460, sm: 520 }, width: '100%', minWidth: 0 }}>
                        <DataGrid
                            rows={filteredUsers}
                            columns={columns}
                            disableRowSelectionOnClick
                            pageSizeOptions={[5, 10]}
                            initialState={{
                                pagination: { paginationModel: { pageSize: 5, page: 0 } },
                            }}
                            sx={dataGridSx}
                        />
                    </Box>
                ) : (
                    <Alert severity="info">
                        No users matched your current search or filters.
                    </Alert>   
                )}
            </Paper>

            <Dialog
                open={modal.open}
                onClose={closeModal}
                fullWidth
                fullScreen={isMobile}
                maxWidth="md"
                slotProps={{
                    paper: {
                        sx: modalPaperSx,
                    },
                }}
            >
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: 0,
                    }}
                >
                    <DialogTitle
                        sx={{
                            px: { xs: 2, sm: 3 },
                            py: 2.25,
                            borderBottom: '2px solid #18181b',
                            backgroundColor: '#f5f5f4',
                        }}
                    >
                        <Typography sx={statLabelSx}>
                            User Record
                        </Typography>
                        <Typography component="span" sx={{ mt: 0.75, display: 'block', fontSize: '1.6rem', fontWeight: 800, color: '#18181b' }}>
                            {modal.id ? 'Edit User' : 'Add User'}
                        </Typography>
                    </DialogTitle>
                    <DialogContent
                        dividers
                        sx={{
                            px: { xs: 2, sm: 3 },
                            py: { xs: 2, sm: 3 },
                            borderColor: '#18181b',
                            flex: 1,
                            minHeight: 0,
                            overflowY: 'auto',
                            backgroundColor: '#fafaf9',
                        }}
                    >
                        <Stack spacing={2.25}>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <TextField {...fieldProps('firstName', 'First Name')} />
                                <TextField {...fieldProps('lastName', 'Last Name')} />
                            </Stack>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <TextField {...fieldProps('age', 'Age')} />
                                <TextField {...fieldProps('gender', 'Gender', { select: true })}>
                                    {genders.map((gender) => (
                                        <MenuItem key={gender} value={gender}>
                                            {labelize(gender)}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Stack>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <TextField {...fieldProps('contactNumber', 'Contact Number')} />
                                <TextField {...fieldProps('email', 'Email Address', { type: 'email' })} />
                            </Stack>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <TextField {...fieldProps('role', 'Role', { select: true })}>
                                    {roles.map((role) => (
                                        <MenuItem key={role} value={role}>
                                            {labelize(role)}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField 
                                    {...fieldProps('username', 'Username')}/>
                            </Stack>
                            <TextField 
                                {...fieldProps('password', 'Password', {
                                    type: showPassword ? 'text' : 'password',
                                    slotProps: {
                                        input: {
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        edge="end"
                                                        onClick={() => setShowPassword((prev) => !prev)}
                                                        onMouseDown={(event) => event.preventDefault()}
                                                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        },
                                    },
                                })}
                            />
                            <TextField {...fieldProps('address', 'Address', { multiline: true, rows: 3 })} />
                            <FormControlLabel
                                control={
                                    <Switch
                                        name="isActive"
                                        checked={form.isActive}
                                        onChange={handleChange}
                                        sx={{
                                            '& .MuiSwitch-switchBase.Mui-checked': {
                                                color: '#18181b',
                                            },
                                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                                backgroundColor: '#18181b',
                                                opacity: 1,
                                            },
                                        }}
                                    />
                                }
                                label={form.isActive ? 'User Status: Active' : 'User Status: Inactive'}
                                sx={{
                                    mt: 0.5,
                                    px: 1.5,
                                    py: 1,
                                    border: '2px solid #18181b',
                                    borderRadius: '14px',
                                    backgroundColor: '#f5f5f4',
                                    '& .MuiFormControlLabel-label': {
                                        fontWeight: 700,
                                        color: '#18181b',
                                    },
                                }}
                            />
                        </Stack>
                    </DialogContent>
                    <DialogActions
                        sx={{
                            px: { xs: 2, sm: 3 },
                            py: 2,
                            gap: 1,
                            borderTop: '2px solid #18181b',
                            backgroundColor: '#f5f5f4',
                        }}
                    >
                        <Button
                            onClick={closeModal}
                            variant="outlined"
                            sx={{
                                ...actionButtonSx,
                                minWidth: 112,
                                backgroundColor: '#fafaf9',
                                color: '#18181b',
                                '&:hover': {
                                    backgroundColor: '#f5f5f4',
                                    borderColor: '#18181b',
                                },
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                ...actionButtonSx,
                                minWidth: 132,
                                backgroundColor: '#18181b',
                                color: '#fafaf9',
                                '&:hover': {
                                    backgroundColor: '#27272a',
                                    boxShadow: 'none',
                                },
                            }}
                        >
                            {modal.id ? 'Update User' : 'Save User'}
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </Box>
    );
};

export default UsersPage;
