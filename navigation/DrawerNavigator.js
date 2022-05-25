import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Profile from "../screens/Profile";
import StackNavigator from './StackNavigator';

const Drawer = createDrawerNavigator();
const DrawerNavigator = () =>{
    return(
         <Drawer.Navigator screenOptions={{headerShown : false}} > 
             <Drawer.Screen name="home" component={StackNavigator} />
             <Drawer.Screen name="profile" component={Profile} />
         </Drawer.Navigator>
    );
}
export default DrawerNavigator;