import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Button, Card} from '../../../../components';
import {fontStyles} from '../../../../constants';
import {useThemeColor} from '../../../../hooks';
import {Strings} from '../../../../i18n';
import {horizontalScale, verticalScale} from '../../../../utils';
import {ExperienceCardProps} from './ExperienceCard.types';

const ExperienceCard = (props: ExperienceCardProps) => {
  const {style, title, logo} = props;

  const {colors} = useThemeColor();

  return (
    <Card
      style={[
        styles.card,
        {shadowColor: colors.text, backgroundColor: colors.card},
        style,
      ]}>
      <View>
        <Image source={{uri: logo}} style={styles.logo} />
      </View>
      <View>
        <Text style={fontStyles.b1_Bold}>{title}</Text>
        <Text style={fontStyles.b3_Text_Regular}>
          {Strings.profile.doYouRecommendThisBusiness}
        </Text>
        <View style={styles.buttonRow}>
          <Button
            mode="outlined"
            onPress={() => {}}
            style={[styles.actionButton, {borderColor: colors.buttonBorder}]}
            textStyle={fontStyles.b3_Text_SemiBold}>
            Yes
          </Button>
          <Button
            mode="outlined"
            onPress={() => {}}
            style={[styles.actionButton, {borderColor: colors.buttonBorder}]}
            textStyle={fontStyles.b3_Text_SemiBold}>
            No
          </Button>
          <Button
            mode="outlined"
            onPress={() => {}}
            style={[styles.actionButton, {borderColor: colors.buttonBorder}]}
            textStyle={fontStyles.b3_Text_SemiBold}>
            Maybe
          </Button>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  actionButton: {
    paddingHorizontal: verticalScale(15),
    paddingVertical: verticalScale(10),
    borderRadius: verticalScale(4),
    marginHorizontal: horizontalScale(3),
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: verticalScale(9),
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: verticalScale(7),
    padding: verticalScale(7),
  },
  logo: {
    width: horizontalScale(60),
    height: verticalScale(60),
    resizeMode: 'contain',
  },
});

export default ExperienceCard;
