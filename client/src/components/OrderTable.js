// client/src/components/OrdersTable.js
import React from 'react';

function OrderTable({ headings, data, onDelete, onMarkAsCompleted, onMarkAsPending, orderType, onPdfDownload, onXlDownload, onModifyOrder }) {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            {headings.map((heading, index) => (
              <th key={index}>{heading}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.type}</td>
              <td>{order.quantity}</td>
              <td>
                <button className="btn btn-danger" onClick={() => onDelete(order.id)}>Delete</button>
                {orderType === 'Pending' ? (
                  <>
                    <button className="btn btn-success" onClick={() => onMarkAsCompleted(order.id)}>Complete</button>
                    <button className="btn btn-warning" onClick={onModifyOrder}>Modify</button>
                  </>
                ) : (
                  <button className="btn btn-secondary" onClick={() => onMarkAsPending(order.id)}>Revert to Pending</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button className="btn btn-info" onClick={onPdfDownload}>Download PDF</button>
        <button className="btn btn-info" onClick={onXlDownload}>Download Excel</button>
      </div>
    </div>
  );
}

export default OrderTable;
