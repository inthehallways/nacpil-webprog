import { useEffect, useState } from 'react';
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
    InputAdornment,
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
import { DataGrid } from '@mui/x-data-grid';
import {
    createArticle,
    deleteArticle,
    fetchArticles,
    updateArticle,
} from '../../services/ArticleService';

const blankForm = {
    title: '',
    name: '',
    image: '',
    content: '',
    isPublished: true,
};

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
    borderRadius: '20px',
    backgroundColor: '#f5f5f4',
    boxShadow: 'none',
};

const statCardSx = {
    ...cardSx,
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

const tableActionButtonSx = {
    ...actionButtonSx,
    minWidth: 72,
    minHeight: 30,
    borderRadius: '10px',
    px: 1,
    py: 0,
    fontSize: '0.55rem',
    letterSpacing: '0.16em',
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

const slugify = (value) =>
    value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

const normalizeArticle = (article) => ({
    id: article._id || article.id,
    title: String(article.title ?? '').trim(),
    name: String(article.name ?? '').trim(),
    image: String(article.image ?? '').trim(),
    content: Array.isArray(article.content)
        ? article.content
        : String(article.content ?? '')
            .split('\n')
            .map((paragraph) => paragraph.trim())
            .filter(Boolean),
    isPublished: typeof article.isPublished === 'boolean' ? article.isPublished : true,
});

const buildArticlePayload = (form) => ({
    title: form.title.trim(),
    name: slugify(form.name || form.title),
    image: form.image.trim(),
    content: form.content
        .split('\n')
        .map((paragraph) => paragraph.trim())
        .filter(Boolean),
    isPublished: form.isPublished,
});

const DashArticleListPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [articles, setArticles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [modal, setModal] = useState({ open: false, id: null });
    const [form, setForm] = useState(blankForm);
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const loadArticles = async () => {
            try {
                setIsLoading(true);
                setApiError('');
                const { data } = await fetchArticles();
                setArticles(data.map(normalizeArticle));
            } catch (error) {
                setApiError(error.response?.data?.message || 'Unable to load articles from the server.');
            } finally {
                setIsLoading(false);
            }
        };

        loadArticles();
    }, []);

    const resetForm = () => {
        setForm({ ...blankForm });
        setErrors({});
    };

    const openModal = (article) => {
        setModal({ open: true, id: article?.id ?? null });
        setForm(
            article
                ? { ...blankForm, ...article, content: article.content.join('\n\n') }
                : { ...blankForm }
        );
        setErrors({});
        setApiError('');
    };

    const closeModal = () => {
        setModal({ open: false, id: null });
        resetForm();
    };

    const handleChange = ({ target: { name, value, checked, type } }) => {
        setForm((prev) => {
            const nextForm = {
                ...prev,
                [name]: type === 'checkbox' ? checked : value,
            };

            if (name === 'title' && !prev.name.trim()) {
                nextForm.name = slugify(value);
            }

            return nextForm;
        });

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const nextErrors = {};
        const payload = buildArticlePayload(form);

        [
            ['title', 'Title'],
            ['name', 'Slug'],
            ['image', 'Image URL'],
            ['content', 'Content'],
        ].forEach(([key, label]) => {
            if (!String(form[key]).trim()) {
                nextErrors[key] = `${label} is required.`;
            }
        });

        if (!nextErrors.name && !payload.name) {
            nextErrors.name = 'Slug must contain letters or numbers.';
        }

        if (!nextErrors.content && !payload.content.length) {
            nextErrors.content = 'Add at least one paragraph.';
        }

        if (
            !nextErrors.name &&
            articles.some((article) => article.id !== modal.id && article.name === payload.name)
        ) {
            nextErrors.name = 'Article slug already exists.';
        }

        return nextErrors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const nextErrors = validate();

        if (Object.keys(nextErrors).length) {
            setErrors(nextErrors);
            return;
        }

        try {
            setIsSaving(true);
            setApiError('');

            const payload = buildArticlePayload(form);
            const { data } = modal.id
                ? await updateArticle(modal.id, payload)
                : await createArticle(payload);
            const savedArticle = normalizeArticle(data);

            setArticles((prev) =>
                modal.id
                    ? prev.map((article) => (article.id === modal.id ? savedArticle : article))
                    : [savedArticle, ...prev]
            );
            closeModal();
        } catch (error) {
            setApiError(error.response?.data?.message || 'Unable to save article.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            setApiError('');
            await deleteArticle(id);
            setArticles((prev) => prev.filter((article) => article.id !== id));
        } catch (error) {
            setApiError(error.response?.data?.message || 'Unable to delete article.');
        }
    };

    const togglePublished = async (id) => {
        const targetArticle = articles.find((article) => article.id === id);
        if (!targetArticle) {
            return;
        }

        try {
            setApiError('');
            const payload = {
                ...targetArticle,
                isPublished: !targetArticle.isPublished,
            };
            const { data } = await updateArticle(id, payload);
            const savedArticle = normalizeArticle(data);

            setArticles((prev) =>
                prev.map((article) => (article.id === id ? savedArticle : article))
            );
        } catch (error) {
            setApiError(error.response?.data?.message || 'Unable to update article status.');
        }
    };

    const filteredArticles = articles.filter((article) => {
        const normalizedSearch = searchTerm.trim().toLowerCase();
        return (
            !normalizedSearch ||
            article.title.toLowerCase().includes(normalizedSearch) ||
            article.name.toLowerCase().includes(normalizedSearch)
        );
    });

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
        { field: 'name', headerName: 'Slug', flex: 0.9, minWidth: 180 },
        { field: 'title', headerName: 'Title', flex: 1.2, minWidth: 220 },
        {
            field: 'paragraphs',
            headerName: 'Paragraphs',
            width: 130,
            valueGetter: (_, row) => row.content.length,
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 130,
            sortable: false,
            renderCell: ({ row }) => (
                <Chip
                    size="small"
                    label={row.isPublished ? 'Published' : 'Draft'}
                    color={row.isPublished ? 'success' : 'default'}
                    variant={row.isPublished ? 'filled' : 'outlined'}
                    sx={{
                        minWidth: 92,
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
            width: 270,
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
                            ...tableActionButtonSx,
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
                        onClick={() => togglePublished(row.id)}
                        sx={{
                            ...tableActionButtonSx,
                            minWidth: 96,
                            backgroundColor: row.isPublished ? '#18181b' : '#fafaf9',
                            color: row.isPublished ? '#fafaf9' : '#18181b',
                            '&:hover': {
                                backgroundColor: row.isPublished ? '#27272a' : '#f5f5f4',
                                color: row.isPublished ? '#fafaf9' : '#18181b',
                                boxShadow: 'none',
                            },
                        }}
                    >
                        {row.isPublished ? 'Unpublish' : 'Publish'}
                    </Button>
                    <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleDelete(row.id)}
                        sx={{
                            ...tableActionButtonSx,
                            backgroundColor: '#fafaf9',
                            color: '#b91c1c',
                            borderColor: '#b91c1c',
                            '&:hover': {
                                backgroundColor: '#fee2e2',
                                borderColor: '#991b1b',
                            },
                        }}
                    >
                        Delete
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
                    Articles
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
                    Add Article
                </Button>
            </Box>

            <TextField
                label="Search Articles"
                placeholder="Search title or slug"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                fullWidth
                sx={{ ...dashboardFieldSx, mb: 3 }}
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

            {apiError ? (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {apiError}
                </Alert>
            ) : null}

            {isLoading ? (
                <Alert severity="info" sx={{ mb: 2 }}>
                    Loading articles from the server...
                </Alert>
            ) : null}

            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 4 }}>
                <Card sx={{ ...statCardSx, flex: 1 }}>
                    <CardContent>
                        <Typography sx={statLabelSx}>Total Articles</Typography>
                        <Typography sx={{ mt: 1, fontSize: '2rem', fontWeight: 700, color: '#18181b' }}>
                            {articles.length}
                        </Typography>
                    </CardContent>
                </Card>
                <Card sx={{ ...statCardSx, flex: 1 }}>
                    <CardContent>
                        <Typography sx={statLabelSx}>Published</Typography>
                        <Typography sx={{ mt: 1, fontSize: '2rem', fontWeight: 700, color: '#18181b' }}>
                            {articles.filter((article) => article.isPublished).length}
                        </Typography>
                    </CardContent>
                </Card>
            </Stack>

            <Typography sx={sectionHeadingSx} gutterBottom>
                Article Directory
            </Typography>

            <Paper sx={{ ...cardSx, p: { xs: 1.5, sm: 2 }, minWidth: 0, overflow: 'hidden', mb: 2 }}>
                {filteredArticles.length ? (
                    <Box sx={{ height: { xs: 460, sm: 520 }, width: '100%', minWidth: 0 }}>
                        <DataGrid
                            rows={filteredArticles}
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
                        No articles matched your current search.
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
                            Article Record
                        </Typography>
                        <Typography component="span" sx={{ mt: 0.75, display: 'block', fontSize: '1.6rem', fontWeight: 800, color: '#18181b' }}>
                            {modal.id ? 'Edit Article' : 'Add Article'}
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
                            <TextField {...fieldProps('title', 'Title')} />
                            <TextField {...fieldProps('name', 'Slug')} />
                            <TextField {...fieldProps('image', 'Image URL')} />
                            <TextField
                                {...fieldProps('content', 'Content', {
                                    multiline: true,
                                    minRows: 8,
                                    helperText: errors.content || 'Separate paragraphs with a blank line.',
                                })}
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        name="isPublished"
                                        checked={form.isPublished}
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
                                label={form.isPublished ? 'Article Status: Published' : 'Article Status: Draft'}
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
                            disabled={isSaving}
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
                            {isSaving ? 'Saving...' : modal.id ? 'Update Article' : 'Save Article'}
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </Box>
    );
};

export default DashArticleListPage;
