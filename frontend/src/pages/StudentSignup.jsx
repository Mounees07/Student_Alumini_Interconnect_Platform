import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../url';

export default function StudentSignup() {
    const [formData, setFormData] = useState({});
    const [errorMessages, setErrorMessages] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const validateField = (field, value) => {
        switch (field) {
            case 'name':
                if (!/^[A-Za-z\s]+$/.test(value)) {
                    return 'Name should contain only characters and spaces.';
                }
                break;
            case 'contact':
                if (!/^[0-9]+$/.test(value)) {
                    return 'Contact number should contain only numbers.';
                }
                break;
            case 'password':
                if (value.length < 8) {
                    return 'Password should be at least 8 characters long.';
                }
                break;
            case 'studentID':
                if (!/^[A-Za-z0-9]+$/.test(value)) {
                    return 'Student ID should not contain symbols.';
                }
                break;
            default:
                break;
        }
        return null;
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ 
            ...formData, 
            [id]: value.trim() 
        });

        const errorMessage = validateField(id, value.trim());
        setErrorMessages({
            ...errorMessages,
            [id]: errorMessage
        });
    };

    const validateForm = () => {
        const errors = {};
        Object.keys(formData).forEach(field => {
            const error = validateField(field, formData[field]);
            if (error) {
                errors[field] = error;
            }
        });
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setErrorMessages(errors);
            return;
        }

        try {
            setLoading(true);

            const res = await fetch(`${BACKEND_URL}/server/studentauth/student-signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                credentials: 'include',
            });

            const data = await res.json();
            console.log(data);

            if (data.success === false) {
                setErrorMessages({ form: data.message });
                return;
            }

            setLoading(false);
            if (res.ok) {
                navigate('/student-login');
            }
        } catch (error) {
            setErrorMessages({ form: error.message });
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
                                placeholder='name'
                                id='name'
                                onChange={handleChange}
                            />
                            {errorMessages.name && <p className='text-red-500 text-sm'>{errorMessages.name}</p>}
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
                            {errorMessages.password && <p className='text-red-500 text-sm'>{errorMessages.password}</p>}
                        </div>
                        <div>
                            <Label value='Your StudentID' />
                            <TextInput
                                type='text'
                                placeholder='StudentID'
                                id='studentID'
                                onChange={handleChange}
                            />
                            {errorMessages.studentID && <p className='text-red-500 text-sm'>{errorMessages.studentID}</p>}
                        </div>
                        <div>
                            <Label value='Your contact' />
                            <TextInput
                                type='text'
                                placeholder='contact'
                                id='contact'
                                onChange={handleChange}
                            />
                            {errorMessages.contact && <p className='text-red-500 text-sm'>{errorMessages.contact}</p>}
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
                        <Link to='/student-login' className='text-blue-500'>
                            Sign In
                        </Link>
                    </div>
                    {errorMessages.form && (
                        <Alert className='mt-5' color='failure'>
                            {errorMessages.form}
                        </Alert>
                    )}
                </div>
            </div>
        </div>
    );
}