import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { validateToken, uploadFile, fetchUploadedFiles, deleteFile } from './indexRequests'; 
import styles from '../styles/home.module.css'


interface UploadedFile {
  filename: string;
  text: string;
}

const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [showNoFileSelected, setShowNoFileSelected] = useState(false);
  const [showPdfText, setShowPdfText] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      router.push('/login');
      return;
    }

    validateToken(token)
      .then((isValid: any) => {
        fetchUploadedFiles().then(setUploadedFiles);
        if (!isValid) {
          throw new Error('Invalid token');
        }
      })
      .catch(() => {
        router.push('/login');
      });
  }, [router]);



  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
      setShowNoFileSelected(false);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setShowNoFileSelected(true);
      return;
    }
    try {
      await uploadFile(file);
      fetchUploadedFiles().then(setUploadedFiles);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleDeletion = async (filename: string) => {
    try {
      await deleteFile(filename);
      fetchUploadedFiles().then(setUploadedFiles);
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const togglePdfText = (index: number) => {
    setShowPdfText(showPdfText === index ? null : index);
  };

  const handleLogout = () => {
    Cookies.remove('token');
    router.push('/login');
  };

  return (
    <div className={styles.container}>
      <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
      <div className={styles.headers}>
        <h1>Upload PDFs</h1>
      </div>

      {showNoFileSelected && (
        <div className={styles.notification}>No file selected</div>
      )}

      <div className={styles.fileInputContainer}>
        <input type="file" accept=".pdf" onChange={handleFileChange} />
        <button className={styles.homecontainerButton} onClick={handleUpload}>Upload PDF</button>
      </div>

      <div className={styles.filesListContainer}>
        <h2>Uploaded PDFs</h2>
        <ul>
          {uploadedFiles.map((fileData, index) => (
            <li key={index}>
              {fileData.filename}
              <button className={styles.homecontainerButton} onClick={() => handleDeletion(fileData.filename)}>
                Delete
              </button>
              <button className={styles.homecontainerButton} onClick={() => togglePdfText(index)}>
                {showPdfText === index ? 'Hide Text' : 'Show Text'}
              </button>
              {showPdfText === index && <p>{fileData.text}</p>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UploadPage