import { NavigationContainer } from '@react-navigation/native';
import SkyCityStack from './[StructureIndexSkyCity]/IndexCityNavigation/SkyCityStack';
import { StoreProvider } from './[StructureIndexSkyCity]/StructureIndexStore/skyContextProvider';

const App = () => {
  return (
    <NavigationContainer>
      <StoreProvider>
        <SkyCityStack />
      </StoreProvider>
    </NavigationContainer>
  );
};

export default App;
