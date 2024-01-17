import React, {useState} from 'react';
import {useEffect} from 'react';
import {connect} from 'react-redux';
import Design from './design';
const OrdersScreen = () => {
  const [focusedPending, setFocusedPending] = useState(false);
  const [focusedCompleted, setFocusedCompleted] = useState(false);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setFocusedPending(true);
  }, []);

  const onChangePendding = () => {
    setTimeout(() => {
      setLoading(true);
      setFocusedPending(true);
      setFocusedCompleted(false);
      console.log('Pending order');
      setLoading(false);
    }, 2000);
  };
  const onChangeCompleted = () => {
    setTimeout(() => {
      setLoading(true);
      setFocusedPending(false);
      setFocusedCompleted(true);
      console.log('completed order');
      setLoading(false);
    }, 2000);
  };

  return (
    <Design
      focusedPending={focusedPending}
      setFocusedPending={setFocusedPending}
      focusedCompleted={focusedCompleted}
      setFocusedCompleted={setFocusedCompleted}
      isLoading={isLoading}
      setLoading={setLoading}
      onChangePendding={onChangePendding}
      onChangeCompleted={onChangeCompleted}
    />
  );
};

export default OrdersScreen;
