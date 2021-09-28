import React from "react";
import { SERVER_IP } from "../../private";

const OrdersList = (props) => {
  const { orders, setOrders } = props;
  if (!props || !props.orders || !props.orders.length)
    return (
      <div className="empty-orders">
        <h2>There are no orders to display</h2>
      </div>
    );

  const DELETE_ORDER_URL = `${SERVER_IP}/api/delete-order`;

  const deleteOrder = async (order) => {
    console.log(`order`, order);
    await fetch(DELETE_ORDER_URL, {
      method: "POST",
      body: JSON.stringify({
        id: order,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => console.log("Success", JSON.stringify(response)))
      .catch((error) => console.error(error));
  };

  const removeOrder = (deletedOrder) => {
    const newOrdersList = orders.filter((order) => order._id !== deletedOrder);
    setOrders(newOrdersList);
  };

  const orderedTime = (time) => {
    const timeFormat = {
      hour: time.getHours() % 12 || 12,
      minute: time.getMinutes().toString().padStart(2, "0"),
      seconds: time.getSeconds().toString().padStart(2, "0"),
      amOrPm: time.getHours() < 12 ? "am" : "pm",
    };
    return `${timeFormat.hour}:${timeFormat.minute}:${timeFormat.seconds}${timeFormat.amOrPm}`;
  };

  return orders.map((order) => {
    const createdDate = new Date(order.createdAt);
    return (
      <div className="row view-order-container" key={order._id}>
        <div className="col-md-4 view-order-left-col p-3">
          <h2>{order.order_item}</h2>
          <p>Ordered by: {order.ordered_by || ""}</p>
        </div>
        <div className="col-md-4 d-flex view-order-middle-col">
          <p>Order placed at {orderedTime(createdDate)}</p>
          <p>Quantity: {order.quantity}</p>
        </div>
        <div className="col-md-4 view-order-right-col">
          <button className="btn btn-success">Edit</button>
          <button
            onClick={() => {
              deleteOrder(order._id);
              removeOrder(order._id);
            }}
            className="btn btn-danger"
          >
            Delete
          </button>
        </div>
      </div>
    );
  });
};

export default OrdersList;
