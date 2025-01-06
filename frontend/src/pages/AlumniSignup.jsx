import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../url';

export default function AlumniSignup() {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const validateField = (id, value) => {
        const nameRegex = /^[a-zA-Z\s]+$/;
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        const studentIdRegex = /^[a-zA-Z0-9]+$/;
        const contactRegex = /^\d+$/;

        switch (id) {
            case 'name':
                if (!value || !nameRegex.test(value)) return 'Name should not contain symbols or numbers.';
                break;
            case 'password':
                if (!value || !passwordRegex.test(value)) return 'Password must be at least 8 characters long, include one uppercase letter, and one special character.';
                break;
            case 'studentID':
                if (!value || !studentIdRegex.test(value)) return 'Student ID should not contain special characters.';
                break;
            case 'contact':
                if (!value || !contactRegex.test(value)) return 'Contact should contain numbers only.';
                break;
            case 'startDate':
                if (!value || new Date(value).toDateString() === new Date().toDateString())
                    return 'Start date should not be the current date.';
                break;
            default:
                return null;
        }
        return null;
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        const error = validateField(id, value.trim());
        setErrors({ ...errors, [id]: error });
        setFormData({ ...formData, [id]: value.trim() });
    };

    const validateForm = () => {
        for (let key in formData) {
            const error = validateField(key, formData[key]);
            if (error) return error;
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationError = validateForm();
        if (validationError) {
            return setErrorMessage(validationError);
        }

        if (!formData.email || !formData.company || !formData.role || !formData.linkedinUrl || !formData.graduationYear) {
            return setErrorMessage('Please fill out all fields.');
        }

        try {
            setLoading(true);
            setErrorMessage(null);

            const res = await fetch(`${BACKEND_URL}/server/studentauth/alumni-signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                credentials: 'include',
            });

            const data = await res.json();

            if (data.success === false) {
                return setErrorMessage(data.message);
            }

            setLoading(false);

            if (res.ok) {
                navigate('/alumni-login');
            }
        } catch (error) {
            setErrorMessage(error.message);
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen mt-20'>
            <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
                <div className='flex-1'>
                    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                        <div>
                            <Label value='Your name' />
                            <TextInput
                                type='text'
                                placeholder='Name'
                                id='name'
                                onChange={handleChange}
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                        </div>
                        <div>
                            <Label value='Your email' />
                            <TextInput
                                type='email'
                                placeholder='name@company.com'
                                id='email'
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label value='Your password' />
                            <TextInput
                                type='password'
                                placeholder='Password'
                                id='password'
                                onChange={handleChange}
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                        </div>
                        <div>
                            <Label value='Your student ID' />
                            <TextInput
                                type='text'
                                placeholder='Student ID'
                                id='studentID'
                                onChange={handleChange}
                            />
                            {errors.studentID && <p className="text-red-500 text-sm">{errors.studentID}</p>}
                        </div>
                        <div>
                            <Label value='Your contact' />
                            <TextInput
                                type='number'
                                placeholder='Contact'
                                id='contact'
                                onChange={handleChange}
                            />
                            {errors.contact && <p className="text-red-500 text-sm">{errors.contact}</p>}
                        </div>
                        <div>
                            <Label value='Your graduation year' />
                            <TextInput
                                type='number'
                                placeholder='Graduation Year'
                                id='graduationYear'
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label value='Your company' />
                            <TextInput
                                type='text'
                                placeholder='Company'
                                id='company'
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label value='Your start date' />
                            <TextInput
                                type='date'
                                placeholder='Start Date'
                                id='startDate'
                                onChange={handleChange}
                            />
                            {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate}</p>}
                        </div>
                        <div>
                            <Label value='Your role' />
                            <TextInput
                                type='text'
                                placeholder='Role'
                                id='role'
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label value='Your LinkedIn URL' />
                            <TextInput
                                type='text'
                                placeholder='LinkedIn URL'
                                id='linkedinUrl'
                                onChange={handleChange}
                            />
                        </div>
                        <Button type='submit' disabled={loading}>
                            {loading ? (
                                <>
                                    <Spinner size='sm' />
                                    <span className='pl-3'>Loading...</span>
                                </>
                            ) : (
                                'Sign Up'
                            )}
                        </Button>
                    </form>
                    <div className='flex gap-2 text-sm mt-5'>
                        <span>Have an account?</span>
                        <Link to='/alumni-login' className='text-blue-500'>
                            Sign In
                        </Link>
                    </div>
                    {errorMessage && (
                        <Alert className='mt-5' color='failure'>
                            {errorMessage}
                        </Alert>
                    )}
                </div>
            </div>
        </div>
    );
}
