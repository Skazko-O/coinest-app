import { useEffect, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';

export default function TransactionTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 12,
  });

  useEffect(() => {
    fetch('data/transactions.json')
      .then(res => {
        if (!res.ok) throw new Error('Fetch failed');
        return res.json();
      })
      .then(json => setData(json))
      .catch(err => {
        console.error('Fetch error:', err);
        setData([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    {
      accessorKey: 'name',
      header: 'Transaction Name',
      cell: info => {
        const row = info.row.original;
        return (
          <div>
            <div><strong>{row.name}</strong></div>
            <div style={{ fontSize: '0.85em', color: '#666' }}>{row.category}</div>
          </div>
        );
      },
    },
    { accessorKey: 'account', header: 'Account' },
    { accessorKey: 'id', header: 'Transaction ID' },
    {
      accessorKey: 'datetime',
      header: 'Date & Time',
      cell: info => {
        const raw = info.getValue();
        const date = new Date(raw);
        const dateStr = date.toISOString().slice(0, 10);
        const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        return (
          <div>
            <div>{dateStr}</div>
            <div style={{ fontSize: '0.85em', color: '#666' }}>{timeStr}</div>
          </div>
        );
      },
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: info => {
        const row = info.row.original;
        const isIncome = row.type === 'income';
        const prefix = isIncome ? '+' : '-';
        const color = isIncome ? 'green' : 'red';

        return (
          <span style={{ color }}>
            {prefix}${row.amount.toFixed(2)}
          </span>
        );
      },
    },
    { accessorKey: 'note', header: 'Note' },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: info => {
        const status = info.getValue();
        return (
          <span style={{ color: status === 'Failed' ? 'red' : 'green' }}>
            {status}
          </span>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (loading) return <div>Loading transactions...</div>;

  return (
    <>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} style={{ padding: '8px', textAlign: 'left' }}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getPaginationRowModel().rows.map(row => (
            <tr key={row.id} style={{ borderBottom: '1px solid #E5E6E6' }}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} style={{ padding: '8px' }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <PaginationControls table={table} pagination={pagination} />
    </>
  );
}

function PaginationControls({ table, pagination }) {
  const pageCount = table.getPageCount();
  const current = pagination.pageIndex;
  const maxVisible = 5;
  const totalItems = table.getPrePaginationRowModel().rows.length;

  const start = Math.max(0, Math.min(current - 2, pageCount - maxVisible));
  const end = Math.min(pageCount, start + maxVisible);

  const pages = [];
  for (let i = start; i < end; i++) {
    pages.push(
      <button
        key={i}
        onClick={() => table.setPageIndex(i)}
        style={{
          fontSize: '10px',
          fontWeight: '500',
          color: i === current ? '#FBFBFC' : 'var(--green-text-color)',
          padding: '6px 10px',
          background: i === current ? 'var(--green-text-color)' : 'var(--green-bg)',
          borderRadius: '7px',
        }}
      >
        {i + 1}
      </button>
    );
  }

  return (
    <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <span>Showing</span>
        <select style={{
          fontFamily: 'rawline',
          fontSize: '12px',
          border: 'none',
          padding: '6px',
          backgroundColor: '#ECF4E9',
          borderRadius: '7px',
          color: '#1E4841'
        }}
          value={pagination.pageSize}
          onChange={e => table.setPageSize(Number(e.target.value))}
        >
          {[12, 24, 50].map(size => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <span>out of {totalItems}</span>
      </div>
      <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
        <button onClick={() => table.setPageIndex(0)} disabled={current === 0}>
          &lt;
        </button>
        {start > 0 && <span>...</span>}
        {pages}
        {end < pageCount - 1 && <span>...</span>}
        {end < pageCount && (
          <button
            key={pageCount - 1}
            onClick={() => table.setPageIndex(pageCount - 1)}
            style={{
              fontWeight: current === pageCount - 1 ? 'bold' : 'normal',
              padding: '6px 10px',
              background: current === pageCount - 1 ? 'var(--green-text-color)' : 'var(--green-bg)',
              borderRadius: '7px',              
              fontSize: '10px'
            }}
          >
            {pageCount}
          </button>
        )}

        <button
          onClick={() => table.setPageIndex(current + 1)}
          disabled={current >= pageCount - 1}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
