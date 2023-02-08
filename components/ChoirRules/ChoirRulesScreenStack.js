import {createStackNavigator} from '@react-navigation/stack';
import Index from './index';
import LeftElements from './../parts/Header/LeftElements';
import RightElements from '../parts/Header/RightElements';
import {useTranslation} from 'react-i18next';

const ChoirRulesScreenStackNavigator = createStackNavigator();

function ChoirRulesScreenStack() {
  const {t} = useTranslation();

  return (
    <ChoirRulesScreenStackNavigator.Navigator>
      <ChoirRulesScreenStackNavigator.Screen
        name="LLDM Chior"
        component={Index}
        options={{
          headerLeft: () => <LeftElements />,
          headerRight: () => <RightElements />,
          headerStyle: {
            backgroundColor: '#1c2a67',
          },
          title: t('headerTitle'),
          headerTitleStyle: {
            color: '#fff',
          },
        }}
      />
    </ChoirRulesScreenStackNavigator.Navigator>
  );
}

export default ChoirRulesScreenStack;
