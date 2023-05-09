import { useEffect, useState } from 'react';
import { customerData$, DEFAULT } from 'webkit/stores/user';
export const useCustomerData = () => {
  const [data, setData] = useState(DEFAULT);
  useEffect(() => customerData$.subscribe(val => setData(val)), []);
  return data;
};