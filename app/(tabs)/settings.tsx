import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

export default function SettingsScreen() {
  const [isEnabled, setIsEnabled] = React.useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.divider} />
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
    backgroundColor: '#FDF6EC', // Colonial Cream
    padding: 20, 
    paddingTop: 60 
  },
  title: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginBottom: 20,
    color: '#1E3D59' // Straits Blue
  },
  divider: {
    height: 2,                
    backgroundColor: '#576e85', 
    marginBottom: 10,         
    borderRadius: 1,          
  },
  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  text: { 
    fontSize: 18,
    color: '#576e85' // muted blue-gray
  },
});

