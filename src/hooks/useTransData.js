import { useState, useEffect, useMemo } from 'react';

export function useTransData(selectedYear) {
  const [allTransactions, setAllTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('data/transactions.json');
      const data = await response.json();
      setAllTransactions(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setSelectedMonth(null);
  }, [selectedYear]);

  const availableMonths = useMemo(() => {
    const monthsSet = new Set();
    const year = Number(selectedYear);
    allTransactions.forEach((tx) => {
      const date = new Date(tx.datetime);
      if (date.getFullYear() === year) {
        monthsSet.add(date.getMonth());
      }
    });
    return Array.from(monthsSet).sort((a, b) => a - b);
  }, [allTransactions, selectedYear]);

  const filteredTransactions = useMemo(() => {
    const year = Number(selectedYear);
    return allTransactions.filter((tx) => {
      const date = new Date(tx.datetime);
      return (
        date.getFullYear() === year &&
        (selectedMonth === null || date.getMonth() === selectedMonth)
      );
    });
  }, [allTransactions, selectedYear, selectedMonth]);

  const monthNames = useMemo(() => [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ], []);

  return {
    allTransactions,
    selectedMonth,
    setSelectedMonth,
    availableMonths,
    filteredTransactions,
    monthNames,
  };
}
