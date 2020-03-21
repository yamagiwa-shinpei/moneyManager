/**
 * @format
 */

import {Navigation} from 'react-native-navigation';
import App from './App';
import Calender from './components/Calender';
import AddCard from './components/AddCard';
Navigation.registerComponent(`CardList`, () => App);
Navigation.registerComponent(`Calender`, () => Calender);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      bottomTabs: {
        children: [
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'CardList',
                    passProps: {
                      text: 'This is tab 1',
                    },
                  },
                },
              ],
              options: {
                bottomTab: {
                  text: 'Tab 1',
                  testID: 'FIRST_TAB_BAR_BUTTON',
                },
              },
            },
          },
          {
            component: {
              name: 'Calender',
              passProps: {
                text: 'This is tab 2',
              },
              options: {
                bottomTab: {
                  text: 'Tab 2',
                  testID: 'SECOND_TAB_BAR_BUTTON',
                },
              },
            },
          },
        ],
      },
    },
  });
});
