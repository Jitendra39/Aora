import { View, Text, Image, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import {Link, router} from 'expo-router'
import { signIn } from "../../lib/appwrite";

const SignIn = () => {
 
  const [form , setForm] = useState({
    email:'',
    password:'',
  })

  const [isSubmitting, setIsSubmitting] = useState(false);


  const submit = async() =>{
    if(!form.email || !form.password) {
      Alert.alert("Error", "Please fill all the fields");
    };
    setIsSubmitting(true);
      
    try{
     const result = await signIn(form.email, form.password);
    //  console.log(result);
    //  router.replace('/home');
    }catch(err){
      Alert.alert("Error", err.message);
    }finally{
      Alert.alert("Success", "User created successfully");
      setIsSubmitting(false);
     router.replace('/home');
    }
  }


  return (
<>
   <SafeAreaView className="bg-primary h-full">
      <ScrollView>
      <View className="w-full justify-center min-h-[85vh] max-h-screen-safe-offset-2   px-4 my-6">
     <Image source={images.logo}
       resizeMethod="contain"
       className="w-[115px] h-[35px] "    
     />
     <Text className="text-2xl text-white text-semibold mt-10 font-psemibold ">Log in to Aora</Text>
     <FormField
       title="Email"
       value={form.email}
       handleChangeText={(e) => setForm({ ...form, email: e }) }
       otherStyle="mt-7"
       keyboardType="email-address"
     />
        <FormField
       title="Password"
       value={form.password}
       handleChangeText={(e) => setForm({ ...form, password: e }) }
       otherStyle="mt-7"
     />
     <CustomButton title="Log In" containerStyles="mt-7" 
         handlePress={submit}
         isLoading={isSubmitting}
     />


     <View className="justify-center pt-5 flex-row gap-2">
       <Text className="text-white font-pregular">Don't have an account?</Text>
       <Link href={`/sign-up`} className="text-secondary-100 text-lg font-psemibold  ">Sign Up</Link>

     </View>
      </View>
      </ScrollView>
   </SafeAreaView>
</>
  );
};

export default SignIn;
