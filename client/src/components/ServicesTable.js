// client/src/components/ServicesTable.js
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import ServiceTable from './ServiceTable'; // Ensure this path matches the actual file location
import axios from 'axios';
import './Services.css';

function ServiceTable({ headings, data, onDelete, onEdit }) {
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
          {data.map((service) => (
            <tr key={service.id}>
              <td>{service.id}</td>
              <td>{service.type}</td>
              <td>{service.quantity}</td>
              <td>{service.price}</td>
              <td>{service.trackingId}</td>
              <td>{service.attachment}</td>
              <td>
                <button className="btn btn-danger" onClick={() => onDelete(service.id)}>Delete</button>
                <button className="btn btn-warning" onClick={() => onEdit(service.id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ServiceTable;
