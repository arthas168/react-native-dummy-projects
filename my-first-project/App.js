import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default () => {

  const HELLO_WORLD = "Hello world!";
  const TEXT_CHANGED = "Text changed!"

  const [toggleChange, setToggleChange] = useState(false);

  return (
    <View style={styles.container} >
      <Text>{toggleChange ? TEXT_CHANGED : HELLO_WORLD}</Text>
      <Button title={"Change text"} onPress={() => {setToggleChange(!toggleChange)}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
