import React, { useEffect, useState } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';
import { CheckBox } from 'react-native-elements'
import api from '../../services/api';

interface Params {
  id: string;
}

interface Data {
  cpf: string,
  email: string,
  id: number,
  nome: string,
  telefone: string,
}

const Checagem = () => {
  const [data, setData] = useState<Data>({} as Data);
  const [check1, setCheck1] = useState<boolean>(false);
  const [check2, setCheck2] = useState<boolean>(false);
  const [check3, setCheck3] = useState<boolean>(false);
  const [check4, setCheck4] = useState<boolean>(false);
  const [check5, setCheck5] = useState<boolean>(false);
  const [check6, setCheck6] = useState<boolean>(false);
  const [check7, setCheck7] = useState<boolean>(false);
  const [check8, setCheck8] = useState<boolean>(false);
  const [conforme, setConforme] = useState<string>('NÃO');
  const [higienizacao, setHigienizacao] = useState<string>('NÃO');
  const [temperatura, setTemperatura] = useState<string>('NÃO');
  const [mascara, setMascara] = useState<string>('NÃO');
  const [loading, setLoading] = useState<boolean>(false);

  const check = (check1 && check2 && check3 && check4) ? true : false;
  const navigation = useNavigation();
  const route = useRoute();

  const routeParams = route.params as Params;

  useEffect(() => {
    api.get(`users/${routeParams.id}`).then(response => {
      setData(response.data);
    });
  }, []);

  function handleNavigateBack() {
    navigation.goBack();
  }

  function handleCheck1() {
    if (check1) {
      setCheck1(false);
      setConforme('NÃO');
    } else {
      setCheck1(true);
      setConforme('SIM');
    }

  }

  function handleCheck2() {
    if (check2) {
      setCheck2(false);
      setHigienizacao('NÃO');
    } else {
      setCheck2(true);
      setHigienizacao('SIM');
    }
  }

  function handleCheck3() {
    if (check3) {
      setCheck3(false);
      setTemperatura('NÃO');
    } else {
      setCheck3(true);
      setTemperatura('SIM');
    }
  }

  function handleCheck4() {
    if (check4) {
      setCheck4(false);
      setMascara('NÃO');
    } else {
      setCheck4(true);
      setMascara('SIM');
    }
  }

  function handleCheck5() {
    check5 ? setCheck5(false) : setCheck5(true)
  }

  function handleCheck6() {
    check6 ? setCheck6(false) : setCheck6(true)
  }

  function handleCheck7() {
    check7 ? setCheck7(false) : setCheck7(true)
  }

  function handleCheck8() {
    check8 ? setCheck8(false) : setCheck8(true);
  }

  async function HandleNavigationToHome(passagem: string) {
    setLoading(true);
    await api.post('access_control/', {
      mascara,
      higienizacao,
      temperatura,
      conforme,
      passagem,
      users_id: data.id
    });

    setLoading(false);

    Alert.alert(
      "Acesso Seguro Informa:",
      "Concluído com sucesso!",
      [
        { 
          text: "ok", 
          onPress: () => navigation.navigate('Home'), 
        }
      ],
      { cancelable: false }
    );

  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={20} color="#08376B" />
        </TouchableOpacity>

        <Text style={styles.title}>Protocolo de entrada</Text>
        <Text style={styles.description}> Informe se o funcionário {data.nome} cumpre com os novos protocolos sanitários. </Text>

        <View style={styles.address}>

          <ScrollView
            vertical={true}
            showsVerticalScrollIndicator={false}
          >
            <CheckBox
              containerStyle={{ backgroundColor: '#F5F5F5', borderWidth: 0 }}
              uncheckedIcon="square"
              uncheckedColor="#C4C4C4"
              checkedIcon="check-square-o"
              checkedColor='#08376B'
              title='O funcionário está de usando os EPI’s (Equipamentos de Proteção Individuais) ?'
              fontFamily="normal"
              textStyle={styles.addressContent}
              checked={check1}
              onPress={() => { handleCheck1() }}
            />

            <CheckBox
              containerStyle={{ backgroundColor: '#F5F5F5', borderWidth: 0 }}
              uncheckedIcon="square"
              uncheckedColor="#C4C4C4"
              checkedIcon="check-square-o"
              checkedColor='#08376B'
              title='O funcionário higienizou as mãos?'
              fontFamily="normal"
              textStyle={styles.addressContent}
              checked={check2}
              onPress={() => { handleCheck2() }}
            />

            <CheckBox
              containerStyle={{ backgroundColor: '#F5F5F5', borderWidth: 0 }}
              uncheckedIcon="square"
              uncheckedColor="#C4C4C4"
              checkedIcon="check-square-o"
              checkedColor='#08376B'
              title='Verifique a temperatura do funcionário. Esta não pode ser  maior que 37,8º C.'
              fontFamily="normal"
              textStyle={styles.addressContent}
              checked={check3}
              onPress={() => { handleCheck3() }}
            />

            <CheckBox
              containerStyle={{ backgroundColor: '#F5F5F5', borderWidth: 0 }}
              uncheckedIcon="square"
              uncheckedColor="#C4C4C4"
              checkedIcon="check-square-o"
              checkedColor='#08376B'
              title='Verifique se  a máscara do funcionário cobre totalmente a boca e o nariz, sem
            deixar espaços nas laterais.'
              fontFamily="normal"
              textStyle={styles.addressContent}
              checked={check4}
              onPress={() => { handleCheck4() }}
            />

            <CheckBox
              containerStyle={{ backgroundColor: '#F5F5F5', borderWidth: 0 }}
              uncheckedIcon="square"
              uncheckedColor="#C4C4C4"
              checkedIcon="check-square-o"
              checkedColor='#08376B'
              title=' Oriente o funcionário que evite aperto de mão ou abraço.'
              fontFamily="normal"
              textStyle={styles.addressContent}
              checked={check5}
              onPress={() => { handleCheck5() }}
            />

            <CheckBox
              containerStyle={{ backgroundColor: '#F5F5F5', borderWidth: 0 }}
              uncheckedIcon="square"
              uncheckedColor="#C4C4C4"
              checkedIcon="check-square-o"
              checkedColor='#08376B'
              title='Oriente o funcionário que evite o compartilhamento de utensílios de uso pessoal.'
              fontFamily="normal"
              textStyle={styles.addressContent}
              checked={check6}
              onPress={() => { handleCheck6() }}
            />

            <CheckBox
              containerStyle={{ backgroundColor: '#F5F5F5', borderWidth: 0 }}
              uncheckedIcon="square"
              uncheckedColor="#C4C4C4"
              checkedIcon="check-square-o"
              checkedColor='#08376B'
              title='Oriente o funcionário que evite qualquer tipo de aglomeração e mantenha distância de mais de 1,5
            metro de outra pessoa.'
              fontFamily="normal"
              textStyle={styles.addressContent}
              checked={check7}
              onPress={() => { handleCheck7() }}
            />

            <CheckBox
              containerStyle={{ backgroundColor: '#F5F5F5', borderWidth: 0, marginBottom: 150 }}
              uncheckedIcon="square"
              uncheckedColor="#C4C4C4"
              checkedIcon="check-square-o"
              checkedColor='#08376B'
              title='Oriente o funcionário sobre como e a quem devem
            dirigir-se ao apresentar sintomas do covid-19.'
              fontFamily="normal"
              textStyle={styles.addressContent}
              checked={check8}
              onPress={() => { handleCheck8() }}
            />
          </ScrollView>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={[{flex: 1, justifyContent: "center"}, styles.horizontal, loading ? {display:'flex'} : {display: 'none'}]}>
          <ActivityIndicator size="large" color="#35C0ED" />
        </View>

        <TouchableOpacity style={[styles.button, { backgroundColor: '#FF5271', marginRight: 10 }, check ? { opacity: 0.5 } : {}, loading ? {display:'none'} : {display: 'flex'}]}
          onPress={() => { HandleNavigationToHome('NÃO') }}
          disabled={check ? true : false}
        >
          <Icon name="slash" size={20} color="#3E0407" />
          <Text style={[styles.buttonText, { color: '#3E0407' }]}>Barar entrada</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { backgroundColor: '#35C0ED' }, check ? {} : { opacity: 0.5 }, loading ? {display:'none'} : {display: 'flex'}]}
          onPress={() => { HandleNavigationToHome('SIM') }} disabled={check ? false : true}
        >
          <Icon name="check-circle" size={20} color="#08376B" />
          <Text style={[styles.buttonText, { color: '#08376B' }]}>Permitir entrada</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  
  container: {
    flex: 1,
    padding: 32,
    paddingTop: 20 + Constants.statusBarHeight,
  },

  title: {
    fontSize: 28,
    fontFamily: 'Ubuntu_700Bold',
    color: '#08376B',
    marginTop: 24,
  },

  description: {
    color: '#35C0ED',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 4,
    fontFamily: 'Roboto_400Regular',
  },

  address: {
    marginTop: 32,
  },

  addressContent: {
    fontFamily: 'Roboto_400Regular',
    lineHeight: 24,
    color: '#6C6C80'
  },

  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#999',
    paddingVertical: 20,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 32,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  button: {
    height: 34,
    borderRadius: 8,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    marginLeft: 8,
    fontSize: 15,
    fontFamily: 'Roboto_500Medium',
  },
});

export default Checagem;