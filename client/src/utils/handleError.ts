import { Response } from 'express';
import { toast } from 'react-toastify';

// Your existing code...

async function saveCode( res: Response) {
    try {
       
        // Assuming you want to display a success message

            toast.success('Code saved successfully!', {
                position: 'top-right'
            }),
    
            res.json({ success: true, message: 'Code saved successfully!' });
        

        res.json({ success: true, message: 'Code saved successfully!' });
    } catch (error) {
        // Handle errors...
       
            console.log(error);
        
    }
}

export { saveCode };
