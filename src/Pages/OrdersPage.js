import React, { useEffect, useMemo, useState } from 'react';
import { usePageContext } from '../context/PageContext';
import { useTranslation } from 'react-i18next';

const OrdersPage = () => {
  const { orders } = usePageContext();
  const { t } = useTranslation()

  const [fromDate,setFromDate] = useState('')
  const [toDate,setToDate] = useState('')

  const filteredByDate = useMemo(() => {
    if (fromDate && toDate) {
      return orders.filter((orderList) => {

        const orderDate = new Date(orderList.date).toISOString().split("T")[0];
          const fromDateValue = new Date(fromDate).toISOString().split("T")[0];
        const toDateValue = new Date(toDate).toISOString().split("T")[0];
  
        return orderDate >= fromDateValue && orderDate <= toDateValue;
      });
    }
    return orders;
  }, [orders, fromDate, toDate]); 
  

 useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders))
 },[orders])


  return (
    <div className="p-6 bg-gray-50 h-full overflow-y-auto">
     <div className='flex justify-between items-center'>
     <h1 className="text-3xl font-bold mb-6 text-gray-800">Order History</h1>
      <div className='flex gap-4'>
        <p>From</p>
        <input type='date' className='px-2' onChange={(e) => setFromDate(e.target.value)} value={fromDate || ""} />
        <p>To</p>
        <input type='date' className='px-2' onChange={(e) => setToDate(e.target.value)} value={toDate || ""} />
      </div>
     </div>
      {filteredByDate.length === 0 && <p>No Orders</p>}
     {filteredByDate.length > 0 &&  <div className=" bg-white p-4 shadow-lg rounded-lg">
        <table className="w-full border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-200 border-b">
              <th className="p-4 text-left font-semibold text-gray-700">ID</th>
              <th className="p-4 text-left font-semibold text-gray-700">{t('product-quantity')}</th>
              <th className="p-4 text-left font-semibold text-gray-700">{t('total-price')}</th>
              <th className="p-4 text-left font-semibold text-gray-700">{t("status")}</th>
              <th>Date Ordered</th>
            </tr>
          </thead>
          <tbody>
            {filteredByDate.length > 0 && filteredByDate.map((orderList,index) => {
                return (
                    <tr key={index} className="border-b hover:bg-gray-100">
                        <td className="p-4 text-gray-800">#{index + 1}</td>
                        <td className="p-4 text-gray-800">{orderList?.cartItems?.length}</td>
                        {orderList.cartItems?.length > 0 && <td className="p-4 text-gray-800 font-semibold">${Math.ceil(orderList?.cartItems?.reduce((acc, order) => acc + order.price, 0))}</td>}
                        <td className="p-4 text-yellow-600 font-semibold">{t("product-status")}</td>
                        <td className='flex justify-center items-center mt-4'>{orderList?.date}</td>
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
