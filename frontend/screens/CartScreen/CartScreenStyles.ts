import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: '5%',
  },
  insidePadding: {
    flex: 1,
  },
  topPart: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: '3%',
    flex: 0.05,
  },
  textContainer: {
    flex: 1,
  },
  headerStyle: {
    fontSize: 21,
    fontFamily: 'Optima-Medium',
  },
  sliderIconParentContainer: {
    flex: 0.08,
    backgroundColor: 'black',
    justifyContent: 'center',
    color: 'white',
    alignItems: 'center',
    borderRadius: 40,
  },
  textStyle: {
    fontFamily: 'Optima-Medium',
    fontSize: 18,
    color: 'white',
  },
});
