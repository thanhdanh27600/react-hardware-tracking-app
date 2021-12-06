import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Welcome from './components/Welcome';
import ChooseProjectWrapper from './components/ChooseProject';
import ProjectContextProvider from './components/contexts/ProjectContext';
import NewProjectWrapper from './components/NewProjectWrapper';
import CheckUart from './components/CheckUart';
import ManualUart from './components/ManualUart';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <ProjectContextProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Xin chào') {
                iconName = focused
                  ? 'ios-home'
                  : 'ios-home-outline';
              } else if (route.name === 'Theo dõi hệ thống') {
                iconName = focused ? 'ios-albums-sharp' : 'ios-albums-outline';
              }
              // else if (route.name === 'Mở Chương Trình') {
              //   iconName = focused ? 'ios-list' : 'ios-list-outline';
              // }
              else if (route.name === 'Kiểm tra ghép thiết bị') {
                iconName = focused ? 'ios-settings' : 'ios-settings-outline';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}
          initialRouteName="Xin chào">
          <Tab.Screen name="Xin chào" component={Welcome} />
          <Tab.Screen options={{ headerShown: false }} name="Theo dõi hệ thống" component={NewProjectWrapper} />
          {/* <Tab.Screen options={{ headerShown: false }} name="Mở Chương Trình" component={ChooseProjectWrapper} /> */}
          <Tab.Screen options={{ headerShown: true }} name="Kiểm tra ghép thiết bị" component={CheckUart} />
        </Tab.Navigator>
      </NavigationContainer>
      <ManualUart />
    </ProjectContextProvider>

  )
    ;
}