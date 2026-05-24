import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

export default function SettingsScreen() {
  const [isEnabled, setIsEnabled] = React.useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.row}>
        <Text style={styles.text}>Dark Mode</Text>
        <Switch value={isEnabled} onValueChange={() => setIsEnabled(!isEnabled)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    padding: 20, 
    paddingTop: 60 
},
  title: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginBottom: 20
},
  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
},
  text: { 
    fontSize: 18 
},
});
