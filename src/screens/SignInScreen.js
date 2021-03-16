import React, {useContext, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

// Context
import {AuthContext} from '../contexts/AuthContext';

// Components
import AppAuthContainer from '../components/AppAuthContainer';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';

export default (props) => {
  const navigation = useNavigation();
  const {signIn} = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hidePass, setHidePass] = useState(true);
  const [isLoading, setIsloading] = useState(false);

  const onSignIn = () => {
    setIsloading(true);
    signIn({username, password}).then(() => setIsloading(false));
  };

  return (
    <AppAuthContainer>
      <AppTextInput
        label="username"
        icon="user"
        placeholder="Username"
        defaultValue={username}
        onChangeText={(val) => setUsername(val)}
      />

      <AppTextInput
        label="password"
        icon="lock"
        placeholder="Password"
        defaultValue={password}
        onChangeText={(val) => setPassword(val)}
        secureTextEntry={hidePass}
        isPassword={true}
        showForgotLink={true}
        togglePassword={() => setHidePass(!hidePass)}
        onForgotPassword={() => navigation.navigate('ForgotPassword')}
      />

      <AppButton title="Sign In" onPress={onSignIn} isLoading={isLoading} />
    </AppAuthContainer>
  );
};
