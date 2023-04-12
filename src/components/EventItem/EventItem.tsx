import React, {useContext} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {EventItemProps} from './EventItem.types';
import {RootStoreContext} from '../../models';

const EventItem = ({event}: EventItemProps) => {
  const {events} = useContext(RootStoreContext);

  return (
    <TouchableOpacity onPress={() => events.getEventDetails(event.id, false)}>
      <Image
        source={{
          uri:
            event.image_url === ''
              ? 'https://s3-media3.fl.yelpcdn.com/ephoto/B9oMfBlHwU_8oSe7blx_Lw/o.jpg'
              : event.image_url,
        }}
        style={styles.image}
      />
      <Text>{event.id}</Text>
      <Text>{event.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 100,
  },
});

export {EventItem};
