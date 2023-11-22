
export const validateToken = async (token: string) => {
    const response = await fetch('http://localhost:8080/api/v1/validate-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });
  
    if (response.ok) {
      return true;
    } else {
      throw new Error('Token validation failed');
    }
  };