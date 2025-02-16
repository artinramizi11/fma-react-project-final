import React, { useEffect, useState } from 'react';
import { usePageContext } from '../context/PageContext';
import { useTranslation } from 'react-i18next';

const OrdersPage = () => {
  const { orders } = usePageContext();
  const { t } = useTranslation()

 useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders))
 },[orders])

  return (
    <div className="p-6 bg-gray-50 h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Order History</h1>
      {orders.length === 0 && <p>No Orders</p>}
     {orders.length > 0 &&  <div className=" bg-white p-4 shadow-lg rounded-lg">
        <table className="w-full border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-200 border-b">
              <th className="p-4 text-left font-semibold text-gray-700">ID</th>
              <th className="p-4 text-left font-semibold text-gray-700">{t('product-quantity')}</th>
              <th className="p-4 text-left font-semibold text-gray-700">{t('total-price')}</th>
              <th className="p-4 text-left font-semibold text-gray-700">{t("status")}</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((orderList,index) => {
                return (
                    <tr key={index} className="border-b hover:bg-gray-100">
                        <td className="p-4 text-gray-800">#{index + 1}</td>
                        <td className="p-4 text-gray-800">{orderList.length}</td>
                        <td className="p-4 text-gray-800 font-semibold">${Math.ceil(orderList.reduce((acc, pr) => acc + pr.price, 0))}</td>
                        <td className="p-4 text-yellow-600 font-semibold">{t("product-status")}</td>
                    </tr>
                )
            } )}
          </tbody>
        </table>
      </div>}
    </div>
  );
};

export default OrdersPage;
