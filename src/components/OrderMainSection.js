// OrderMainSection.js
import React from 'react';

const OrderMainSection = ({ order, orderPlacedTimestamp, cancelOrder }) => {
  const timeSpent = calculateTimeSpent(orderPlacedTimestamp);

  const handleCancel = () => {
    if (order.stage === 'Order Picked' || order.stage === 'Order Ready') {
      alert('Order cannot be canceled now.');
    } else {
      cancelOrder(order); // Call the cancelOrder function passed from props
    }
  };

  const renderTimeSpentOrMessage = () => {
    if (order.stage === 'Order Picked') {
      return 'Picked';
    } else {
      return timeSpent;
    }
  };

  return (
    <tr>
      <td>{order.orderId}</td>
      <td>{order.stage}</td>
      <td>{renderTimeSpentOrMessage()}</td>
      <td>
        <button onClick={handleCancel}>Cancel Order</button> {/* Render cancel button for every stage */}
      </td>
    </tr>
  );
};

const calculateTimeSpent = (orderPlacedTimestamp) => {
  if (!orderPlacedTimestamp) return '0 min 0 sec';
  const elapsedTime = Date.now() - orderPlacedTimestamp;
  const minutes = Math.floor(elapsedTime / (1000 * 60));
  const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
  return `${minutes} min ${seconds} sec`;
};

export default OrderMainSection;
