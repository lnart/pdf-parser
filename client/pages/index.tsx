import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { validateToken } from './indexRequests'; 


const UploadPage = () => {

  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      router.push('/login');
      return;
    }

    validateToken(token)
      .then((isValid: any) => {
        if (!isValid) {
          throw new Error('Invalid token');
        }
      })
      .catch(() => {
        router.push('/login');
      });
  }, [router]);

}

export default UploadPage