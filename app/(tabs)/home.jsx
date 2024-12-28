import { View, Text, FlatList, Image, RefreshControl, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../../constants"; // Ensure the correct path
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
import { getAllPosts, getLatestPosts } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";

const Home = () => {
  const {data: posts,isLoading, refresh} = useAppwrite(getAllPosts);
  const [refreshing, setRefreshing] = useState(false);
  const {data: latestPosts} = useAppwrite(getLatestPosts);

  const onRefresh = async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
    
  };

  console.log(posts);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1a1a1a" }}>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
                    <VideoCard video={item} />
        )}
        ListHeaderComponent={() => (
          <View style={{ marginVertical: 24, paddingHorizontal: 16 }}>
            <View style={{ justifyContent: "space-between", flexDirection: "row", marginBottom: 24 }}>
              <View>
                <Text style={{ fontSize: 16, color: "gray" }}>Welcome Back</Text>
                <Text style={{ fontSize: 24, color: "white" }}>Aora</Text>
              </View>
              <View>
                <Image
                  source={images.logoSmall}
                  style={{ width: 36, height: 40 }}
                  resizeMode="contain"
                />
              </View>
            </View>
            <SearchInput />
            <View style={{ width: "100%", flex: 1, paddingTop: 20, paddingBottom: 32 }}>
              <Text style={{ color: "gray", fontSize: 18 }}>Latest Videos</Text>
              <Trending posts={latestPosts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
           <EmptyState message="No Data" />

        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  );
};

export default Home;




// import { View, Text, FlatList, Image, RefreshControl, Alert } from "react-native";
// import React, { useEffect, useState } from "react";
// import { SafeAreaView } from "react-native-safe-area-context";

// import { images } from "../../constants"; // Ensure the correct path
// import SearchInput from "../../components/SearchInput";
// import Trending from "../../components/Trending";
// import EmptyState from "../../components/EmptyState";
// import { getAllPosts } from "../../lib/appwrite";

// const Home = () => {
  
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

// useEffect(() =>{
// const fetchData = async () => {
//   setIsLoading(true);
//   try{
// const response = await getAllPosts();
//   }catch(err){
//     Alert.alert("Error", err.message);
//   } finally{
//     setIsLoading(false);
//   }
// }

// fetchData();
// }, [])


// console.log(data);


//   const [refreshing, setRefreshing] = useState(false);

//   const onRefresh = async () =>{
//      setRefreshing(true);
// // re call videos -> if any new videos appeard
//      setRefreshing(false);
//   }

//   return (
//     <SafeAreaView className="bg-primary h-full border-2 border-black">
//       <FlatList
//         data={[{ id: '1' }, { id: '2' }, { id: '3' }]}
//         // data={[]}
//         keyExtractor={(item) => {
//         console.log(item)
          
//           item.id.toString()}}
//         renderItem={({ item }) => {

//           return (
//             <Text style={{ fontSize: 24, color: "white" }} key={item.id}>
       
//               {item.id}
//             </Text>
//           );
//         }}
//         ListHeaderComponent={() => {
//           return (
//             <View style={{ marginVertical: 24, paddingHorizontal: 16 }}>
//               <View
//                 style={{
//                   justifyContent: "space-between",
//                   alignItems: "flex-start",
//                   flexDirection: "row",
//                   marginBottom: 24,
//                 }}
//               >
//                 <View>
//                   <Text
//                     style={{
//                       fontWeight: "600",
//                       fontSize: 14,
//                       color: "#d1d5db",
//                     }}
//                   >
//                     Welcome Back
//                   </Text>
//                   <Text
//                     style={{ fontWeight: "600", fontSize: 24, color: "white" }}
//                   >
//                     User Name
//                   </Text>
//                 </View>
//                 <View>
//                   <Image
//                     source={images.logoSmall}
//                     style={{ width: 36, height: 40 }}
//                     resizeMode="contain"
//                   />
//                 </View>
//               </View>
//               <SearchInput />
//               <View
//                 style={{
//                   width: "100%",
//                   flex: 1,
//                   paddingTop: 20,
//                   paddingBottom: 32,
//                 }}
//               >
//                 <Text style={{ color: "#d1d5db", fontSize: 18 }}>
//                   Latest Videos
//                 </Text>
//                 <Trending
//                   posts={[{ id: "1" }, { id: "2" }, { id: "3" }] ?? []}
//                 />
//               </View>
//             </View>
//           );
//         }}
//         ListEmptyComponent={() => (
//           <EmptyState
//             title="No videos found"
//             subtitle="Be the first one to upload a video"
//           />
//         )}
      
//         refreshControl={<RefreshControl  refreshing={refreshing} onRefresh={onRefresh}/>}
//       />

//     </SafeAreaView>
//   );
// };


// export default Home;
