import { useEffect, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import SearchInput from './SearchInput';
import { Dropdown } from 'react-bootstrap';

export default function TransactionTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 12,
  });
  const [sorting, setSorting] = useState([]);
  const [bankCards, setBankCards] = useState([]);

  useEffect(() => {
    fetch('data/bankcard.json')
      .then(res => res.json())
      .then(json => setBankCards(json))
      .catch(err => {
        console.error('Bank cards fetch error:', err);
        setBankCards([]);
      });
  }, []);

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

  function SortIcon() {
    return (
      <svg width="12" height="12">
        <use xlinkHref="assets/icon/sprite_control.svg#Sort" />
      </svg>
    )
  }

  const columns = [
    {
      id: 'select',
      header: ({ table }) => (
        <input
          type="checkbox"
          checked={table.getIsAllRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          onChange={row.getToggleSelectedHandler()}
        />

      ),
      enableSorting: false
    },
    {
      accessorKey: 'name',
      header: 'Transaction Name',
      enableSorting: true,
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
    {
      accessorKey: 'account',
      header: 'Account',
      enableSorting: true,
      cell: info => {
        const accountName = info.getValue();
        const match = bankCards.find(card => card.name === accountName);
        const iconHref = match?.iconHref;

        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {iconHref && (
              <svg width="24" height="16">
                <use xlinkHref={iconHref} />
              </svg>
            )}
            <span>{accountName}</span>
          </div>
        );
      }
    },
    { accessorKey: 'id', header: 'Transaction ID', enableSorting: false },
    {
      accessorKey: 'datetime',
      header: 'Date & Time',
      enableSorting: true,
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
      enableSorting: true,
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
    { accessorKey: 'note', header: 'Note', enableSorting: false },
    {
      accessorKey: 'status',
      header: 'Status',
      enableSorting: true,
      cell: info => {
        const status = info.getValue();
        const statusStyles = {
          Completed: { backgroundColor: "var(--green-text-color)", color: "var(--active-color)" },
          Pending: { backgroundColor: "var(--active-color)", color: "var(--green-text-color)" },
          Failed: { backgroundColor: "var(--warning-accent-color)", color: "var(--warning-color)" },
        };
        return (
          <span style={{
            padding: "4px 8px",
            borderRadius: "6px",
            fontWeight: "500",
            ...statusStyles[status] || {}
          }}>
            {status}
          </span>
        );
      },
    },
  ];

  const [rowSelection, setRowSelection] = useState({});
  
  const [selectedCategory, setSelectedCategory] = useState('All Category');
  const categories = ['All Category', ...new Set(data.map(tx => tx.category))];

  const filteredData = selectedCategory === 'All Category'
    ? data
    : data.filter(tx => tx.category === selectedCategory);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { pagination, sorting, rowSelection },
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableRowSelection: true,
  });

  const selectedRows = table.getSelectedRowModel().rows;

  if (loading) return <div>Loading transactions...</div>;

  return (
    <>
      <div className="outerWrapperBorder">
        <div className="statisticHead">
          <div className='flexGroup'>
            <SearchInput placeholder="Search transaction" />
            <Dropdown onSelect={(key) => setSelectedCategory(key)}>
              <Dropdown.Toggle className="customToggle" id="range">
                <span>{selectedCategory}</span>
                <svg className="iconToggle" viewBox="0 0 24 24">
                  <use xlinkHref="assets/images/icon/sidebar-icon.svg#AngleDown" />
                </svg>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {categories.map(cat => (
                  <Dropdown.Item key={cat} eventKey={cat}>
                    {cat}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
              <Dropdown.Toggle className="customToggle" id="range">
                <span>All Account</span>
                <svg className="iconToggle" viewBox="0 0 24 24">
                  <use xlinkHref="assets/images/icon/sidebar-icon.svg#AngleDown" />
                </svg>
              </Dropdown.Toggle>
            </Dropdown>
          </div>
          <div className='flexGroup'>
            <Dropdown>
              <Dropdown.Toggle className="customToggle" id="range">
                <svg className="iconToggle" viewBox="0 0 24 24">
                  <use xlinkHref="assets/images/icon/sidebar-icon.svg#Calendar" />
                </svg>
                <span>1-30 September 2025</span>
                <svg className="iconToggle" viewBox="0 0 24 24">
                  <use xlinkHref="assets/images/icon/sidebar-icon.svg#AngleDown" />
                </svg>
              </Dropdown.Toggle>
            </Dropdown>
            <button className='downloadBtn'>
              Download
            </button>
          </div>
        </div>
        <div style={{ height: 'calc(100vh - 210px)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '12px'
            }}>
              <thead>
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <th
                        key={header.id}
                        onClick={header.column.getToggleSortingHandler()}
                        style={{
                          position: 'sticky',
                          top: 0,
                          background: 'var(--bg-color)',
                          zIndex: 2,
                          padding: '8px',
                          textAlign: 'left',
                          borderBottom: '1px solid #ccc',
                          cursor: 'pointer'
                        }}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getIsSorted() === 'asc' && <SortIcon />}
                        {header.column.getIsSorted() === 'desc' && <SortIcon />}
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
          </div>
          <PaginationControls table={table} pagination={pagination} />
        </div>
      </div>
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
          background: i === current ? 'var(--goPro-bg)' : 'var(--green-bg)',
          borderRadius: '7px',
        }}
      >
        {i + 1}
      </button>
    );
  }

  return (
    <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: "12px" }}>
        <span>Showing</span>
        <select style={{
          fontFamily: 'rawline',
          fontSize: '10px',
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button className='controlLeft'
          onClick={() => table.setPageIndex(current - 1)}
          disabled={current === 0}
        >
          <svg>
            <use xlinkHref={'assets/images/icon/sprite_control.svg#CaretLeft'} />
          </svg>
        </button>
        {start > 0 && <span style={{ padding: '6px 10px' }}>...</span>}
        {pages}
        {end < pageCount - 1 && <span style={{ padding: '6px 10px' }}>...</span>}
        {end < pageCount && (
          <button
            key={pageCount - 1}
            onClick={() => table.setPageIndex(pageCount - 1)}
            style={{
              fontWeight: current === pageCount - 1 ? 'bold' : 'normal',
              padding: '6px 10px',
              background: current === pageCount - 1 ? 'var(--goPro-bg)' : 'var(--green-bg)',
              borderRadius: '7px',
              fontSize: '10px'
            }}
          >
            {pageCount}
          </button>
        )}

        <button className='controlLeft'
          onClick={() => table.setPageIndex(current + 1)}
          disabled={current >= pageCount - 1}
        >
          <svg>
            <use xlinkHref={'assets/images/icon/sprite_control.svg#CaretRight'} />
          </svg>
        </button>
      </div>
    </div>
  );
}
