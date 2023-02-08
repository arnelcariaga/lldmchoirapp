import LeftElements from './LeftElements';
import RightElements from './RightElements';
import SearchInput from './SearchInput';
import {useDispatch, useSelector} from 'react-redux';
import {toggleSearchAction} from '../../Redux/headerDucks';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

function Header({onChange, placeholder, title, iSSearchable}) {
  const toggleSearch = useSelector(store => store.headerData.toggleSearch);
  const dispatch = useDispatch();
  const {dark, colors} = useTheme();
  const {t} = useTranslation();

  if (toggleSearch) {
    return {
      header: () => (
        <SearchInput onChange={onChange} placeholder={placeholder} />
      ),
    };
  }
  return {
    headerLeft: () => <LeftElements />,
    headerRight: () => (
      <RightElements
        openSearch={() => dispatch(toggleSearchAction(true))}
        iSSearchable={iSSearchable}
      />
    ),
    title: t('headerTitle'),
    headerStyle: {
      backgroundColor: dark ? colors.card : '#1c2a67',
    },
    headerTitleStyle: {
      color: '#fff',
    },
  };
}

export default Header;
