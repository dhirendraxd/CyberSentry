
import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, AlertTriangle } from 'lucide-react';
import { useAnonymousData } from '@/hooks/useAnonymousData';

const DeleteDataDialog: React.FC = () => {
  const [confirmText, setConfirmText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { deleteAllUserData } = useAnonymousData();

  const handleDelete = async () => {
    await deleteAllUserData();
    setIsOpen(false);
    setConfirmText('');
  };

  const isConfirmValid = confirmText.toLowerCase() === 'delete my data';

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          className="w-full bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-400 hover:text-red-300"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete All My Data
        </Button>
      </AlertDialogTrigger>
      
      <AlertDialogContent className="bg-black/40 backdrop-blur-xl border border-red-500/30 shadow-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-500/20">
              <AlertTriangle className="h-5 w-5 text-red-500" />
            </div>
            Delete All Data
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-300 space-y-3">
            <p>
              This action will permanently delete:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>All your email addresses entered on this site</li>
              <li>All scan results and security history</li>
              <li>All activity logs and saved data</li>
              <li>Your anonymous session and tracking data</li>
            </ul>
            <p className="font-semibold text-red-400">
              This action cannot be undone!
            </p>
            <div className="mt-4">
              <label className="text-sm text-gray-400 block mb-2">
                Type "delete my data" to confirm:
              </label>
              <Input
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="delete my data"
                className="bg-black/20 border-red-500/30 text-white placeholder:text-gray-500"
              />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <AlertDialogFooter>
          <AlertDialogCancel 
            onClick={() => {
              setConfirmText('');
              setIsOpen(false);
            }}
            className="bg-black/20 border-white/10 text-white hover:bg-black/30"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={!isConfirmValid}
            className="bg-red-600 hover:bg-red-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Delete All Data
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDataDialog;
