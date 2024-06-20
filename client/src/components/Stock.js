// client/src/components/Stock.js
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import StockTable from './StockTable';
import axios from 'axios';
import './Stock.css';

export default function Stock(props) {
  const [stocks, setStocks] = useState([]);
  const [addingStock, setAddingStock] = useState(false);
  const tableHeadings = ["ID", "Type", "Quantity", "Price"];

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/stocks');
      setStocks(response.data);
    } catch (error) {
      console.log('Error fetching stocks:', error);
    }
  };

  const addNewStock = async () => {
    const newStockId = document.getElementById('newStockId').value;
    const newStockType = document.getElementById('newStockType').value;
    const newStockQuantity = document.getElementById('newStockQuantity').value;
    const newStockPrice = document.getElementById('newStockPrice').value;

    if (!newStockId || !newStockType || !newStockQuantity || !newStockPrice) {
      alert('All fields are mandatory to fill');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/stocks/add', {
        id: newStockId,
        type: newStockType,
        quantity: newStockQuantity,
        price: newStockPrice
      });

      if (response.status === 201) {
        fetchStocks();
        toggleNewStock();
      }
    } catch (error) {
      console.log('Error adding new stock:', error);
    }
  };

  const toggleNewStock = () => {
    const element = document.getElementById('addStockContainer');
    if (!addingStock) {
      setAddingStock(true);
      element.classList.remove('d-none');
    } else {
      setAddingStock(false);
      element.classList.add('d-none');
    }
  };

  const deleteStock = async (stockId) => {
    try {
      await axios.delete(`http://localhost:5000/stocks/delete/${stockId}`);
      fetchStocks();
    } catch (error) {
      console.log('Error deleting stock:', error);
    }
  };

  return (
    <>
      <div style={addingStock ? { opacity: '0.5' } : {}}>
        <Navbar name={props.name} />
        <h1 style={{ textAlign: 'center', marginTop: '10vh' }}>STOCK</h1>
        <div className="d-flex justify-content-end">
          <button className="btn btn-primary mx-5" onClick={() => toggleNewStock()}>
            Add new stock
          </button>
        </div>
        <div className="stock-container py-5 d-flex justify-content-center my-1" style={{ margin: '2rem', border: '2px solid black', borderRadius: '10px' }}>
          <div className="stock-list mx-5 d-flex flex-column align-items-center" style={{ width: '80vw' }}>
            <h2 className="my-4">Stocks</h2>
            <StockTable headings={tableHeadings} data={stocks} onDelete={deleteStock} />
          </div>
        </div>
      </div>

      <div className="addStock d-flex d-none flex-column align-items-center" id='addStockContainer'>
        <div className="d-flex justify-content-end fa-xl" style={{ cursor: 'pointer', width: '100%' }}>
          <i className="fa-solid fa-rectangle-xmark" onClick={toggleNewStock}></i>
        </div>
        <h1 className='my-5'>ADD NEW STOCK</h1>
        <div className='my-1' style={{ width: '22rem' }}>
          <span className='mx-3' style={{ width: '5rem' }}>Enter Stock ID</span>
          <input type='text' style={{ width: '12rem', float: 'right' }} id='newStockId' />
        </div>
        <div className='my-1' style={{ width: '22rem' }}>
          <span className='mx-3' style={{ width: '5rem' }}>Stock Type</span>
          <input type='text' style={{ width: '12rem', float: 'right' }} id='newStockType' />
        </div>
        <div className='my-1' style={{ width: '22rem' }}>
          <span className='mx-3' style={{ width: '5rem' }}>Enter Quantity</span>
          <input type='number' style={{ width: '12rem', float: 'right' }} id='newStockQuantity' />
        </div>
        <div className='my-1' style={{ width: '22rem' }}>
          <span className='mx-3' style={{ width: '5rem' }}>Enter Price</span>
          <input type='number' style={{ width: '12rem', float: 'right' }} id='newStockPrice' />
        </div>
        <button className="btn btn-primary m-5" onClick={addNewStock}>Add new stock</button>
      </div>
    </>
  );
}
