import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

// 생성한 화면을 Import 해주세요.
import Main from "../View/Main";
import SignIn from "../View/SignIn";

const Stack = createNativeStackNavigator();

// 아래부분에서 <Stack.Screen /> 부분을 import 한 부분에 맞춰서 추가해주시면 됩니다.
export default function Navigation() {
  return (
    <NavigationContainer> 
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="SignIn" component={SignIn} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}