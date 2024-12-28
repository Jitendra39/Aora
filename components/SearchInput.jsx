import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";

const SearchInput = ({
  title,
  value,
  handleChangeText,
  placeholder,
  otherStyle,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
 
      <View
        className={`border-2 w-full h-16 px-4 bg-black-200 rounded-2xl
        flex-row items-center ${
          isFocused ? "border-secondary" : "border-gray-400"
        } space-x-4`}
      >
        <TextInput
          className="flex-1  text-white nt-0.5 font-pregular text-base"
          value={value}
          placeholder="Search For a Video Topic"
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {/* {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image source={!showPassword ? icons.eye : icons.eyeHide} 
            className="w-6 h-6"
            resizeMode="contain"
            />
          </TouchableOpacity>
        )} */}

        <TouchableOpacity>
          <Image source={icons.search} 
           className = "w-5 h-5"
           resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    
  );
};

export default SearchInput;
