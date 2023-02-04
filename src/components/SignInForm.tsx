import {Text, View} from 'react-native';
import React, {useState} from 'react';
import TabButtons, {TabButton} from './TabButtons';
import tw from 'twrnc';

export enum SignInTab {
  Email,
  Phone,
}

const SignInForm = () => {
  const [selectedTab, setSelectedTab] = useState<SignInTab>(SignInTab.Email);

  const buttons: TabButton[] = [
    {
      title: 'email',
      accessibilityLabel: 'Login with email',
    },
    {
      title: 'phone number',
      accessibilityLabel: 'Login with phone number',
    },
  ];

  return (
    <>
      <TabButtons
        buttons={buttons}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <View style={tw`mt-4`}>
        {selectedTab === SignInTab.Email ? (
          <Text>Email content</Text>
        ) : (
          <Text>Phone content</Text>
        )}
      </View>
    </>
  );
};

export default SignInForm;
