import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const isLive = true;
const apiUrl = isLive
  ? 'https://restaurantapi.finexcloud.com/api/'
  //  'http://FXCapi.FXC.com/api/'
  : 'https://restaurantapi.finexcloud.com/api/';

export const fetchService = async (url, method, token) => {
  try {
    console.log('url, method, token', url, method, token);
    
 
    let response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + token,
      },
    });
    console.log('GET request response =========>', response);
    let responseJson = await response.json();
    console.log('api response for response....', responseJson);
    if (responseJson) {
      console.log('api responseJson for product', responseJson);
      if (response.ok) {
        responseJson.success = true;
      } else {
        responseJson.success = false;
      }
    }

    return responseJson;
  } catch (error) {
    Alert.alert('Error', 'Something went wrong', error);
    // console.log('Error in retrieving userinfo from Auth0: ' + error);
    return error;
  }
};
export const ServerCall = (token, urlPath, method, body) => {
  let url = apiUrl + urlPath;

  return async dispatch => {
    try {
      dispatch({
        type: 'SERVER_LOADING',
      });
      var response;
      // const navigation = useNavigation();
      if (method === 'GET' || method === 'DELETE') {
        response = await fetchService(url, method, token);
        console.log('url, method, token---.',url, method, token);
      } else {
        console.log(
          'POST request response =========> ',
          token,
          url,
          JSON.stringify(method),
          body,
        );
      
        let res = await fetch(url, {
          method: 'POST',
          headers: token
            ? {
                'Content-Type': 'application/json',
                Authorization: 'Basic ' + token,
              }
            : {
                'Content-Type': 'application/json',
              },
          // body: body,
          body: JSON.stringify(body),
        });
        console.log('api request response..........', res);
        response = await res.text();
        console.log('api request response ', response);
        // if (response === 'Unauthorized') {
        //   Alert.alert('Alert', 'Your Session is Expirerd Please Login again', [
        //     {text: 'OK', onPress: () => navigation.replace('Auth')},
        //   ]);
        // } else {
        if (response.ok) {
          response.success = true;
        } else {
          response.success = false;
        }
        // }
      }
      console.log('address of servers', response);
      if (response?.success) {
        dispatch({
          type: 'SERVER_SUCCESS',
        });
        return response;
      } else {
        throw response;
      }
    } catch (error) {
      dispatch({
        type: 'SERVER_FAIL',
      });
      return error;
    }
  };
};

export const SaveAllData = payload => {
  return async dispatch => {
    try {
      dispatch({
        type: 'SAVE_DATA',
        payload,
      });
    } catch (error) {
      return error;
    }
  };
};

