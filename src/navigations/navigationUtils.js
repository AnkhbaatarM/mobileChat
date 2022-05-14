import { createStackNavigator } from '@react-navigation/stack';
import {
    createDrawerNavigator,
    DrawerItem,
    DrawerContentScrollView,
} from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export { Stack, Drawer, DrawerItem, DrawerContentScrollView, Tab };
