import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Button from '../../components/Button';
import { createUser } from '../../services/UserService';

const inputClasses = 'mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-zinc-50';
const selectClasses = `${inputClasses} appearance-none`;
const actionButtonClassName = 'w-full rounded-xl py-3 text-[11px] tracking-[0.2em]';

const blankForm = {
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    contactNumber: '',
    email: '',
    username: '',
    password: '',
    address: '',
};

const SignUpPage = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState(blankForm);
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = ({ target: { name, value } }) => {
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
        setApiError('');
        setSuccessMessage('');
    };

    const validate = () => {
        const nextErrors = {};
        const age = form.age.trim();
        const contactNumber = form.contactNumber.trim();
        const email = form.email.trim().toLowerCase();
        const username = form.username.trim();

        [
            ['firstName', 'First Name'],
            ['lastName', 'Last Name'],
            ['age', 'Age'],
            ['gender', 'Gender'],
            ['contactNumber', 'Contact Number'],
            ['email', 'Email'],
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

        if (!nextErrors.username && /\s/.test(username)) {
            nextErrors.username = 'Username must not contain spaces.';
        }

        if (!nextErrors.password && form.password.length < 8) {
            nextErrors.password = 'Password must be at least 8 characters.';
        }

        return nextErrors;
    };

    const fieldError = (name) =>
        errors[name] ? (
            <p className='mt-2 text-xs font-medium text-red-600'>{errors[name]}</p>
        ) : null;

    const handleSubmit = async (event) => {
        event.preventDefault();
        const nextErrors = validate();

        if (Object.keys(nextErrors).length) {
            setErrors(nextErrors);
            return;
        }

        try {
            setIsSubmitting(true);
            setApiError('');

            await createUser({
                firstName: form.firstName.trim(),
                lastName: form.lastName.trim(),
                age: form.age.trim(),
                gender: form.gender.trim().toLowerCase(),
                contactNumber: form.contactNumber.trim(),
                email: form.email.trim().toLowerCase(),
                type: 'editor',
                username: form.username.trim().toLowerCase(),
                password: form.password,
                address: form.address.trim(),
                isActive: true,
            });

            setSuccessMessage('Account created successfully. Redirecting to login...');
            setForm(blankForm);
            setTimeout(() => navigate('/auth/signin'), 1200);
        } catch (error) {
            setApiError(error.response?.data?.message || 'Unable to create account. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div 
                className="pointer-events-none fixed inset-0 z-50 opacity-[0.27] mix-blend-multiply"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />   
            <h1 className='text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl'>Sign Up</h1>
            <p className='mt-3 text-sm leading-6 text-zinc-600'>
                Create your Typed account to save your profile and access the dashboard.
            </p>

            <form className='mt-8 space-y-5' onSubmit={handleSubmit}>
                {apiError ? (
                    <div className='rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-700'>
                        {apiError}
                    </div>
                ) : null}

                {successMessage ? (
                    <div className='rounded-xl border border-green-300 bg-green-50 px-4 py-3 text-sm font-medium text-green-700'>
                        {successMessage}
                    </div>
                ) : null}

                <div className='grid gap-5 sm:grid-cols-2'>
                    <div>
                        <label htmlFor='first-name' className='text-sm font-medium text-zinc-700'>
                            First Name
                        </label>
                        <input
                            id='first-name'
                            name='firstName'
                            type='text'
                            value={form.firstName}
                            onChange={handleChange}
                            placeholder='Parlor'
                            autoComplete='given-name'
                            className={inputClasses}
                        />
                        {fieldError('firstName')}
                    </div>
                    <div>
                        <label htmlFor='last-name' className='text-sm font-medium text-zinc-700'>
                            Last Name
                        </label>
                        <input
                            id='last-name'
                            name='lastName'
                            type='text'
                            value={form.lastName}
                            onChange={handleChange}
                            placeholder='Panther'
                            autoComplete='family-name'
                            className={inputClasses}
                        />
                        {fieldError('lastName')}
                    </div>
                </div>

                <div className='grid gap-5 sm:grid-cols-2'>
                    <div>
                        <label htmlFor='signup-age' className='text-sm font-medium text-zinc-700'>
                            Age
                        </label>
                        <input
                            id='signup-age'
                            name='age'
                            type='text'
                            value={form.age}
                            onChange={handleChange}
                            placeholder='21'
                            inputMode='numeric'
                            className={inputClasses}
                        />
                        {fieldError('age')}
                    </div>
                    <div>
                        <label htmlFor='signup-gender' className='text-sm font-medium text-zinc-700'>
                            Gender
                        </label>
                        <div className='relative'>
                            <select
                                id='signup-gender'
                                name='gender'
                                value={form.gender}
                                onChange={handleChange}
                                className={`${selectClasses} pr-10`}
                            >
                                <option value=''>Select gender</option>
                                <option value='male'>Male</option>
                                <option value='female'>Female</option>
                                <option value='other'>Other</option>
                            </select>
                            <KeyboardArrowDownIcon className='pointer-events-none absolute right-3 top-1/2 -translate-y-[35%] text-zinc-500' fontSize='small' />
                        </div>
                        {fieldError('gender')}
                    </div>
                </div>

                <div>
                    <label htmlFor='signup-contact-number' className='text-sm font-medium text-zinc-700'>
                        Contact Number
                    </label>
                    <input
                        id='signup-contact-number'
                        name='contactNumber'
                        type='text'
                        value={form.contactNumber}
                        onChange={handleChange}
                        placeholder='09123456789'
                        autoComplete='tel'
                        inputMode='numeric'
                        className={inputClasses}
                    />
                    {fieldError('contactNumber')}
                </div>

                <div>
                    <label htmlFor='signup-email' className='text-sm font-medium text-zinc-700'>
                        Email
                    </label>
                    <input
                        id='signup-email'
                        name='email'
                        type='email'
                        value={form.email}
                        onChange={handleChange}
                        placeholder='bombay.parlorpanther@example.com'
                        autoComplete='email'
                        className={inputClasses}
                    />
                    {fieldError('email')}
                </div>

                <div>
                    <label htmlFor='signup-username' className='text-sm font-medium text-zinc-700'>
                        Username
                    </label>
                    <input
                        id='signup-username'
                        name='username'
                        type='text'
                        value={form.username}
                        onChange={handleChange}
                        placeholder='parlorpanther'
                        autoComplete='username'
                        className={inputClasses}
                    />
                    {fieldError('username')}
                </div>

                <div>
                    <label htmlFor='signup-password' className='text-sm font-medium text-zinc-700'>
                        Password
                    </label>
                    <input
                        id='signup-password'
                        name='password'
                        type='password'
                        value={form.password}
                        onChange={handleChange}
                        placeholder='Password'
                        autoComplete='new-password'
                        className={inputClasses}
                    />
                    {fieldError('password')}
                    <p className='mt-2 text-xs leading-5 text-zinc-500'>
                        It must be a combination of minimum 8 letters, numbers, and symbols.
                    </p>
                </div>

                <div>
                    <label htmlFor='signup-address' className='text-sm font-medium text-zinc-700'>
                        Address
                    </label>
                    <textarea
                        id='signup-address'
                        name='address'
                        value={form.address}
                        onChange={handleChange}
                        placeholder='Enter your address'
                        rows={3}
                        className={inputClasses}
                    />
                    {fieldError('address')}
                </div>

                <Button type='submit' variant='primary' className={actionButtonClassName} disabled={isSubmitting}>
                    {isSubmitting ? 'Creating Account...' : 'Create Account'}
                </Button>

                <div className='grid gap-3 pt-2 sm:grid-cols-2'>
                    <Button type='button' variant='secondary' className={actionButtonClassName}>
                        Sign Up with Google
                    </Button>
                    <Button type='button' variant='secondary' className={actionButtonClassName}>
                        Sign Up with Apple
                    </Button>
                </div>
            </form>

            <div className='mt-8 border-t border-zinc-200 pt-6 text-sm text-zinc-600'>
                Already have an account?{' '}
                <Link to='/auth/signin' className='font-semibold text-zinc-900 transition hover:text-zinc-600'>
                    Log In
                </Link>
            </div>
        </>
    );
};

export default SignUpPage;
