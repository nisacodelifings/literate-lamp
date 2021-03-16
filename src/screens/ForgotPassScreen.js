import React, {useState} from 'react';
import { base_api_url, api_key } from '../../app-config';

// Utils
import validateEmail from '../utils/validate-email';

// Theme
import {colors} from '../theme';

// Components
import AppAuthContainer from '../components/AppAuthContainer';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import AppDialog from '../components/AppDialog';

const ForgotPassScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [messages, setMessages] = useState('');
  const [showWarningDialog, setShowWarningDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onForgotPassword = async () => {
    if (email === '') {
      setMessages('Harap masukan email');
      return setShowWarningDialog(true);
    }

    if (!validateEmail(email)) {
      setMessages('Email yang anda masukan tidak valid');
      return setShowWarningDialog(true);
    }

    // Tampilkan icon loading pada button
    setIsLoading(true);

    try {
      // Connect ke server request forgot password
      const url = base_api_url + '/user/forgot';
      await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, android: 1}),
      });

      setEmail('');
      setShowSuccessDialog(true);
    } catch (err) {
      setMessages(JSON.stringify(err));
      setShowWarningDialog(true);
    }
    setIsLoading(false);
  };

  return (
    <AppAuthContainer
      title="Lupa Password"
      tagline="Masukan alamat email dan ikuti petunjuk di email">
      <AppTextInput
        label="email"
        icon="mail"
        placeholder="Email"
        defaultValue={email}
        onChangeText={(val) => setEmail(val)}
      />

      <AppButton
        title="reset"
        onPress={onForgotPassword}
        isLoading={isLoading}
      />

      <AppButton
        title="back"
        onPress={() => navigation.goBack()}
        bgColor="white"
        textColor={colors.primary}
      />

      <AppDialog
        dialogVisible={showSuccessDialog}
        title="berhasil"
        messages="Silahkan cek email Anda dan ikuti petunjuk berikutnya"
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

export default ForgotPassScreen;
