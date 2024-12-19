import React, { useState, useCallback } from 'react';
import { X, Upload, Check } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { studySessionService } from '../../services/studySession.service';

interface SessionEndModalProps {
  session: any;
  duration: number;
  onComplete: () => void;
  onClose: () => void;
}

const SessionEndModal: React.FC<SessionEndModalProps> = ({
  session,
  duration,
  onComplete,
  onClose,
}) => {
  const [notes, setNotes] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      await studySessionService.endStudySession(session.id, notes, file);
      onComplete();
    } catch (error) {
      console.error('Failed to end session:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold dark:text-white">End Study Session</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Session Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="input-animated h-32"
              placeholder="What did you study? Any key takeaways?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Upload Study Material (PDF)
            </label>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors
                ${isDragActive
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                  : 'border-gray-300 dark:border-gray-600 hover:border-indigo-400 dark:hover:border-indigo-500'
                }`}
            >
              <input {...getInputProps()} />
              {file ? (
                <div className="flex items-center justify-center space-x-2 text-indigo-600 dark:text-indigo-400">
                  <Check className="w-5 h-5" />
                  <span>{file.name}</span>
                </div>
              ) : (
                <div className="text-gray-600 dark:text-gray-400">
                  <Upload className="w-8 h-8 mx-auto mb-2" />
                  <p>Drop your PDF here, or click to select</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="btn-primary"
            >
              {uploading ? 'Saving...' : 'Save Session'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SessionEndModal;