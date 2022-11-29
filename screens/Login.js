import { useState } from "react";
import { Alert, Button, StyleSheet, TextInput, View } from "react-native";

/* Importamos os recursos de autentitacação atraves das configurações firebase */
import { auth } from "../firebaseConfig";

/* Importamos os recursos de autentitacação diretamente da lib */
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const login = () => {
    if (!email || !senha) {
      Alert.alert("Atenção!", "Você deve preeencher todos os campos");
      return; // parar o processo
    }

    signInWithEmailAndPassword(auth, email, senha)
      .then(() => {
        navigation.replace("AreaLogada");
      })
      .catch((error) => {
        //console.log(error);

        let mensagem;
        switch (error.code) {
          case "auth/user-not-found":
            mensagem = "Usuário não encontrado!";
            break;
          case "auth/wrong-password":
            mensagem = "Senha incorreta";
            break;
          default:
            mensagem = "Houve um erro, tente novamente";
            break;
        }

        Alert.alert("Ops!", mensagem);
      });
  };

  const recuperarSenha = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert("Recuperar senha", "Verifique sua caixa de entrada");
      })
      .catch((error) => console.log(error));
  };

  return (
    <View style={estilos.container}>
      <View style={estilos.formulario}>
        <TextInput
          onChangeText={(valor) => setEmail(valor)}
          placeholder="E-mail"
          style={estilos.input}
          keyboardType="email-address"
        />
        <TextInput
          onChangeText={(valor) => setSenha(valor)}
          placeholder="Senha"
          style={estilos.input}
          secureTextEntry
        />
        <View style={estilos.botoes}>
          <Button title="Entre" color="green" onPress={login} />
        </View>
      </View>
      <View style={estilos.botoesSenha}>
        <Button
          title="Recuperar Senha"
          color="green"
          onPress={recuperarSenha}
        />
      </View>
    </View>
  );
};

export default Login;

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgreen",
    alignItems: "center",
    justifyContent: "center",
  },
  formulario: {
    marginBottom: 32,
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    marginVertical: 8,
    padding: 8,
    borderRadius: 4,
  },
  botoes: {
    marginVertical: 8,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  botoesSenha: {
    marginVertical: 8,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
