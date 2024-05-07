import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from "./ui/button";
import { CopyIcon, Share2 } from 'lucide-react';
import { Save } from 'lucide-react';
import { toast } from "sonner"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { CompilerSliceStateType, updateCurrentLanguage } from '@/redux/slices/compilerSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { DialogClose } from '@radix-ui/react-dialog';
import { InputIcon } from '@radix-ui/react-icons';

const HelperHeader = () => {
    const [saveLoading, setsaveLoading] = useState<boolean>(false);
    const [Sharebtn, setSharebtn] = useState<boolean>(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const fullCode = useSelector((state: RootState) => state.compilerSlice.fullCode);
    const currentLanguage = useSelector((state: RootState) => state.compilerSlice.currentLanguage);

    const {urlId}=useParams();
    useEffect(()=>{
        if(urlId){
            setSharebtn(true);
        }
        else{
            setSharebtn(false);
        }
    },[urlId])
    const handleSaveCode = async () => {
        setsaveLoading(true);
        try {
            // Make sure fullCode is not empty or null before sending the request

            const response = await axios.post("http://localhost:4000/compiler/save", {
                fullCode: fullCode,
            });

            console.log(response.data);
            navigate(`/compiler/${response.data.url}`, { replace: true });
        } catch (error) {
            console.error("Error while saving code:", error);
            // Optionally, you can handle the error here or show a notification to the user
        }
        finally {
            setsaveLoading(false);
        }
    };

    return (
        <div className="__helper_header h-[50px] bg-black text-white p-2 flex justify-between items-center">
            <div className="__btn_container flex gap-2">
                <Button className="flex justify-center items-center gap-1" onClick={handleSaveCode} variant="success" disabled={saveLoading}>
                    <Save size={20} />{saveLoading ? "Saving.." : "Save"}
                </Button>
                {/* <Dialog>
                    <DialogTrigger className="whitespace-nowrap rounded-md text-sm font-medium 
                    transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
                     disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground 
                     shadow-sm hover:bg-secondary/80 h-9 px-4 py-2 flex justify-center items-center gap-1">Share</DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog> */}
                {Sharebtn&&( <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Share</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <label htmlFor="link" className="sr-only">
              Link
            </label>
            <input
              id="link" className='text-black'
              defaultValue={window.location.href}
              readOnly
            />
          </div>
        
          <Button type="submit" size="sm" className="px-3" onClick={()=>{
                window.navigator.clipboard.writeText(window.location.href);
                toast("URL has been copied to clipboard")
            }}>
            <span className="sr-only" >Copy</span>
            <CopyIcon className="h-4 w-4" />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>)}
                

                
            </div>
            <div className="__tab_switcher flex justify-center items-center gap-1">
                <small>Current Language:</small>
                <Select defaultValue={currentLanguage} onValueChange={(value) => dispatch(updateCurrentLanguage(value as CompilerSliceStateType["currentLanguage"]))}>
                    <SelectTrigger className="w-[180px] bg-gray-800 outline-none focus:ring-0">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="html">HTML</SelectItem>
                            <SelectItem value="css">CSS</SelectItem>
                            <SelectItem value="javascript">Javascript</SelectItem>
                           
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export default HelperHeader;
