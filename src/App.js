// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import PizzaForm from './components/PizzaForm';
import OrderMainSection from './components/OrderMainSection';

const App = () => {
  const [orders, setOrders] = useState([]);
  const [orderCounter, setOrderCounter] = useState(0);
  const [stages, setStages] = useState({
    'Order Placed': [],
    'Order in Making': [],
    'Order Ready': [],
    'Order Picked': []
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedOrders = orders.map(order => ({
        ...order,
        timeSpent: calculateTimeSpent(order.timestamp)
      }));
      setOrders(updatedOrders);
    }, 1000);

    return () => clearInterval(interval);
  }, [orders]);

  const calculateTimeSpent = (timestamp) => {
    if (!timestamp) return '0 min 0 sec';
    const elapsedTime = Date.now() - timestamp;
    const minutes = Math.floor(elapsedTime / (1000 * 60));
    const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    return `${minutes} min ${seconds} sec`;
  };

  const handleOrderSubmit = (order) => {
    if (orders.length < 10) {
      const orderId = String(orderCounter + 1).padStart(3, '0');
      const newOrder = { ...order, orderId, stage: 'Order Placed', timestamp: Date.now(), timeSpent: '0 min 0 sec' };
      setOrders([...orders, newOrder]);
      setStages({ ...stages, 'Order Placed': [...stages['Order Placed'], newOrder] });
      setOrderCounter(prevCounter => prevCounter + 1);
    } else {
      alert('Not taking any order for now');
    }
  };

  const moveToNextStage = (order, currentStage, nextStage) => {
    const updatedStages = { ...stages };
    updatedStages[currentStage] = stages[currentStage].filter((o) => o !== order);
    const updatedOrder = { ...order, stage: nextStage, timestamp: Date.now() };
    updatedStages[nextStage] = [...stages[nextStage], updatedOrder];
    setStages(updatedStages);
    setOrders(updatedStages[nextStage]); // Update orders state with the orders in the next stage
  };

  const cancelOrder = (order) => {
    setOrders(orders.filter(o => o !== order));
    setStages({ ...stages, [order.stage]: stages[order.stage].filter(o => o !== order) });
  };

  const totalOrdersDelivered = () => {
    let total = 0;
    Object.values(stages['Order Picked']).forEach(order => {
      if (order.stage === 'Order Picked') {
        total++;
      }
    });
    return total;
  };

  return (
    <div className="App">
      <h1>Pizza Restaurant</h1>
      <div className="order-form">
        <h2>Place Order</h2>
        <PizzaForm onSubmit={handleOrderSubmit} />
      </div>
      <div className="pizza-stages">
        {Object.entries(stages).map(([stage, orders]) => (
          <div className="stage" key={stage}>
            <h2>{stage}</h2>
            <div className="order-cards">
              {orders.map((order, index) => (
                <div className={`order-card ${calculateTimeSpent(order.timestamp) >= '3 min 0 sec' ? 'red-highlight' : ''}`} key={index}>
                  <p>Order ID: {order.orderId}</p>
                  <p>Type: {order.type}, Size: {order.size}, Base: {order.base}</p>
                  <p>{stage === 'Order Picked' ? 'Picked' : `Time spent: ${calculateTimeSpent(order.timestamp)}`}</p>
                  {stage !== 'Order Picked' && (
                    <button onClick={() => moveToNextStage(order, stage, Object.keys(stages)[Object.keys(stages).indexOf(stage) + 1])}>
                      Next Stage
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="main-section">
        <h2>Main Section</h2>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Stage of Pizza</th>
              <th>Total Time Spent</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(stages).map(([stage, orders]) => (
              orders.map((order, index) => (
                <OrderMainSection key={index} order={order} orderPlacedTimestamp={order.timestamp} cancelOrder={cancelOrder} />
              ))
            ))}
            <tr>
              <td colSpan="3">Total Orders Delivered:</td>
              <td>{totalOrdersDelivered()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
