import { View, Text, Image, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import {Link, router} from 'expo-router'
import { createUser } from "../../lib/appwrite";


const SignUp = () => {


  const [form , setForm] = useState({
    username:'',
    email:'',
    password:'',
  })

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async() =>{
    if(!form.email || !form.password || !form.username) {
      Alert.alert("Error", "Please fill all the fields");
    };
    setIsSubmitting(true);
      
    try{
     const result = await createUser(form.email, form.password, form.username);
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
     <Text className="text-2xl text-white text-semibold mt-10 font-psemibold ">Sign up to Aora</Text>
     <FormField
       title="Username"
       value={form.username}
       handleChangeText={(e) => setForm({ ...form, username: e }) }
       otherStyle="mt-10"
     />
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
     <CustomButton title="Sign Up" containerStyles="mt-7" 
         handlePress={submit}
         isLoading={isSubmitting}
     />


     <View className="justify-center pt-5 flex-row gap-2">
       <Text className="text-white font-pregular">Have an Account Already?</Text>
       <Link href={`/sign-in`} className="text-secondary-100 text-lg font-psemibold  ">Sign In</Link>

     </View>
      </View>
      </ScrollView>
   </SafeAreaView>
</>
  );
};

export default SignUp;
