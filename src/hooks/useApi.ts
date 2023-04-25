import { useState } from 'react';

const defaultHeaders = { 'Content-Type': 'application/json' };

const useApi = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSuccess = async (res: Response) => {
    setLoading(false);
    const data = await res.json();
    return data;
  };

  const handleError = () => {
    alert('Error')
  };

  const callGet = async (url: string) => {
    setLoading(true)
    return await fetch(url, { method: 'GET' })
      .then(handleSuccess)
      .catch(handleError)
  }

  const callPost = async (url: string, data: any) => {
    setLoading(true)
    return await fetch(url, {
      method: 'POST', headers: { ...defaultHeaders }, body: JSON.stringify(data)
    })
      .then(handleSuccess)
      .catch(handleError)
  }

  const callPut = async (url: string, data: any) => {
    setLoading(true)
    return await fetch(url, { method: 'PUT', headers: { ...defaultHeaders }, body: JSON.stringify(data) })
      .then(handleSuccess)
      .catch(handleError);
  }

  const callDelete = async (url: string) => {
    setLoading(true)
    return await fetch(url, { method: 'DELETE' })
      .then(handleSuccess)
      .catch(handleError)
  }


  return {
    loading,
    callGet,
    callPost,
    callPut,
    callDelete,
  };
};

export default useApi;