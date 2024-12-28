import { Link, Redirect, router } from "expo-router";
// import { verifyInstallation } from 'nativewind';
import { images } from "../constants";
import {
  View,
  Text,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import { useGlobalContext } from "../context/GlobalProvider";

export default function index() {

  const {isLoading, isLoggedIn} = useGlobalContext();
  if(!isLoading && !isLoggedIn) return <Redirect href="/home" />
  
  return (
    <>
      <SafeAreaView className="bg-primary h-full">
        <ScrollView contentContainerStyle={{ height: "100%" }}>
          <View className="w-full justify-center items-center min-h-[85vh] h-full px-4">
            <Image
              source={images.logo}
              className="w-[130px] h-[84px]"
              style={{ resizeMode: "contain" }}
              resizeMethod="contain"
            />

            <Image
              source={images.cards}
              className="max-w-[380px] w-full h-[300px]"
              resizeMethod="contain"
            />
            <View className="relative mt-5">
              <Text className="text-3xl text-white font-bold text-center"> Discover Endless Possibilities with {''}
                <Text className="text-secondary-200 ">
                  Aora
                </Text>
              </Text>
              <Image
                source={images.path}
                className="w-[76px] h-[15px] absolute -right-1 -bottom-2"
              />
            </View>
            <Text className="text-sm text-gray-100 font-pregular mt-7 text-center">
              Where creativity meets innovation: embark on a journey of limitless exploration with Aora
            </Text>
            <CustomButton 
               title="Continue with Email"
               handlePress={() => router.push('/sign-in')}
               containerStyles="w-full mt-7"
            />
          </View>
        </ScrollView>
 
      </SafeAreaView>
    </>
  );
}
