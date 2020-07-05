import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Alert, CheckBox } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    Alert.alert(
      "Acesso Seguro Informa:",
      `O código referente ao CPF ${data} foi escaneado.`,
      [
        {
          text: "Voltar",
          onPress: () => setScanned(false),
          style: "cancel"
        },
        { 
          text: "Iniciar Checagem", 
          onPress: () => navigation.navigate('Checagem', { id: data }), 
        }
      ],
      { cancelable: false }
    );
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
      <BarCodeScanner
        onBarCodeScanned={ scanned ? undefined : handleBarCodeScanned}
        barCodeTypes={[
          BarCodeScanner.Constants.BarCodeType.qr,
        ]}

        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
}