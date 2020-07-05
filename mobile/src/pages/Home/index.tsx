import React, { useState } from 'react';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { SvgUri } from 'react-native-svg';

const Home = () => {
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const [code, setCode] = useState('');
  const navigation = useNavigation();


  function handleSelectOption(id: number) {

    if (!(selectedOption === id)) {
      setSelectedOption(id);
    }
  }

  
  function handleNavigateToChecagem(id: string) {
    navigation.navigate('Checagem', { id: id });
  }

  
  function handleNavigateToQRCode() {
    navigation.navigate('QRCode');
  }


  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Bem vindo.</Text>
        <Text style={styles.description}>Utilize uma das opções abaixo para identificar o funcionário.</Text>
        <View style={styles.itemsContainer}>
          <TouchableOpacity
            style={[
              styles.item,
              (selectedOption === 1) ? styles.selectedItem : {}
            ]}
            onPress={() => {handleSelectOption(1); handleNavigateToQRCode()}}
            activeOpacity={0.6}
          >
            <SvgUri width={42} height={42} uri={'http://192.168.0.2:3333/uploads/qrcode.svg'} />
            <Text style={styles.itemTitle}>Ler QR code</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.item,
              (selectedOption === 2) ? styles.selectedItem : {}
            ]}
            onPress={() => handleSelectOption(2)}
            activeOpacity={0.6}
          >
            <SvgUri width={42} height={42} uri={'http://192.168.0.2:3333/uploads/cpf.svg'} />
            <Text style={styles.itemTitle}>Digitar CPF</Text>
          </TouchableOpacity>

        </View>
        <View style={(selectedOption === 2) ? {display: 'flex'} : {display: 'none'}}>
          <TextInput
            style={styles.input}
            placeholder="Digite aqui o CPF"
            value={code}
            maxLength={14}
            keyboardType='phone-pad'
            autoCapitalize="characters"
            autoCorrect={false}
            onChangeText={setCode}
          />

          <TouchableOpacity style={styles.button} onPress={() => {handleNavigateToChecagem(code)}}>
            <Text style={styles.buttonText}>
              Iniciar Checagem
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 20 + Constants.statusBarHeight,
  },

  title: {
    fontSize: 20,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: 24,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 4,
    fontFamily: 'Roboto_400Regular',
  },

  itemsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 80,
    marginBottom: 32,
  },

  item: {
    backgroundColor: '#EAF7FB',
    borderWidth: 2,
    borderColor: '#EAF7FB',
    height: 120,
    width: 120,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'space-between',

    textAlign: 'center',
  },

  selectedItem: {
    borderColor: '#08376B',
    borderWidth: 2,
  },

  itemTitle: {
    fontFamily: 'Roboto_400Regular',
    textAlign: 'center',
    fontSize: 13,
  },

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginTop: 30,
    paddingHorizontal: 24,
    fontSize: 16,
  },
  
  button: {
    backgroundColor: '#35C0ED',
    height: 34,
    flexDirection: 'row',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 55,
    paddingVertical: 24,
    marginHorizontal: 50,
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#08376B',
    fontFamily: 'Roboto_500Medium',
    fontSize: 18,
  },
});

export default Home;