import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

// Theme
import {colors} from '../theme';

// Components
import AppAuthContainer from '../components/AppAuthContainer';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import AppDialog from '../components/AppDialog';

export default (props) => {
  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [hidePass, setHidePass] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState('');
  const [showWarningDialog, setShowWarningDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const onChangePassword = () => {
    if (password === '') {
      setMessages('Harap masukan password baru anda');
      return setShowWarningDialog(true);
    }

    if (password !== password2) {
      setMessages('Password yang anda masukan tidak sama');
      setPassword2('');
      return setShowWarningDialog(true);
    }

    // Tampilkan icon loading pada button
    setIsLoading(true);

    // Connect ke server request
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccessDialog(true);
    }, 2000);
  };

  return (
    <AppAuthContainer
      title="reset password"
      tagline="Masukan password baru Anda">
      <AppTextInput
        label="password baru"
        icon="lock"
        placeholder="Password"
        defaultValue={password}
        onChangeText={(val) => setPassword(val)}
        isPassword={true}
        showForgotLink={false}
        secureTextEntry={hidePass}
        togglePassword={() => setHidePass(!hidePass)}
      />

      <AppTextInput
        label="sekali lagi"
        icon="lock"
        placeholder="Password"
        defaultValue={password2}
        onChangeText={(val) => setPassword2(val)}
        isPassword={true}
        showForgotLink={false}
        secureTextEntry={hidePass}
        togglePassword={() => setHidePass(!hidePass)}
      />

      <AppButton
        title="ubah password"
        onPress={onChangePassword}
        isLoading={isLoading}
        togglePassword={() => setHidePass(!hidePass)}
        showElevation={true}
      />

      <AppButton
        title="back"
        onPress={() => navigation.goBack()}
        bgColor="white"
        textColor={colors.primary}
        showElevation={false}
      />

      <AppDialog
        dialogVisible={showSuccessDialog}
        title="berhasil"
        messages="Password berhasil diubah, silahkan login kembali"
        positiveButton={{
          title: 'ok',
          onPress: () => {
            setShowSuccessDialog(false);
            navigation.navigate('SignInScreen');
          },
        }}
      />

      <AppDialog
        dialogVisible={showWarningDialog}
        title="Oops..."
        messages={messages}
        iconName="x-circle"
        iconColor={colors.orange}
        positiveButton={{
          title: 'ok',
          onPress: () => setShowWarningDialog(false),
        }}
      />
    </AppAuthContainer>
  );
};
