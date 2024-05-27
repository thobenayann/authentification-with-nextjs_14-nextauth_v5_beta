import { CircleAlert } from 'lucide-react';

interface FormErrorProps {
    message?: string;
}

function FormError({ message }: FormErrorProps) {
    if (!message) return null;
    return (
        <div className='bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive'>
            <CircleAlert className='w-4 h-4' />
            <p>{message}</p>
        </div>
    );
}

export default FormError;
