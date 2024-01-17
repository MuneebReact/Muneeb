import { StyleSheet } from 'react-native';
import AppColor from '../../constant/AppColor';
import sizeHelper from '../../helpers/sizeHelper';

const styles = StyleSheet.create({
  splashContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(80, 102, 225,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    width: '100%',
    height: '100%',
  },

  logo: {
    width: sizeHelper.calWp(234),
  },
  buttonCircle: {
    width: sizeHelper.calWp(50),
    height: sizeHelper.calWp(50),
    backgroundColor: AppColor.orange,
    borderRadius: sizeHelper.calWp(50) / 2,
    justifyContent: "center",
    alignItems: "center",
    // paddingStart: 2,
    marginEnd: sizeHelper.calWp(50),
    margin: -5,
  },
});

export default styles;
