import {Provider} from 'react-redux';
import generateStore from './components/Redux/store';
import Index from './components/Index/';
import CustomStatusBar from './components/parts/CustomStatusBar';
import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: async cb => {
    const storedLang = await AsyncStorage.getItem('locale');
    if (storedLang !== null) {
      return cb(storedLang);
    } else {
      return cb('es');
    }
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18next
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    fallbackLng: 'es',
    debug: false,
    react: {
      useSuspense: false,
    },
    resources: {
      en: {
        translation: {
          headerTitle: 'LLDM Choir',
          praises: 'Praises',
          categories: 'Categories',
          favorites: 'Favorites',
          regulation: 'Regulation',
          shareApp: 'Share app',
          rateApp: 'Rate this app',
          requestPraise: 'Request praise',
          reportOrSuggestions: 'Report or suggestions',
          aboutApp: 'About',
          quit: 'Quit',
          shareAppDescription:
            '*LLDM Choir* | Exclusive App for resources of the universal choir of THE LIGHT OF THE WORLD CHURCH, download it on Play Store https://play.google.com/store/apps/details?id=com.lldmchoirapp',
          requestPraiseDescription:
            'Request some praise and we will publish it with her separated voices or instrumentals as soon as possible',
          cancelBtnLabel: 'Cancel',
          requestBtnLabel: 'Request',
          reportOrSuggestionsDescription:
            'Report any issues or make suggestions about this app or about some praise.',
          reportOrSuggestionsBtnLabel: 'Report or suggest',
          aboutAppDescription:
            'Exclusive App for resources of the universal choir of THE LIGHT OF THE WORLD CHURCH version: 1.23. \n\n Suggestions or support: arnelcariaga@hotmail.com',
          acceptBtnLabel: 'Accept',
          quitAppQuestion: 'Exit application ?',
          versionLabel: 'Version',
          youHaveNoFavPraises: 'You have no favorite praises',
        },
      },
      es: {
        translation: {
          headerTitle: 'Coro LLDM',
          praises: 'Alabanzas',
          categories: 'Categorías',
          favorites: 'Favoritos',
          regulation: 'Reglamento',
          shareApp: 'Compartir app',
          rateApp: 'Calificar app',
          requestPraise: 'Solicitar alabanza',
          reportOrSuggestions: 'Reporte o sugerencias',
          aboutApp: 'Acerca de',
          quit: 'Salir',
          shareAppDescription:
            '*Coro LLDM* | App exclusivo para recursos del coro universal de la IGLESIA LA LUZ DEL MUNDO, descárgala en Play Store https://play.google.com/store/apps/details?id=com.lldmchoirapp',
          requestPraiseDescription:
            'Solicite alguna alabanza y lo publicaremos con sus voces o instrumentos separadas lo mas pronto posible',
          cancelBtnLabel: 'Cancelar',
          requestBtnLabel: 'Solicitar',
          reportOrSuggestionsDescription:
            'Reporte algún problema o haga sugerencias sobre la app o sobre alguna alabanza.',
          reportOrSuggestionsBtnLabel: 'Reportar o sugerir',
          aboutAppDescription:
            'App exclusivo para recursos del coro universal de la IGLESIA LA LUZ DEL MUNDO versión: 1.23. \n\n Sugerencias o soporte: arnelcariaga@hotmail.com',
          acceptBtnLabel: 'Aceptar',
          quitAppQuestion: '¿ Salir de la aplicación ?',
          versionLabel: 'Versión',
          youHaveNoFavPraises: 'No tienes alabanzas favoritas',
        },
      },
    },
  });

export default function App() {
  const store = generateStore();
  return (
    <Provider store={store}>
      <CustomStatusBar />
      <Index />
    </Provider>
  );
}
