import {StyleSheet} from 'react-native';
import {verticalScale} from '../utils';
import {PrimaryFonts, SecondaryFonts} from '../assets';

const fontStyles = StyleSheet.create({
  h1_Bold: {
    fontSize: verticalScale(28),
    fontFamily: PrimaryFonts.Bold,
  },
  h2_Bold: {
    fontSize: verticalScale(24),
    fontFamily: PrimaryFonts.Bold,
  },
  h3_Bold: {
    fontSize: verticalScale(20),
    fontFamily: PrimaryFonts.Bold,
  },
  b1_Bold: {
    fontSize: verticalScale(16),
    fontFamily: PrimaryFonts.Bold,
  },
  b1_Medium: {
    fontSize: verticalScale(16),
    fontFamily: PrimaryFonts.Medium,
  },
  b1_Text_Bold: {
    fontSize: verticalScale(16),
    fontFamily: SecondaryFonts.Bold,
  },
  b1_Text_SemiBold: {
    fontSize: verticalScale(16),
    fontFamily: SecondaryFonts.SemiBold,
  },
  b1_Text_Regular: {
    fontSize: verticalScale(16),
    fontFamily: SecondaryFonts.Regular,
  },
  b2_Bold: {
    fontSize: verticalScale(14),
    fontFamily: PrimaryFonts.Bold,
  },
  b2_Medium: {
    fontSize: verticalScale(14),
    fontFamily: PrimaryFonts.Medium,
  },
  b2_Text_Bold: {
    fontSize: verticalScale(14),
    fontFamily: SecondaryFonts.Bold,
  },
  b2_Text_SemiBold: {
    fontSize: verticalScale(14),
    fontFamily: SecondaryFonts.SemiBold,
  },
  b2_Text_Regular: {
    fontSize: verticalScale(14),
    fontFamily: SecondaryFonts.Regular,
  },
  b3_Text_Bold: {
    fontSize: verticalScale(12),
    fontFamily: SecondaryFonts.Bold,
  },
  b3_Text_SemiBold: {
    fontSize: verticalScale(12),
    fontFamily: SecondaryFonts.SemiBold,
  },
  b3_Text_Italic: {
    fontSize: verticalScale(12),
    fontFamily: SecondaryFonts.Italic,
  },
  b3_Text_Regular: {
    fontSize: verticalScale(12),
    fontFamily: SecondaryFonts.Regular,
  },
  b4_Text_Bold: {
    fontSize: verticalScale(10),
    fontFamily: SecondaryFonts.Bold,
  },
  b4_Text_SemiBold: {
    fontSize: verticalScale(10),
    fontFamily: SecondaryFonts.SemiBold,
  },
  b4_Text_Regular: {
    fontSize: verticalScale(10),
    fontFamily: SecondaryFonts.Regular,
  },
});

export {fontStyles};
