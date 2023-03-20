import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: '5%',
    marginBottom: 0,
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
  mainPart: {
    flex: 1,
  },
  mainPartChild: {
    flex: 1,
    overflow: 'scroll',
  },
  itemNameRatingContainer: {
    marginTop: '5%',
    flexDirection: 'row',
  },
  ratingContainer: {
    flex: 0.2,
    flexDirection: 'row',
    paddingTop: '3%',
    justifyContent: 'flex-end',
  },
  itemNameContainer: {
    flex: 1,
  },
  textStyle: {
    fontFamily: 'Optima-Medium',
    fontSize: 20,
    flexWrap: 'wrap',
    lineHeight: 25,
  },
  itemDetailParentNav: {
    justifyContent: 'center',
    borderTopWidth: 1,
  },
  itemDetailNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lastItemDetailNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceSizeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '5%',
  },
  itemDetailNavContainer: {
    marginTop: '15%',
  },
  imageParentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  productSectionTextStyle: {
    paddingTop: '10%',
    paddingBottom: '10%',
    fontFamily: 'Optima-Medium',
    fontSize: 20,
    flexWrap: 'wrap',
    lineHeight: 25,
  },
  rightArrowContainer: {
    justifyContent: 'center',
  },
  footer: {
    flex: 0.12,
  },
});
