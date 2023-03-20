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
    flex: 0.12,
  },
  sliderIconContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  voiceOverContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  voiceOverButton: {
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    width: 75,
    height: 75,
    backgroundColor: 'black',
    borderRadius: 50,
    margin: '3%',
  },
});
